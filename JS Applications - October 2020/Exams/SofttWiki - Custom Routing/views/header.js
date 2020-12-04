import { html } from '../node_modules/lit-html/lit-html.js';

export default ({
    navigationHandler
}) => html`
<!-- Header -->
<header @click=${navigationHandler}>
    <h1><a class="home" href="/">SoftWiki</a></h1>
    <nav class="nav-buttons">
        <a href="/create">Create</a>
        <a href="/logout">Logout</a>
        <a href="/register">Register</a>
    </nav>
</header>
    `;

