function loadCommits() {
    let username = document.getElementById('username').value;
    let repo = document.getElementById('repo').value;

    let commitsElement = document.getElementById('commits');

    fetch(`https://api.github.com/repos/${username}/${repo}/commits`)
    .then(res => res.json())
    .then(commitsData => {
        let commits = commitsData.map(x => `<li>${x.commit.author.name}: ${x.commit.message}</li>`).join('');

        commitsElement.innerHTML = commits;
    })
    .catch(err => {
        commitsElement.innerHTML = `<li>${err.status}: (${err.statusText})</li>`
    })
}