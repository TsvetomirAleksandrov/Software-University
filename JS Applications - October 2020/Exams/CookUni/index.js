const UserModel = firebase.auth();
const DB = firebase.firestore();

const app = Sammy('#rooter', function () {
    this.use('Handlebars', 'hbs');

    //Home
    this.get('/home', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('./templates/home.hbs')
            })
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
    this.get('/logout', function (conntext) {
        UserModel.signOut()
            .then(() => {
                clearUserData();
                this.redirect('/home');
            })
            .catch(errorHandler);
    })

    //Details

    //Create recipe

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

function errorHandler(error) {
    alert(error);
}

function saveUserData(data) {
    const { user: { email, uid } } = data;
    localStorage.setItem('user', JSON.stringify({ email, uid }));
}

function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function clearUserData() {
    this.localStorage.removeItem('user');
}