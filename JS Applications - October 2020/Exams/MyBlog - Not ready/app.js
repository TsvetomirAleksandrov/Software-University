const UserModel = firebase.auth();
const DB = firebase.firestore();

const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    //Home
    this.get('/home', function (context) {

        DB.collection('posts')
            .get()
            .then((response) => {

                const user = getUserData();

                context.post = response.docs.map((post) => {
                    if (user) {
                        return {
                            id: post.id,
                            ...post.data(),
                            isCreator: post.data().creator === user.email
                        }
                    }
                });

                console.log(context.post);
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

                context.post = { ...response.data(), id: postId };
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/details.hbs')
                    })
            })
    });

    this.post('/create-post', function (context) {
        const { title, category, content } = context.params;

        DB.collection('posts').add({
            title,
            category,
            content,
            creator: getUserData().email
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
        const { postId, title, category, content } = context.params;

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
    window.sessionStorage.setItem('user', JSON.stringify({ email, uid }));
}

function getUserData() {
    const user = window.sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function clearUserData() {
    window.sessionStorage.removeItem('user');
}

function errorHandler(error) {
    console.log(error);
}
