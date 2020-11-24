const UserModel = firebase.auth();
const DB = firebase.firestore();

const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');


    this.get('/home', function (context) {

        DB.collection('movies')
            .get()
            .then((response) => {
                context.movies = response.docs.map((movie) => { return { id: movie.id, ...movie.data() } });
                context.hasMovies = true;
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/home.hbs')
                    })
            })
            .catch(errorHandler);
    })

    this.get('/register', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/register.hbs');
            })
    });

    this.post('/register', function (context) {
        const { email, password, repeatPassword } = context.params;

        if (password !== repeatPassword) {
            return;
        }

        UserModel.createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                console.log(userData);
                this.redirect('/login');
            })
            .catch(errorHandler);
    });

    //Login
    this.get('/login', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/login.hbs');
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
    this.get('/logout', function (context) {
        UserModel.signOut()
            .then(() => {
                clearUserData();
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Add Movie
    this.get('/add-movie', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/addMovie.hbs');
            })
    });

    this.post('/add-movie', function (context) {
        const { title, imageUrl, description } = context.params;

        DB.collection('movies').add({
            title,
            imageUrl,
            description
        })
            .then((data) => {
                console.log(data);
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
        'footer': './partials/footer.hbs',
        // 'message': './partials/message.hbs',
    })
}

function errorHandler(error) {
    console.log(error);
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