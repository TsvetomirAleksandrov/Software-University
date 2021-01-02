function solve() {
    class Post {
        constructor(title, content) {
            this.title = title;
            this.content = content;
        }

        toString() {
            let result = [`Post: ${this.title}`, `Content: ${this.content}`];
            return result.join('\n');
        }
    }

    class SocialMediaPost extends Post {
        constructor(title, content, likes, dislikes) {
            super(title, content);
            this.likes = Number(likes);
            this.dislikes = Number(dislikes);
            this.comments = [];
        }

        addComment(comment) {
            return this.comments.push(comment);
        }

        toString() {
            let result = [super.toString(),
            `Rating: ${this.likes - this.dislikes}`
            ];

            if (this.comments.length > 0) {
                result.push(`Comments:`);
                this.comments.forEach(comment => {
                    result.push(` * ${comment}`);
                })
            }

            return result.join('\n');
        }
    }

    class BlogPost extends Post {
        constructor(title, content, views) {
            super(title, content);
            this.views = Number(views);
        }

        view() {
            return this.views++;
        }

        toString() {
            let result = [super.toString(),
            `Views: ${this.views}`
            ];

            return result.join('\n');
        }
    }

    return { Post, SocialMediaPost, BlogPost }
}


let result = solve();
let Post = result.Post;
let SocialMediaPost = result.SocialMediaPost;
let BlogPost = result.BlogPost;

// let scm = new SocialMediaPost('TestTitle', 'TestContent', 25, 30);
// scm.addComment('Good post');
// scm.addComment('Very good post');
// scm.addComment('Wow!');

// console.log(scm.toString());

let bp = new BlogPost('TestTitle', 'TestContent', 25);
bp.view();
console.log(bp.toString());


