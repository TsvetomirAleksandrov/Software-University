const UserModel = firebase.auth();
const DB = firebase.firestore();

const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');


    this.get('/home', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/homePage.hbs');
            })
    });

    this.get('/dashboard', function (context) {

        DB.collection('ideas')
            .get()
            .then((response) => {
                context.ideas = response.docs.map((i) => { return { id: i.id, ...i.data() } });
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/dashboard.hbs');
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
        const { email, password, repeatPassword } = context.params;

        try {
            if (password !== repeatPassword) {
                return;
            }

            if (password.length < 3 !== repeatPassword.length < 3) {
                return;
            }

        } catch (error) {
            errorHandler(error);
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

    //Share Idea
    this.get('/share-idea', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/shareIdea.hbs');
            })
    });

    this.post('/share-idea', function (context) {
        const { title, description, imageURL } = context.params;

        if (title == '' || imageURL == '' || description == '') {
            errorHandler('Invalid inputs!');
            return;
        }

        DB.collection('ideas').add({
            title,
            description,
            imageURL,
            creator: getUserData().email,
            likes: [],
            comments: []
        })
            .then((data) => {
                console.log(data);
                this.redirect('/home');
            })
            .catch(errorHandler);
    });

    //Details
    this.get('/details/:ideaId', function (context) {
        const { ideaId } = context.params;

        DB.collection('ideas')
            .doc(ideaId)
            .get()
            .then((response) => {

                const { email } = getUserData();
                const actualIdeaData = response.data();

                const isCreator = actualIdeaData.creator === email;
                const ideaCreator = actualIdeaData.creator;

                const userIndex = actualIdeaData.likes.indexOf(email);
                const iLiked = userIndex > -1;

                const likesCount = actualIdeaData.likes.length;

                context.idea = { ...response.data(), isCreator, id: ideaId, iLiked, likesCount, ideaCreator };
                extendContext(context)
                    .then(function () {
                        this.partial('./templates/ideaDetails.hbs');
                    })
            })
    });


    //Delete Idea
    this.get('/delete/:ideaId', function (context) {
        const { ideaId } = context.params;

        DB.collection('ideas')
            .doc(ideaId)
            .delete()
            .then(() => {
                this.redirect('/dashboard');
            })
            .catch(errorHandler);
    });

    //Like Idea
    this.get('/like/:ideaId', function (context) {
        const { ideaId } = context.params;
        const { email } = getUserData();

        DB.collection('ideas')
            .doc(ideaId)
            .get()
            .then((response) => {
                const ideasData = { ...response.data() };

                if (!ideasData.likes.contains(email)) {
                    ideasData.likes.push(email);

                    return DB.collection('ideas')
                        .doc(ideaId)
                        .set(ideasData)
                }
            })
            .then(() => {
                this.redirect(`#/details/${ideaId}`);
            })
            .catch(errorHandler);
    });

    //Comment Idea
    this.get('/comment/:ideaId', function (context) {
        const { ideaId, newComment } = context.params;
        const { email } = getUserData();

        DB.collection('ideas')
            .doc(ideaId)
            .get()
            .then((response) => {
                const ideasData = { ...response.data() };

                if (!ideasData.comments.some(comment => comment.email === email && comment.comment === newComment)) {
                    
                    ideasData.comments.push({ email: email, comment: newComment });

                    return DB.collection('ideas')
                        .doc(ideaId)
                        .set(ideasData)
                }
            })
            .then(() => {
                this.redirect(`#/details/${ideaId}`);
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
    })
}

function errorHandler(error) {
    console.log(error);
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

// function errorHandler(msg) {
//     let errorBox = document.getElementById('errorBox');

//     errorBox.textContent = msg;
//     errorBox.parentElement.style.display = 'block';

//     setTimeout(() => errorBox.parentElement.style.display = 'none', 1000);
// }

// function successHandler(msg) {
//     let validBox = document.getElementById('successBox');

//     validBox.textContent = msg;
//     validBox.parentElement.style.display = 'block';

//     setTimeout(() => validBox.parentElement.style.display = 'none', 1000);
// }