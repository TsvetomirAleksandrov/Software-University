function getArticleGenerator(articles) {
    return function () {
        let arr = articles;
        if (arr.length > 0) {
            return (function () {
                let current = arr.shift();
                let newArticle = document.createElement('article');
                newArticle.textContent = current;
                document.getElementById('content').appendChild(newArticle);
            })();
        }
    }
}