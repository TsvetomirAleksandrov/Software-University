class Article {
    #comments
    #likes

    constructor(title, creator) {
        this.title = title;
        this.creator = creator;
        this.#comments = [];
        this.#likes = [];
    }

    get likes() {
        if (this.#likes.length === 0) {
            return `${this.title} has 0 likes`;
        } else if (this.#likes.length === 1) {
            return `${this.#likes[0]} likes this article!`;
        } else {
            return `${this.#likes[0]} and ${this.#likes.length - 1} others like this article!`;
        }
    }

    like(username) {
        if (this.#likes.includes(username)) {
            throw new Error("You can't like the same article twice!");
        } else if (this.creator === username) {
            throw new Error("You can't like your own articles!");
        } else {
            this.#likes.push(username);
            return `${username} liked ${this.title}!`;
        }
    }

    dislike(username) {
        if (!this.#likes.includes(username)) {
            throw new Error("You can't dislike this article!");
        } else {
            this.#likes.splice(this.#likes.indexOf(username), 1);
            return `${username} disliked ${this.title}`;
        }
    }

    comment(username, content, id) {
        if (this.#comments[id - 1] === undefined || id === undefined) {
            this.#comments[this.#comments.length] = { Id: this.#comments.length + 1, Username: username, Content: content, Replies: [] };
            return `${username} commented on ${this.title}`;
        } else {
            this.#comments[id - 1].Replies.push({ Id: `${id}.${this.#comments[id - 1].Replies.length + 1}`, Username: username, Content: content });
            return 'You replied successfully';
        }
    }

    toString(sortType) {
        let sorting = {
            'asc': (arr) => arr.sort((a, b) => a.Id - b.Id),
            'desc': (arr) => arr.sort((a, b) => b.Id - a.Id),
            'username': (arr) => arr.sort((a, b) => (a.Username).localeCompare(b.Username))
        };
        let sortedComments = sorting[sortType](this.#comments);

        let result = '';
        for (const comment of sortedComments) {
            if (comment !== undefined) {
                result += `\n-- ${comment.Id}. ${comment.Username}: ${comment.Content}`;
                for (const reply of sorting[sortType](comment.Replies)) {
                    result += `\n--- ${reply.Id}. ${reply.Username}: ${reply.Content}`;
                }
            }
        }
        return `Title: ${this.title}\nCreator: ${this.creator}\nLikes: ${this.#likes.length}\nComments:${result}`;
    }
}