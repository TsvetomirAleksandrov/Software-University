const UserModel = firebase.auth();
const DB = firebase.firestore();

const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    this.get('/home', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('./templates/home.hbs')
            })
    });

    this.get('/all-movies', function (context) {
        const search  = "Comedy"

        DB.collection('movies')
            .get()
            .then((response) => {
                context.movies = response.docs.map((movies) => { return { id: movies.id, ...movies.data() } });
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/allMovies.hbs')
                    })
            })
    });

    this.get('/my-movies', function (context) {
        const { email } = getUserData();

        DB.collection('movies')
            .where("creator", "==", email)
            .get()
            .then((response) => {
                context.myMovie = response.docs.map((myMovie) => { return { id: myMovie.id, ...myMovie.data() } });
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/myMovies.hbs')
                    })
            })
    });

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
                this.partial('./templates/createMovie.hbs');
            })
    });

    this.post('/add-movie', function (context) {
        const { title, imageUrl, description, genres, tickets } = context.params;

        if (title == '' || imageUrl == '' || description == '' || genres == '' || tickets == '') {
            errorHandler('Invalid inputs!');
            return;
        }

        DB.collection('movies').add({
            title,
            imageUrl,
            description,
            genres: genres.split(' '),
            tickets,
            creator: getUserData().email,

        })
            .then((data) => {
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Details
    this.get('/details/:movieId', function (context) {
        const { movieId } = context.params;

        DB.collection('movies')
            .doc(movieId)
            .get()
            .then((response) => {

                const { email } = getUserData();
                const actualMovieData = response.data();
                const isCreator = actualMovieData.creator === email;

                context.movie = { ...response.data(), isCreator, id: movieId };
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/details.hbs');
                    })
            })
    });

    //Edit
    this.get('/edit/:movieId', function (context) {
        const { movieId } = context.params;

        DB.collection('movies')
            .doc(movieId)
            .get()
            .then((response) => {
                context.movie = { id: movieId, ...response.data() };
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/editMovie.hbs');
                    })
            })
    });

    this.post('/edit/:movieId', function (context) {
        const { movieId, title, description, imageUrl, tickets, genres } = context.params;

        DB.collection('movies')
            .doc(movieId)
            .get()
            .then((response) => {
                return DB.collection('movies')
                    .doc(movieId)
                    .set({
                        ...response.data(),
                        title,
                        imageUrl,
                        description,
                        tickets,
                        genres
                    })
            })
            .then((response) => {
                this.redirect(`#/details/${movieId}`);
            })
            .catch(errorHandler);
    });

    //Delete
    this.get('/delete/:movieId', function (context) {
        const { movieId } = context.params;

        DB.collection('movies')
            .doc(movieId)
            .delete()
            .then(() => {

                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Buy Ticket
    this.get('/buy-ticket/:movieId', function (context) {
        const { movieId } = context.params;

        DB.collection('movies')
            .doc(movieId)
            .get()
            .then((response) => {
                const movieData = { ...response.data() };
                if (movieData.tickets > 0) {
                    movieData.tickets--;
                }

                return DB.collection('movies')
                    .doc(movieId)
                    .set(movieData)
            })
            .then(() => {
                this.redirect(`#/details/${movieId}`);
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
        'navigation': './partials/navigation.hbs',
        'footer': './partials/footer.hbs',
        // 'message': './partials/message.hbs',
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
    window.localStorage.removeItem('user');
}