const createArticle = (data) => `
<article>
  <header>
      <h3>${data.title}</h3>
  </header>

      <section>
          <p>${data.body}</p>
      </section>

  <footer>
      <p>Author: ${data.author}</p>
  </footer>
  
</article>
`;

export default createArticle;