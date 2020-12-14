function createArticle() {
	let titleInput = document.getElementById('createTitle');
	let contentInput = document.getElementById('createContent');

	let articlesList = document.getElementById('articles');

	let articleTitle = document.createElement('h3');
	let articleContent = document.createElement('p');

	articleTitle.innerHTML = titleInput.value;
	articleContent.innerHTML = contentInput.value;

	articlesList.appendChild(articleTitle);
	articlesList.appendChild(articleContent);

	titleInput.value = '';
	contentInput.value = '';
}