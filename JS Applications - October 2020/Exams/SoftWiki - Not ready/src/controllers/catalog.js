import { addPartials } from '../util.js';
import { getAll } from '../data.js';


export async function homePage() {
    await addPartials(this);

    const data = await getAll();

    

    this.partial('/templates/catalog/homePage.hbs');
}