const UserModel = firebase.auth();
const DB = firebase.firestore();

const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');


    this.get('/home', function (context) {
        const { search } = context.params;

        renderMovies(context, search);
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
                successHandler('Logged in successfully')
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Logout
    this.get('/logout', function (context) {
        UserModel.signOut()
            .then(() => {
                clearUserData();
                successHandler('Successfull logout')
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

        try {
            if (title == '' || imageUrl == '' || description == '') {
                throw new Error('Invalid inputs!');
            }
        } catch (error) {
            errorHandler(error.message);
            return;
        }

        DB.collection('movies').add({
            title,
            imageUrl,
            description,
            creator: getUserData().email,
            likes: []
        })
            .then((data) => {
                successHandler('Created successfully')
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
                const imTheCreator = actualMovieData.creator === email;

                const iLiked = actualMovieData.likes.indexOf(email) !== -1
                console.log(iLiked);

                const likesCount = actualMovieData.likes.length;

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
                successHandler('Eddited successfully')
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
                successHandler('Deleted successfully')
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Like
    this.get('/like/:movieId', function (context) {
        const { movieId } = context.params;
        const { email } = getUserData();

        DB.collection('movies')
            .doc(movieId)
            .get()
            .then((response) => {
                const movieData = { ...response.data() };

                if (!movieData.likes.includes(email)) {
                    movieData.likes.push(email);

                    return DB.collection('movies')
                        .doc(movieId)
                        .set(movieData)
                }
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
        'header': './partials/header.hbs',
        'footer': './partials/footer.hbs',
        // 'message': './partials/message.hbs',
    })
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

function errorHandler(msg) {
    let errorBox = document.getElementById('errorBox');

    errorBox.textContent = msg;
    errorBox.parentElement.style.display = 'block';

    setTimeout(() => errorBox.parentElement.style.display = 'none', 1000);
}

function successHandler(msg) {
    let validBox = document.getElementById('successBox');

    validBox.textContent = msg;
    validBox.parentElement.style.display = 'block';

    setTimeout(() => validBox.parentElement.style.display = 'none', 1000);
}

function renderMovies(context, search) {
    DB.collection('movies')
        .get()
        .then((response) => {
            context.movies = response.docs.map((movie) => {
                return {
                    id: movie.id,
                    ...movie.data(),
                }
            });
            extendContext(context)
                .then(function () {

                    this.partial('./templates/home.hbs')
                })
        })
        .catch(errorHandler);

    if (search !== '') {
        DB.collection('movies')
            .where("title", "==", search)
            .get()
            .then((response) => {
                context.movies = response.docs.map((movie) => {
                    return {
                        id: movie.id,
                        ...movie.data(),
                    }
                });
                extendContext(context)
                    .then(function () {

                        this.partial('./templates/home.hbs')
                    })
            })
            .catch(errorHandler);
    }
}