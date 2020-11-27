const UserModel = firebase.auth();
const DB = firebase.firestore();

const app = Sammy('#rooter', function () {
    this.use('Handlebars', 'hbs');

    //Home
    this.get('/home', function (context) {

        DB.collection('recipes')
            .get()
            .then((response) => {
                context.recipes = response.docs.map((recipe) => { return { id: recipe.id, ...recipe.data() } });
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/home.hbs')
                    })
            })
            .catch((e) => errorHandler(e.message));
    });

    //Register
    this.get('/register', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/register.hbs')
            })
    });

    this.post('/register', function (context) {
        const { firstName, lastName, email, password, repeatPassword } = context.params;

        try {
            if (firstName.length < 2 || lastName.length < 2) {
                throw new Error('First name must be at least 2 characters long');
            }

            if (password.length < 6 || repeatPassword.length < 6) {
                throw new Error('The password should be at least 6 characters long');
            }

            if (password !== repeatPassword) {
                throw new Error('The repeat password should be equal to the password');
            }
        } catch (error) {
            errorHandler(error.message);
            return;
        }

        UserModel.createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                saveUserData(userData);
                loadingHandler('Loading...');
                successHandler('User registration successful.');
                this.redirect('/login');
            })
            .catch((e) => errorHandler(e.message));
    });

    //Login
    this.get('/login', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/login.hbs')
            })
    });

    this.post('/login', function (context) {
        const { email, password } = context.params;

        UserModel.signInWithEmailAndPassword(email, password)
            .then((userData) => {
                saveUserData(userData)
                loadingHandler('Loading...');
                successHandler('Login Successful.');
                this.redirect('/home');
            })
            .catch((e) => errorHandler(e.message));
    });

    //Logout
    this.get('/logout', function () {
        UserModel.signOut()
            .then(() => {
                clearUserData();
                loadingHandler('Loading...');
                successHandler('Logout Successful.');
                this.redirect('/home');
            })
            .catch((e) => errorHandler(e.message));
    })

    //Details
    this.get('/details/:recipeId', function (context) {
        const { recipeId } = context.params;

        DB.collection('recipes')
            .doc(recipeId)
            .get()
            .then((response) => {
                const { uid, email } = getUserData();
                const actualRecipeData = response.data();

                const isCreator = actualRecipeData.creator === email;
                
                const userIndex = actualRecipeData.likes.indexOf(uid);
                const iLiked = userIndex > -1;
                const likesCount = actualRecipeData.likes.length;

                context.recipe = { ...response.data(), isCreator, id: recipeId, iLiked, likesCount };
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/details.hbs')
                    })
            })
    });

    //Share recipe
    this.get('/share-recipe', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/shareRecipe.hbs')
            })
    });

    this.post('/share-recipe', function (context) {
        const { meal, ingredients, prepMethod, description, foodImageURL, category } = context.params;

        DB.collection('recipes').add({
            meal,
            ingredients: ingredients.split(', '),
            prepMethod,
            description,
            foodImageURL,
            category,
            categoryImageURL: categoryImage(category),
            creator: getUserData().email,
            likes: []
        })
            .then((data) => {
                successHandler('Recipe shared successfully!');
                this.redirect('/home');
            })
            .catch((e) => errorHandler(e.message));
    });

    //Edit recipe
    this.get('/edit/:recipeId', function (context) {
        const { recipeId } = context.params;

        DB.collection('recipes')
            .doc(recipeId)
            .get()
            .then((response) => {
                context.recipe = { id: recipeId, ...response.data() };
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/editRecipe.hbs');
                    })
            })
    });

    this.post('/edit/:recipeId', function (context) {
        const { recipeId, meal, ingredients, prepMethod, description, foodImageURL, category } = context.params;

        DB.collection('recipes')
            .doc(recipeId)
            .get()
            .then((response) => {
                return DB.collection('recipes')
                    .doc(recipeId)
                    .set({
                        ...response.data(),
                        meal,
                        ingredients: ingredients.split(', '),
                        prepMethod,
                        description,
                        foodImageURL,
                        category
                    })
            })
            .then((response) => {
                successHandler('Recipe was edited successfully!');
                this.redirect(`#/details/${recipeId}`);
            })
            .catch((e) => errorHandler(e.message));
    });

    //Delete recipe
    this.get('/delete/:recipeId', function (context) {
        const { recipeId } = context.params;

        DB.collection('recipes')
            .doc(recipeId)
            .delete()
            .then(() => {
                this.redirect('/home');
            })
            .catch((e) => errorHandler(e.message));
    });

    //Like recipe
    this.get('/like/:recipeId', function (context) {
        const { recipeId } = context.params;
        const { uid } = getUserData();

        DB.collection('recipes')
            .doc(recipeId)
            .get()
            .then((response) => {
                const recipeData = { ...response.data() };
                recipeData.likes.push(uid);

                return DB.collection('recipes')
                    .doc(recipeId)
                    .set(recipeData)
            })
            .then(() => {
                this.redirect(`#/details/${recipeId}`);
            })
            .catch((e) => errorHandler(e.message));
    })
});

(() => {
    app.run('/home');
})();

function extendContext(context) {
    const user = getUserData();
    context.isLoggedIn = Boolean(user);
    context.userEmail = user ? user.email : '';

    return context.loadPartials({
        'header': './partials/header.hbs',
        'footer': './partials/footer.hbs'
    })
}

function saveUserData(data) {
    const { user: { email, uid, firstName, lastName } } = data;
    localStorage.setItem('user', JSON.stringify({ email, uid, firstName, lastName }));
}

function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function clearUserData() {
    this.localStorage.removeItem('user');
}

function errorHandler(msg) {
    let errorBox = document.getElementById('errorBox');

    errorBox.textContent = msg;
    errorBox.style.display = 'block';

    setTimeout(() => errorBox.style.display = 'none', 3000);
}

function successHandler(msg) {
    let successBox = document.getElementById('successBox');

    successBox.textContent = msg;
    successBox.style.display = 'block';

    setTimeout(() => successBox.style.display = 'none', 3000);
}

function loadingHandler(msg) {
    let loadingBox = document.getElementById('loadingBox');

    loadingBox.textContent = msg;
    loadingBox.style.display = 'block';

    setTimeout(() => loadingBox.style.display = 'none', 3000);
}

function categoryImage(category) {
    let categoryImageURL = '';

    if (category === 'Vegetables and legumes/beans') {
        categoryImageURL = 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg';
    }

    if (category === 'Fruits') {
        categoryImageURL = 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg';
    }

    if (category === 'Milk, cheese, eggs and alternatives') {
        categoryImageURL = 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg';
    }

    if (category === 'Grain Food') {
        categoryImageURL = 'https://www.newskarnataka.com/storage/photos/shares/FCI_M_2852020.jpg';
    }

    if (category === 'Lean meats and poultry, fish and alternatives') {
        categoryImageURL = 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg';
    }

    return categoryImageURL;
}