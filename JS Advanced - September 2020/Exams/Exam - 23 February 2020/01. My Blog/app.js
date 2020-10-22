function solve() {
   let inputs = document.querySelectorAll('section input');
   let [author, title, category] = inputs;
   let content = document.querySelector('#content');

   let articlesSection = document.querySelector('main section');
   let archivesSectionUl = document.querySelector('.archive-section ul');

   let createButton = document.querySelector('button[class = "btn create"]');

   createButton.addEventListener('click', createArticle);

   let archive = [];

   function createArticle(e) {
      e.preventDefault();

      let article = document.createElement('article');

      let h1 = document.createElement('h1');
      h1.textContent = title.value;

      let s1 = document.createElement('strong');
      s1.textContent = category.value;

      let p1 = document.createElement('p');
      p1.textContent = 'Category:';
      p1.appendChild(s1);

      let s2 = document.createElement('strong');
      s2.textContent = author.value;

      let p2 = document.createElement('p');
      p2.textContent = 'Creator:';
      p2.appendChild(s2);

      let p3 = document.createElement('p');
      p3.textContent = content.value;

      let div = document.createElement('div');
      div.className = 'buttons';

      let deleteButton = document.createElement('button');
      deleteButton.className = 'btn delete'
      deleteButton.textContent = 'Delete';

      let archiveButton = document.createElement('button');
      archiveButton.className = 'btn archive'
      archiveButton.textContent = 'Archive';


      deleteButton.addEventListener('click', deleteArticle);
      archiveButton.addEventListener('click', archiveArticle);

      div.appendChild(deleteButton);
      div.appendChild(archiveButton);

      article.appendChild(h1);
      article.appendChild(p1);
      article.appendChild(p2);
      article.appendChild(p3);
      article.appendChild(div);

      articlesSection.appendChild(article);

      author.value = '';
      title.value = '';
      category.value = '';
      content.value = '';


      function deleteArticle(e) {
         e.currentTarget.parentElement.parentElement.remove();
      }

      function archiveArticle(e) {
         archivesSectionUl.textContent = '';

         let currentTitle = e.currentTarget.parentElement.parentElement.firstChild;

         let liElement = document.createElement('li');
         liElement.textContent = currentTitle.textContent;

         archive.push(liElement);

         let sorted = archive.sort((a, b) => a.textContent.localeCompare(b.textContent));

         sorted.forEach((element) => {
            archivesSectionUl.appendChild(element);
         });

         e.target.parentElement.parentElement.remove();
      }
   }
}
