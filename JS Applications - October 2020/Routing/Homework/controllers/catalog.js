export default async function () {

    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        team: await this.load('../templates/catalog/team.hbs')
    };
    this.partial('../templates/catalog/teamCatalog.hbs');
}