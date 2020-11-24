const UserModel = firebase.auth();
const DB = firebase.firestore();

const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');


    this.get('/home', function (context) {

        DB.collection('movies')
            .get()
            .then((response) => {
                context.movies = response.docs.map((movie) => { return { id: movie.id, ...movie.data() } });
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

        if (title == '' || imageUrl == '' || description == '') {
            errorHandler('Invalid inputs!');
            return;
        }

        DB.collection('movies').add({
            title,
            imageUrl,
            description,
            creator: getUserData().uid,
            likes: []
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

                const { uid } = getUserData();
                const actualMovieData = response.data();
                const imTheCreator = actualMovieData.creator === uid;

                const userIndex = actualMovieData.likes.indexOf(uid);
                const iLiked = userIndex > -1;

                let likesCount = actualMovieData.likes.length;
                
                context.movie = { ...response.data(), imTheCreator, id: movieId, iLiked, likesCount };
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
        const { movieId, title, description, imageUrl } = context.params;

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
                        description
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

    //Like
    this.get('/like/:movieId', function (context) {
        const { movieId } = context.params;
        const { uid } = getUserData();

        DB.collection('movies')
            .doc(movieId)
            .get()
            .then((response) => {
                const movieData = { ...response.data() };
                movieData.likes.push(uid);

                return DB.collection('movies')
                    .doc(movieId)
                    .set(movieData)
            })
            .then(() => {
                console.log(likesCount);
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
        'header': './partials/header.hbs',
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
    this.localStorage.removeItem('user');
}

