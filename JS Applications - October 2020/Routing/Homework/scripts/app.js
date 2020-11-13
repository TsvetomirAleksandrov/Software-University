import home from '../controllers/home.js';

$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            loggedIn: false,
            hasTeam: false
        };

        this.get('index.html', home);
    });

    app.run();
});