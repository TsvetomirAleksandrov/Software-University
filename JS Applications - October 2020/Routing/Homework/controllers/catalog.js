export default async function () {

    this.partials = {
        header: await this.load('../templates/common/header.hbs'),
        footer: await this.load('../templates/common/footer.hbs'),
        team: await this.load('../templates/catalog/team.hbs')
    };

    const data = Object.assign({}, this.app.userData);
    data.teams = [
        {
            _id: '121221',
            name: 'Apple',
            comment: 'the best team'
        },
        {
            _id: '213213',
            name: 'Cherry',
            comment: 'the best team'
        },
        {
            _id: '454326',
            name: 'Banana',
            comment: 'the best team'
        }
    ];

    this.partial('../templates/catalog/teamCatalog.hbs', data);
}