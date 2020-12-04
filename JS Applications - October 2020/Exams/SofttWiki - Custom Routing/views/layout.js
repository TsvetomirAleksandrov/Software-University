import { html } from '../node_modules/lit-html/lit-html.js';

import header from './header.js';
import footer from './footer.js';

export default (children, props) => html`
${header(props)}

${children}

${footer(props)}
    `;

