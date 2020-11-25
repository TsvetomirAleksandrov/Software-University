const UserModel = firebase.auth();
const DB = firebase.firestore();

const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');


    this.get('/home', function (context) {

        DB.collection('events')
            .get()
            .then((response) => {
                context.events = response.docs.map((e) => { return { id: e.id, ...e.data() } });
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/home.hbs');
                    })
            })
            .catch(errorHandler);
    });

    //Sign-Up
    this.get('/register', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/register.hbs');
            })
    });

    this.post('/register', function (context) {
        const { email, password, rePassword } = context.params;

        if (password !== rePassword) {
            return;
        }

        UserModel.createUserWithEmailAndPassword(email, password)
            .then((userData) => {
                this.redirect('/login');
            })
            .catch(errorHandler);
    })

    //Sign-In
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

    //Sign-Out
    this.get('/logout', function (context) {
        UserModel.signOut()
            .then(() => {
                clearUserData();
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Create Event
    this.get('/organize-event', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/createEvent.hbs');
            })
    });

    this.post('/organize-event', function (context) {
        const { name, dateTime, description, imageUrl } = context.params;

        if (name == '' || imageUrl == '' || description == '' || dateTime == '') {
            errorHandler('Invalid inputs!');
            return;
        }

        DB.collection('events').add({
            name,
            dateTime,
            description,
            imageUrl,
            creator: getUserData().uid,
            visitors: []
        })
            .then((data) => {
                console.log(data);
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Details
    this.get('/details/:eventId', function (context) {
        const { eventId } = context.params;

        DB.collection('events')
            .doc(eventId)
            .get()
            .then((response) => {

                const { uid } = getUserData();
                const actualEventData = response.data();
                const imTheCreator = actualEventData.creator === uid;

                const userIndex = actualEventData.visitors.indexOf(uid);
                const iVisited = userIndex > -1;

                context.e = { ...response.data(), imTheCreator, id: eventId, iVisited };
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/details.hbs');
                    })
            })
    });

    //Edit

    //Delete

    //Join Event

    //User Profile








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
    })
}

function errorHandler(error) {
    alert(error);
}

function getUserData() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

function saveUserData(data) {
    const { user: { email, uid } } = data;
    localStorage.setItem('user', JSON.stringify({ email, uid }));
}

function clearUserData() {
    this.localStorage.removeItem('user');
}