let { assert } = require('chai');
let { lookupChar } = require('./lookupChar.js');

describe('charLookUp', () => {
    it('should return undefined with incorrect first param', () => {
        assert.equal(undefined, lookupChar('pesho', 'gosho'));
    })

    it('should return Incorrect with incorrect first param length', () => {
        assert.equal('Incorrect index', lookupChar('pesho', 5));
    })

    it('should return Incorrect with incorrect first param lower than 0', () => {
        assert.equal('Incorrect index', lookupChar('Pesho', -1));
    })

    it('should return Correct character', () => {
        assert.equal('a', lookupChar('Stamat', 2));
    })

})