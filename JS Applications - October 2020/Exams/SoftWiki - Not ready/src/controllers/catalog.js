import { addPartials } from '../util.js';
import { getAll } from '../data.js';


export async function homePage() {
    await addPartials(this);
    this.partials.article = await this.load('/templates/catalog/article.hbs');

    // const context = {
    //     articles: await getAll()
    // };

    const context = {
        js: [
            {
                title: 'Article1',
                category: 'JavaScript',
                content: 'Lorem ipsum dolor sit amet'
            },
            {
                title: 'Article2',
                category: 'JavaScript',
                content: 'dolor sit amet'
            }
        ],
        java: [
            {
                title: 'Article1',
                category: 'Java',
                content: 'Lorem ipsum dolor sit amet'
            },
        ],
    };


    this.partial('/templates/catalog/homePage.hbs', context);
}