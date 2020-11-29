import { addPartials, getUserId, mapCategories, categoryMap } from '../util.js';
import { createArticle, editArticle, deleteById, getAll, getById } from '../data.js';


export async function homePage() {
    await addPartials(this);
    this.partials.article = await this.load('/templates/catalog/article.hbs');

    const data = mapCategories(await getAll());
    const context = data;
    context.user = this.app.userData;

    this.partial('/templates/catalog/homePage.hbs', context);
}

export async function detailsPage() {
    await addPartials(this);

    const article = await getById(this.params.id);
    const context = {
        user: this.app.userData,
        article,
        canEdit: article._ownerId == getUserId()
    };

    this.partial('/templates/catalog/detailsPage.hbs', context);
}

export async function createPage() {
    await addPartials(this);

    const context = {
        user: this.app.userData
    };

    this.partial('/templates/catalog/createPage.hbs', context);
}

export async function postCreate(ctx) {
    const { title, category, content } = ctx.params;
    try {
        if (title.length == 0 || category.length == 0 || content.length == 0) {
            throw new Error('All fields are required!');
        } else if (categoryMap.hasOwnProperty(category) === false) {
            throw new Error('Invalid category!');
        } else {
            const result = await createArticle({
                title,
                category,
                content
            });
            ctx.redirect('/home');
        }
    } catch (err) {
        alert(err.message);
    }
}

export async function editPage() {
    await addPartials(this);

    const article = await getById(this.params.id);
    if (article._ownerId !== getUserId()) {
        this.redirect('/home');
    } else {
        const context = {
            user: this.app.userData,
            article
        };

        this.partial('/templates/catalog/editPage.hbs', context);
    }
}

export async function postEdit(ctx) {
    const { title, category, content } = ctx.params;
    try {
        if (title.length == 0 || category.length == 0 || content.length == 0) {
            throw new Error('All fields are required!');
        } else if (categoryMap.hasOwnProperty(category) === false) {
            throw new Error('Invalid category!');
        } else {
            const result = await editArticle(ctx.params.id, {
                title,
                category,
                content
            });
            ctx.redirect('/home');
        }
    } catch (err) {
        alert(err.message);
    }
}

export async function deleteArticle() {
    try {
        const id = this.params.id;
        const result = deleteById(id);
        this.redirect('/home');
    } catch (err) {
        alert(err.message);
    }
}