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
            .catch(errorHandler);
    });

    //Register
    this.get('/register', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/register.hbs')
            })
    });

    this.post('/register', function (context) {
        const { email, password, repeatPassword } = context.params;

        if (password !== repeatPassword) {
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
                const { uid } = getUserData();
                const actualRecipeData = response.data();
                const isCreator = actualRecipeData.creator === uid;
                const userIndex = actualMovieData.likes.indexOf(uid);
                const iLiked = userIndex > -1;
                const likesCount = actualMovieData.likes.length;

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
            ingredients,
            prepMethod,
            description,
            foodImageURL,
            category,
            creator: getUserData().email,
            likes: []
        })
            .then((data) => {
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Edit recipe

    //Delete recipe

    //Like recipe




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

    setTimeout(() => errorBox.style.display = 'none', 2000);
}

function successHandler(msg) {
    let successBox = document.getElementById('successBox');

    successBox.textContent = msg;
    successBox.style.display = 'block';

    setTimeout(() => successBox.style.display = 'none', 2000);
}

function loadingHandler(msg) {
    let loadingBox = document.getElementById('loadingBox');

    loadingBox.textContent = msg;
    loadingBox.style.display = 'block';

    setTimeout(() => loadingBox.style.display = 'none', 2000);
}