import { addPartials, mapCategories } from '../util.js';
import { getAll } from '../data.js';


export async function homePage() {
    await addPartials(this);
    this.partials.article = await this.load('/templates/catalog/article.hbs');

    const data = mapCategories(await getAll());

    const context = data;

    this.partial('/templates/catalog/homePage.hbs', context);
}