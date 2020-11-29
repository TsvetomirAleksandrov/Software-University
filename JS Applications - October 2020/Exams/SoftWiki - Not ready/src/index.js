import { homePage } from './controllers/catalog.js';
import * as api from './data.js';

window.api = api;

const app = Sammy('#root', function (context) {
    this.use('Handlebars', 'hbs');

    //Home routes
    this.get('/', homePage);
    this.get('/home', homePage);

});

app.run('');