function solution() {
    class Article {
      constructor(title, content) {
        this.title = title;
        this.content = content;
      }
      toString() {
        return [`Title: ${this.title}`, `Content: ${this.content}`].join("\n");
      }
    }
   
    class ShortReports extends Article {
      constructor(title, content, originalResearch) {
        if (content.length >= 150) {
          throw new Error(
            `Short reports content should be less then 150 symbols.`
          );
        }
        if (
          !originalResearch.hasOwnProperty("title") ||
          !originalResearch.hasOwnProperty("author")
        ) {
          throw new Error(`The original research should have author and title.`);
        }
        super(title, content);
        this.originalResearches = originalResearch;
        this.comments = [];
      }
   
      addComment(comment) {
        this.comments.push(comment);
        return `The comment is added.`;
      }
   
      toString() {
        let result = [
          super.toString(),
          `Original Research: ${this.originalResearches.title} by ${this.originalResearches.author}`,
        ];
        if (this.comments.length > 0) {
          result.push(`Comments:`);
          this.comments.forEach((c) => result.push(c));
        }
        return result.join("\n");
      }
    }
   
    class BookReview extends Article {
      constructor(title, content, book) {
        super(title, content);
        this.book = book;
        this.clients = [];
      }
   
      addClient(clientName, orderDescription) {
        if (this.clients.find((c) => c.clientName === clientName) !== undefined) {
          throw new Error(`This client has already ordered this review.`);
        } else {
          this.clients.push({ clientName, orderDescription });
          return `${clientName} has ordered a review for ${this.book.name}`;
        }
      }
   
      toString() {
        let result = [super.toString()];
        result.push(`Book: ${this.book.name}`);
        if (this.clients.length > 0) {
          result.push(`Orders:`);
          this.clients.forEach((c) =>
            result.push(`${c.clientName} - ${c.orderDescription}`)
          );
        }
        return result.join("\n");
      }
    }
    return { Article, ShortReports, BookReview };
  }

  
