let { addFive, subtractTen, sum } = require('./mathEnforcer.js');
let { assert } = require('chai');

describe('mathEnforcer', () => {
    describe('addFive', () => {
        it('should return undefined with incorrect type', () => {
            assert.equal(undefined, addFive('Pesho'));
        })

        it('should return correct number', () => {
            assert.equal(10, addFive(5));
        })
    })

    describe('subtractTen', () => {
        it('should return undefined with incorrect type', () => {
            assert.equal(undefined, subtractTen('Pesho'));
        })

        it('should return correct value', () => {
            assert.equal(0, subtractTen(10));
        })
    })

    describe('sum', () => {
        it('should return undefined with incorrect first parameter', () => {
            assert.equal(undefined, sum('Pesho', 5));
        })

        it('should return undefined with incorrect second parameter', () => {
            assert.equal(undefined, sum(5, 'Pesho'));
        })

        it('should return correct sum', () => {
            assert.equal(10, sum(5, 5));
        })
    })

    
})