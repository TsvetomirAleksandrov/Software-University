import { createTeam } from '../scripts/data.js'

export default async function () {

    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        createForm: await this.load('../templates/create/createForm.hbs'),
    };

    this.partial('../templates/create/createPage.hbs', this.app.data);
}

export async function createPost() {
    const newTeam = {
        name: this.params.name,
        comment: this.params.comment
    };

    if (Object.values(newTeam).some(v => v.length == 0)) {
        alert('All fields are required!');

        return;
    }

    try {
        const result = await createTeam(newTeam);

        if (result.hasOwnProperty('errorData')) {
            const error = new Error();
            Object.assign(error, result);
            throw error;
        }

        this.app.userData.hasTeam = true;
        this.app.userData.teamId = result.objectI;
        this.redirect(`#/catalog/${result.objectId}`);
    } catch (err) {
        alert(err.message);
    }
}