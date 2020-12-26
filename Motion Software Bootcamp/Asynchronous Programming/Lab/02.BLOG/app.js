const baseUrl = `https://blog-apps-c12bf.firebaseio.com`;

function attachEvents() {
    let btnLoadPost = document.getElementById('btnLoadPosts');
    let btnViewPost = document.getElementById('btnViewPost');
    let postsMenu = document.getElementById('posts');
    let postBodyElement = document.getElementById('post-body');
    let postCommentsElement = document.getElementById('post-comments');

    btnLoadPost.addEventListener('click', () => {
        fetch(`${baseUrl}/posts.json`)
            .then(res => res.json())
            .then(data => {
                let options = Object.keys(data).map(key => `<option value="${key}">${data[key].title}</option>`).join('');
                postsMenu.innerHTML = options;
            });
    });

    postsMenu.addEventListener('change', (e) => {
        let id = e.currentTarget.value;

        btnViewPost.addEventListener('click', () => {
            fetch(`${baseUrl}/posts/${id}.json`)
                .then(res => res.json())
                .then(data => {
                    postBodyElement.innerHTML = `${data.body}`
                    let comment = Object.keys(data.comments).map(key => `<li>${data.comments[key]}</li>`).join('');
                    postCommentsElement.innerHTML = comment;
                });
        });
    })
}

attachEvents();