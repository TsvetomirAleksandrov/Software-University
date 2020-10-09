function lockedProfile() {
    let profiles = document.getElementsByClassName('profile');;
    for (const profile of Array.from(profiles)) {
        profile.addEventListener('click', showMore);
    }

    function showMore(e) {
        let unlocked = e.target.parentNode.getElementsByTagName('input')[1].checked;

        if (e.target.tagName.toLowerCase() === 'button' && unlocked === true) {
            if (e.target.textContent === 'Show more') {
                e.target.parentNode.getElementsByTagName('div')[0].style.display = 'block';
                e.target.textContent = 'Hide it';
            } else {
                e.target.parentNode.getElementsByTagName('div')[0].style.display = 'none';
                e.target.textContent = 'Show more';
            }
        }
    }
}