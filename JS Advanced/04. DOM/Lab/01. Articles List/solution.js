function createArticle() {
	let titleInputElement = document.getElementById('createTitle');
	let contentInputElement = document.getElementById('createContent');

	let headingElement = document.createElement('h3');
	headingElement.innerHTML = titleInputElement.value;

	let contentElement = document.createElement('p');
	contentElement.innerHTML = contentInputElement.value;

   let articleElement = document.createElement('article');
   articleElement.appendChild(headingElement);
   articleElement.appendChild(contentElement);

   let articleSectionElement = document.getElementById('articles');
   articleSectionElement.appendChild(articleElement);
}
