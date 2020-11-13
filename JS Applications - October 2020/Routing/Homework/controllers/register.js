export default async function () {

    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        registerForm: await this.load('../templates/register/registerForm.hbs')
    };
    this.partial('../templates/register/registerPage.hbs');
}