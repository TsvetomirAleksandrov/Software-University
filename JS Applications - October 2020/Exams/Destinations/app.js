const UserModel = firebase.auth();
const DB = firebase.firestore();

const app = Sammy('#container', function () {
    this.use('Handlebars', 'hbs');

    //Home
    this.get('/home', function (context) {

        DB.collection('destinations')
            .get()
            .then((response) => {
                context.destinations = response.docs.map((destination) => { return { id: destination.id, ...destination.data() } });
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/home.hbs')
                    })
            })
            .catch((e) => errorHandler(e.message));
    });

    //My Destinations
    this.get('/my-destinations', function (context) {
        const { email } = getUserData();

        DB.collection('destinations')
            .where("creator", "==", email)
            .get()
            .then((response) => {
                context.myDestination = response.docs.map((destination) => { return { id: destination.id, ...destination.data() } });
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/myDestinations.hbs')
                    })
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
        const { email, password, rePassword } = context.params;

        try {
            if (email == '' || password == '' || rePassword == '') {
                throw new Error('Invalid input fields!');
            }

            if (password.length < 6 || rePassword.length < 6) {
                throw new Error('The password should be at least 6 characters long');
            }

            if (password !== rePassword) {
                throw new Error('The repeat password should be equal to the password');
            }
        } catch (error) {
            errorHandler(error.message);
            return;
        }

        UserModel.createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                saveUserData(userData);
                successHandler('User registration successful.');
                this.redirect('/home');
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

        try {
            if (email == '' || password == '') {
                throw new Error('Invalid input fields!');
            }

            if (password.length < 6) {
                throw new Error('The password should be at least 6 characters long');
            }
        } catch (error) {
            errorHandler(error.message);
            return;
        }

        UserModel.signInWithEmailAndPassword(email, password)
            .then((userData) => {
                saveUserData(userData)
                successHandler('Login successful.');
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Logout
    this.get('/logout', function () {
        UserModel.signOut()
            .then(() => {
                clearUserData();
                successHandler('Logout successful.');
                this.redirect('/login');
            })
            .catch(errorHandler);
    })

    //Details
    this.get('/details/:destinationId', function (context) {
        const { destinationId } = context.params;

        DB.collection('destinations')
            .doc(destinationId)
            .get()
            .then((response) => {
                const { email } = getUserData();
                const destinationData = response.data();

                const isCreator = destinationData.creator === email;

                context.destination = { ...response.data(), isCreator, id: destinationId };
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/details.hbs')
                    })
            })
    });

    //Create Destination
    this.get('/create', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/create.hbs')
            })
    });

    this.post('/create', function (context) {
        const { destination, city, duration, departureDate, imgUrl } = context.params;
        const creator = getUserData().email;

        try {
            if (destination == '' || city == '' || duration == '' || departureDate == '' || imgUrl == '') {
                throw new Error('Invalid input fields!');
            }
        } catch (error) {
            errorHandler(error.message);
            return;
        }

        DB.collection('destinations').add({
            destination,
            city,
            duration,
            departureDate,
            imgUrl,
            creator: creator,
        })
            .then((data) => {
                successHandler('Destination created.');
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Edit Destination
    this.get('/edit/:destinationId', function (context) {
        const { destinationId } = context.params;

        DB.collection('destinations')
            .doc(destinationId)
            .get()
            .then((response) => {
                context.destination = { id: destinationId, ...response.data() };
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/edit.hbs');
                    })
            })
    });

    this.post('/edit/:destinationId', function (context) {
        const { destinationId, destination, city, duration, departureDate, imgUrl, } = context.params;

        try {
            if (destination == '' || city == '' || duration == '' || departureDate == '' || imgUrl == '') {
                throw new Error('Invalid input fields!');
            }
        } catch (error) {
            errorHandler(error.message);
            return;
        }

        DB.collection('destinations')
            .doc(destinationId)
            .get()
            .then((response) => {
                return DB.collection('destinations')
                    .doc(destinationId)
                    .set({
                        ...response.data(),
                        destination,
                        city,
                        duration,
                        departureDate,
                        imgUrl,
                    })
            })
            .then((response) => {
                successHandler('Successfully edited destination.');
                this.redirect(`#/details/${destinationId}`);
            })
            .catch(errorHandler);
    });

    //Delete Destination
    this.get('/delete/:destinationId', function (context) {
        const { destinationId } = context.params;

        DB.collection('destinations')
            .doc(destinationId)
            .delete()
            .then(() => {
                successHandler('Destination deleted.');
                this.redirect(`/my-destinations`);
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

function errorHandler(msg) {
    let errorBox = document.getElementById('errorBox');

    errorBox.textContent = msg;
    errorBox.parentElement.style.display = 'block';

    setTimeout(() => errorBox.parentElement.style.display = 'none', 3000);
}

function successHandler(msg) {
    let infoBox = document.getElementById('infoBox');
    console.log(infoBox);

    infoBox.textContent = msg;
    infoBox.parentElement.style.display = 'block';

    setTimeout(() => infoBox.parentElement.style.display = 'none', 3000);
}