const UserModel = firebase.auth();
const DB = firebase.firestore();

const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    //Home
    this.get('/home', function (context) {

        DB.collection('posts')
            .get()
            .then((response) => {
                context.post = response.docs.map((post) => { return { id: post.id, ...post.data() } });
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

        try {
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
                this.redirect('/login');
            })
            .catch(errorHandler);
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
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Logout
    this.get('/logout', function () {
        UserModel.signOut()
            .then(() => {
                clearUserData()
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Details
    this.get('/details/:postId', function (context) {
        const { postId } = context.params;

        DB.collection('posts')
            .doc(postId)
            .get()
            .then((response) => {
                const { uid, email } = getUserData();
                const actualPostData = response.data();

                const isCreator = actualPostData.creator === email;

                //const userIndex = actualPostData.likes.indexOf(uid);
                //const iLiked = userIndex > -1;
                //const likesCount = actualPostData.likes.length;

                context.post = { ...response.data(), isCreator, id: postId };
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/details.hbs')
                    })
            })
    });

    //Create Post
    this.get('/create-post', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/createPost.hbs')
            })
    });

    this.post('/create-post', function (context) {
        const { title, category, content } = context.params;

        DB.collection('posts').add({
            title, 
            category, 
            content,
            creator: getUserData().email,
            
        })
            .then((data) => {
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Edit Post
    this.get('/edit/:postId', function (context) {
        const { postId } = context.params;

        DB.collection('posts')
            .doc(postId)
            .get()
            .then((response) => {
                context.post = { id: postId, ...response.data() };
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/editPost.hbs');
                    })
            })
    });

    this.post('/edit/:postId', function (context) {
        const { title, category, content } = context.params;

        DB.collection('posts')
            .doc(postId)
            .get()
            .then((response) => {
                return DB.collection('posts')
                    .doc(postId)
                    .set({
                        ...response.data(),
                        title,
                        category,
                        content
                    })
            })
            .then((response) => {
                this.redirect(`#/details/${postId}`);
            })
            .catch(errorHandler);
    });

    //Delete Post
    this.get('/delete/:postId', function (context) {
        const { postId } = context.params;

        DB.collection('posts')
            .doc(postId)
            .delete()
            .then(() => {
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    // //Like recipe
    // this.get('/like/:recipeId', function (context) {
    //     const { recipeId } = context.params;
    //     const { uid } = getUserData();

    //     DB.collection('recipes')
    //         .doc(recipeId)
    //         .get()
    //         .then((response) => {
    //             const recipeData = { ...response.data() };
    //             recipeData.likes.push(uid);

    //             return DB.collection('recipes')
    //                 .doc(recipeId)
    //                 .set(recipeData)
    //         })
    //         .then(() => {
    //             this.redirect(`#/details/${recipeId}`);
    //         })
    //         .catch(errorHandler);
    // })
});

(() => {
    app.run('/home');
})();

function extendContext(context) {
    const user = getUserData();
    context.isLoggedIn = Boolean(user);
    context.userEmail = user ? user.email : '';

    return context.loadPartials({
        'header': './partials/header.hbs'
    })
}

function saveUserData(data) {
    const { user: { email, uid } } = data;
    sessionStorage.setItem('user', JSON.stringify({ email, uid }));
}

function getUserData() {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function clearUserData() {
    window.sessionStorage.removeItem('user');
}

function errorHandler(error) {
    console.log(error);
}

// function errorHandler(msg) {
//     let errorBox = document.getElementById('errorBox');

//     errorBox.textContent = msg;
//     errorBox.style.display = 'block';

//     setTimeout(() => errorBox.style.display = 'none', 3000);
// }

// function successHandler(msg) {
//     let successBox = document.getElementById('successBox');

//     successBox.textContent = msg;
//     successBox.style.display = 'block';

//     setTimeout(() => successBox.style.display = 'none', 3000);
// }

// function loadingHandler(msg) {
//     let loadingBox = document.getElementById('loadingBox');

//     loadingBox.textContent = msg;
//     loadingBox.style.display = 'block';

//     setTimeout(() => loadingBox.style.display = 'none', 3000);
// }

// function categoryImage(category) {
//     let categoryImageURL = '';

//     if (category === 'Vegetables and legumes/beans') {
//         categoryImageURL = 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg';
//     }

//     if (category === 'Fruits') {
//         categoryImageURL = 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg';
//     }

//     if (category === 'Milk, cheese, eggs and alternatives') {
//         categoryImageURL = 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg';
//     }

//     if (category === 'Grain Food') {
//         categoryImageURL = 'https://www.newskarnataka.com/storage/photos/shares/FCI_M_2852020.jpg';
//     }

//     if (category === 'Lean meats and poultry, fish and alternatives') {
//         categoryImageURL = 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg';
//     }

//     return categoryImageURL;
// }