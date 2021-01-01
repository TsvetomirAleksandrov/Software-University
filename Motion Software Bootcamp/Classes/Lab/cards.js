(function name(params) {
    let validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    let validSuits = ['♠', '♥', '♦', '♣'];
    let Suits = {
        SPADES: '♠',
        HEARTS: '♥',
        DIAMONDS: '♦',
        CLUBS: '♣',
    };

    class Card {
        constructor(face, suit) {
            if (!validFaces.includes(face)) {
                throw new Error('Invalid Card Face!');
            }
            if (!validSuits.includes(suit)) {
                throw new Error('Invalid Card Suit!');
            }
            this.face = face;
            this.suit = suit;
        }
    }

    return {
        Suits: Suits,
        Card: Card
    }
}())