import home from '../controllers/home.js';
import about from '../controllers/about.js';
import register, { registerPost } from '../controllers/register.js';
import login, { loginPost, logout } from '../controllers/login.js';
import catalog from '../controllers/catalog.js';
import details from '../controllers/details.js';
import create, { createPost } from '../controllers/create.js';
import edit from '../controllers/edit.js';

$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');

        this.userData = {
            loggedIn: false,
            hasTeam: false
        };

        this.get('index.html', home);
        this.get('#/home', home);
        this.get('/', home);
        this.get('#/about', about);

        this.get('#/register', register);
        this.get('#/login', login);
        this.get('#/logout', logout);

        this.get('#/catalog', catalog);
        this.get('#/catalog/:id', details);

        this.get('#/create', create);

        this.get('#/edit/:id', edit);

        this.post('#/register', (ctx) => { registerPost.call(ctx); });

        this.post('#/login', (ctx) => { loginPost.call(ctx); });

        this.post('#/create', (ctx) => { createPost.call(ctx); });
    });

    app.run();
});