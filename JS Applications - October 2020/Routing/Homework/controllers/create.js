export default async function () {

    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        createForm: await this.load('../templates/create/createForm.hbs'),
    };

    this.partial('../templates/create/createPage.hbs', this.app.data);
}