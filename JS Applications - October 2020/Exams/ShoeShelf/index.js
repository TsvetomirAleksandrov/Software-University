const UserModel = firebase.auth();

const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');

    //Home
    this.get('/home', function (context) {

        extendContext(context)
            .then(function () {
                this.partial('./templates/homeGuest.hbs');
            })
    });


    //Register
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
                this.redirect('/home');
            })
            .catch((error) => console.log(error))
    });

    //Login
    this.get('/login', function (context) {
        extendContext(context)
            .then(function () {
                this.partial('./templates/login.hbs');
            })
    });

    this.post('/login', function (context) {

    });

    //Create Offer
    this.get('/create-offer', function (context) {
        this.partial('./templates/createOffer.hbs');
    });

    //Edit Offer
    this.get('/edit-offer', function (context) {
        this.partial('./templates/editOffer.hbs');
    });

    //Details
    this.get('/details', function (context) {
        this.partial('./templates/details.hbs');
    });
});

(() => {
    app.run('/home');
})();

function extendContext(context) {
    return context.loadPartials({
        'header': './partials/header.hbs',
        'footer': './partials/footer.hbs',
    })
}