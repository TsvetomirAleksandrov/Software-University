const app = Sammy('#root', function () {
    this.use('Handlebars', 'hbs');


    this.get('/home', function () {
        this.partial('./templates/homeGuest.hbs');
    });

    this.get('/register', function () {
        this.partial('./templates/register.hbs');
    });

    this.get('/login', function () {
        this.partial('./templates/login.hbs');
    });

    this.get('/create-offer', function () {
        this.partial('./templates/createOffer.hbs');
    });

    this.get('/edit-offer', function () {
        this.partial('./templates/editOffer.hbs');
    });

    this.get('/details', function () {
        this.partial('./templates/details.hbs');
    });
});

(() => {
    app.run('/home');
})();