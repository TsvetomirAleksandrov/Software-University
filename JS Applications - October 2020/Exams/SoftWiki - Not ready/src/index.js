import { homePage } from './controllers/catalog.js';
import { registerPage, loginPage, postRegister, postLogin } from './controllers/user.js';
import * as api from './data.js';

window.api = api;

const app = Sammy('#root', function (ctx) {
    this.use('Handlebars', 'hbs');

    //Home routes
    this.get('/', homePage);
    this.get('/home', homePage);

    this.get('/register', registerPage);
    this.get('/login', loginPage);

    this.post('/register', (ctx) => { postRegister(ctx); });
    this.post('/login', (ctx) => { postLogin(ctx); });
});

app.run();