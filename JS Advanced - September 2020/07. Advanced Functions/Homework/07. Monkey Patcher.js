function solution(arg) {
    switch (arg) {
        case 'upvote':
            this.upvotes++;
            break;
        case 'downvote':
            this.downvotes++;
            break;
        case 'score':
            return score.call(this); F
    }

    function score() {
        let percents = (this.upvotes / (this.upvotes + this.downvotes)) * 100;
        this.balance = this.upvotes - this.downvotes;

        this.rating = rating.call(this);
        function rating() {
            let check = true;
            if (percents > 66 && this.upvotes + this.downvotes > 10) {
                check = false;
                return 'hot';
            }
            else if (this.balance >= 0 && (this.upvotes > 100 || this.downvotes > 100)) {
                check = false;
                return 'controversial';
            }
            else if (this.balance < 0 && this.upvotes + this.downvotes >= 10) {
                check = false;
                return 'unpopular';
            }
            else if (this.upvotes + this.downvotes < 10 || check) {
                return 'new';
            }
        }

        if (this.upvotes + this.downvotes > 50) {
            let inflationNum = Math.ceil(Math.max(this.upvotes, this.downvotes) * 0.25);
            return ([this.upvotes + inflationNum, this.downvotes + inflationNum, this.balance, this.rating]);
        }
        else {
            return ([this.upvotes, this.downvotes, this.balance, this.rating]);
        }

    }
}

let post = {
    id: '1',
    author: 'pesho',
    content: 'hi guys',
    upvotes: 0,
    downvotes: 0
};