import { html, render } from './node_modules/lit-html/lit-html.js';

import layout from './views/layout.js';
import home from './views/home.js';
import login from './views/login.js';
import register from './views/register.js';
import notFound from './views/not-found.js';

const routes = [
    {
        path: '/',
        template: home
    },
    {
        path: '/login',
        template: login
    },
    {
        path: '/register',
        template: register
    },
    {
        path: '/not-found',
        template: notFound
    },
];

const router = (path) => {
    history.pushState({}, '', path);

    let route = routes.find(x => x.path == path) || routes.find(x => x.path == '/not-found');

    render(layout(route.template(), { navigationHandler }), document.getElementById('app'));
};

function navigationHandler(e) {
    if (e.target.tagName == 'A') {
        e.preventDefault();

        let url = new URL(e.target.href);

        router(url.pathname);
    }
}

router(location.pathname);


