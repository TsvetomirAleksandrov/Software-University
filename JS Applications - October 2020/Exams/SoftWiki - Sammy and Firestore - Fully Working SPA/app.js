const UserModel = firebase.auth();
const DB = firebase.firestore();

const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    //Home
    this.get('/home', function (context) {
        renderCategories(context);
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
                saveUserData(userData);

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
                clearUserData();

                this.redirect('/home');
            })
            .catch(errorHandler);
    })

    //Details
    this.get('/details/:articleId', function (context) {
        const { articleId } = context.params;

        DB.collection('articles')
            .doc(articleId)
            .get()
            .then((response) => {
                const { email } = getUserData();
                const articleData = response.data();

                const isCreator = articleData.creator === email;

                context.article = { ...response.data(), isCreator, id: articleId };
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/details.hbs')
                    })
            })
    });

    //Create Article
    this.get('/create-article', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/createArticle.hbs')
            })
    });

    this.post('/create-article', function (context) {
        const { title, content, category } = context.params;
        const creator = getUserData().email;

        DB.collection('articles').add({
            title,
            content,
            category,
            creator: creator,
        })
            .then((data) => {
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Edit Article
    this.get('/edit/:articleId', function (context) {
        const { articleId } = context.params;

        DB.collection('articles')
            .doc(articleId)
            .get()
            .then((response) => {
                context.article = { id: articleId, ...response.data() };
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/editPost.hbs');
                    })
            })
    });

    this.post('/edit/:articleId', function (context) {
        const { articleId, title, category, content } = context.params;

        DB.collection('articles')
            .doc(articleId)
            .get()
            .then((response) => {
                return DB.collection('articles')
                    .doc(articleId)
                    .set({
                        ...response.data(),
                        title,
                        category,
                        content
                    })
            })
            .then((response) => {

                this.redirect(`#/details/${articleId}`);
            })
            .catch(errorHandler);
    });

    //Delete Article
    this.get('/delete/:articleId', function (context) {
        const { articleId } = context.params;

        DB.collection('articles')
            .doc(articleId)
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
    window.localStorage.removeItem('user');
}

function errorHandler(error) {
    console.log(error);
}

function renderCategories(context) {
    DB.collection('articles')
        .where("category", "==", "JavaScript")
        .get()
        .then((response) => {
            context.js = response.docs.map((js) => {
                return {
                    id: js.id,
                    ...js.data(),
                }
            });
            extendContext(context)
                .then(function () {
                    this.partial('./templates/home.hbs')
                })
        })
        .catch(errorHandler);

    DB.collection('articles')
        .where("category", "==", "C#")
        .get()
        .then((response) => {
            context.csharp = response.docs.map((csharp) => {
                return {
                    id: csharp.id,
                    ...csharp.data(),
                }
            });
            extendContext(context)
                .then(function () {
                    this.partial('./templates/home.hbs')
                })
        })
        .catch(errorHandler);

    DB.collection('articles')
        .where("category", "==", "Java")
        .get()
        .then((response) => {
            context.java = response.docs.map((java) => {
                return {
                    id: java.id,
                    ...java.data(),
                }
            });
            extendContext(context)
                .then(function () {
                    this.partial('./templates/home.hbs')
                })
        })
        .catch(errorHandler);

    DB.collection('articles')
        .where("category", "==", "Python")
        .get()
        .then((response) => {
            context.python = response.docs.map((python) => {
                return {
                    id: python.id,
                    ...python.data(),
                }
            });
            extendContext(context)
                .then(function () {
                    this.partial('./templates/home.hbs')
                })
        })
        .catch(errorHandler);
}