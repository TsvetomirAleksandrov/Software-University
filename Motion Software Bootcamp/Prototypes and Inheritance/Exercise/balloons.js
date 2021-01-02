function solve() {
    class Balloon {
        constructor(color, gasWeight) {
            this.color = color;
            this.gasWeight = Number(gasWeight);
        }
    }

    class PartyBalloon extends Balloon {
        constructor(ribbonColor, ribbonLength, ...rest) {
            super(...rest);
            this._ribbon = {
                color: ribbonColor,
                length: ribbonLength
            }
        }

        get ribbon() {
            return this._ribbon;
        }
    }

    class BirthdayBalloon extends PartyBalloon {
        constructor(text, ...rest) {
            super(...rest);
            this._text = text;
        }

        get text() {
            return this._text;
        }
    }

    return { Balloon, PartyBalloon, BirthdayBalloon }
}