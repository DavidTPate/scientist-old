'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const Scientist = require('../lib/index');

describe('Synchronous Experiments', () => {

    it('should be able to experiment with only a control', (done) => {

        const marieCurie = new Scientist({
            reporter: {
                onResult: function (results) {

                    expect(results.control.duration).to.be.above(0);
                    expect(results.control.name).to.equal('Yes, yes it is');
                    expect(results.control.args).to.equal(null);
                    expect(results.control.value).to.equal(true);
                    expect(results.control.error).to.equal(null);
                    expect(results.control.timeDifference).to.equal(null);
                    expect(results.control.differences).to.equal(null);
                    expect(results.control.errorDifferences).to.equal(null);
                    expect(results.candidates).to.deep.equal([]);
                    done();
                }
            }
        });

        const radiationExperiment = marieCurie.createExperiment({
            name: 'Is Radiation Bad?'
        });
        radiationExperiment.use({
            name: 'Yes, yes it is',
            func: function () {

                return true;
            }
        });
        expect(radiationExperiment.study()).to.deep.equal(true);
    });

    it('should be able to experiment with the same primitive values', (done) => {

        const marieCurie = new Scientist({
            reporter: {
                onResult: function (results) {

                    expect(results.control.duration).to.be.above(0);
                    expect(results.control.name).to.equal('Yes, yes it is');
                    expect(results.control.args).to.equal(null);
                    expect(results.control.value).to.equal(true);
                    expect(results.control.error).to.equal(null);
                    expect(results.control.timeDifference).to.equal(null);
                    expect(results.control.differences).to.equal(null);
                    expect(results.control.errorDifferences).to.equal(null);
                    expect(results.candidates[0].duration).to.be.above(results.control.duration);
                    expect(results.candidates[0].name).to.equal('It depends');
                    expect(results.candidates[0].args).to.equal(null);
                    expect(results.candidates[0].value).to.equal(true);
                    expect(results.candidates[0].error).to.equal(null);
                    expect(results.candidates[0].timeDifference).to.be.below(results.candidates[0].duration);
                    expect(results.candidates[0].timeDifference).to.equal(results.candidates[0].duration - results.control.duration);
                    expect(results.candidates[0].differences).to.equal(null);
                    expect(results.candidates[0].errorDifferences).to.equal(null);
                    done();
                }
            }
        });

        const radiationExperiment = marieCurie.createExperiment({
            name: 'Is Radiation Bad?'
        });
        radiationExperiment.use({
            name: 'Yes, yes it is',
            func: function () {

                return true;
            }
        });
        radiationExperiment.try({
            name: 'It depends',
            func: function () {

                let items = ['one', 'two', 'three', 'four', 'five'];
                items = items.concat(items);
                items = items.concat(items);
                items = items.concat(items);
                items = items.concat(items);
                items.forEach((item) => {

                });
                return true;
            }
        });
        expect(radiationExperiment.study()).to.deep.equal(true);
    });

    it('should be able to experiment with differing primitive values', (done) => {

        const marieCurie = new Scientist({
            reporter: {
                onResult: function (results) {

                    expect(results.control.duration).to.be.above(0);
                    expect(results.control.name).to.equal('Yes, yes it is');
                    expect(results.control.args).to.equal(null);
                    expect(results.control.value).to.equal(true);
                    expect(results.control.error).to.equal(null);
                    expect(results.control.timeDifference).to.equal(null);
                    expect(results.control.differences).to.equal(null);
                    expect(results.control.errorDifferences).to.equal(null);
                    expect(results.candidates[0].duration).to.be.a.number();
                    expect(results.candidates[0].name).to.equal('It depends');
                    expect(results.candidates[0].args).to.equal(null);
                    expect(results.candidates[0].value).to.equal(false);
                    expect(results.candidates[0].error).to.equal(null);
                    expect(results.candidates[0].timeDifference).to.be.a.number();
                    expect(results.candidates[0].timeDifference).to.equal(results.candidates[0].duration - results.control.duration);
                    expect(results.candidates[0].differences).to.deep.equal([{
                        kind: 'E',
                        lhs: true,
                        rhs: false
                    }], {
                        prototype: false
                    });
                    expect(results.candidates[0].errorDifferences).to.equal(null);
                    done();
                }
            }
        });

        const radiationExperiment = marieCurie.createExperiment({
            name: 'Is Radiation Bad?'
        });
        radiationExperiment.use({
            name: 'Yes, yes it is',
            func: function () {

                return true;
            }
        });
        radiationExperiment.try({
            name: 'It depends',
            func: function () {

                return false;
            }
        });
        expect(radiationExperiment.study()).to.deep.equal(true);
    });

    it('should be able to experiment with the same non-primitive values', (done) => {

        const marieCurie = new Scientist({
            reporter: {
                onResult: function (results) {

                    expect(results.control.duration).to.be.above(0);
                    expect(results.control.name).to.equal('Yes, yes it is');
                    expect(results.control.args).to.equal(null);
                    expect(results.control.value).to.deep.equal([
                        {
                            name: 'It'
                        },
                        {
                            name: 'Depends'
                        }
                    ]);
                    expect(results.control.error).to.equal(null);
                    expect(results.control.timeDifference).to.equal(null);
                    expect(results.control.differences).to.equal(null);
                    expect(results.control.errorDifferences).to.equal(null);
                    expect(results.candidates[0].duration).to.be.a.number();
                    expect(results.candidates[0].name).to.equal('It depends');
                    expect(results.candidates[0].args).to.equal(null);
                    expect(results.candidates[0].value).to.deep.equal([
                        {
                            name: 'It'
                        },
                        {
                            name: 'Depends'
                        }
                    ]);
                    expect(results.candidates[0].error).to.equal(null);
                    expect(results.candidates[0].timeDifference).to.be.a.number();
                    expect(results.candidates[0].timeDifference).to.equal(results.candidates[0].duration - results.control.duration);
                    expect(results.candidates[0].differences).to.equal(null);
                    expect(results.candidates[0].errorDifferences).to.equal(null);
                    done();
                }
            }
        });

        const radiationExperiment = marieCurie.createExperiment({
            name: 'Is Radiation Bad?'
        });
        radiationExperiment.use({
            name: 'Yes, yes it is',
            func: function () {

                return [
                    {
                        name: 'It'
                    },
                    {
                        name: 'Depends'
                    }
                ];
            }
        });
        radiationExperiment.try({
            name: 'It depends',
            func: function () {

                return [
                    {
                        name: 'It'
                    },
                    {
                        name: 'Depends'
                    }
                ];
            }
        });
        expect(radiationExperiment.study()).to.deep.equal([
            {
                name: 'It'
            },
            {
                name: 'Depends'
            }
        ]);
    });

    it('should be able to experiment with differing non-primitive values', (done) => {

        const marieCurie = new Scientist({
            reporter: {
                onResult: function (results) {

                    expect(results.control.duration).to.be.above(0);
                    expect(results.control.name).to.equal('Yes, yes it is');
                    expect(results.control.args).to.equal(null);
                    expect(results.control.value).to.deep.equal([
                        {
                            name: 'It'
                        },
                        {
                            name: 'Depends'
                        }
                    ]);
                    expect(results.control.error).to.equal(null);
                    expect(results.control.timeDifference).to.equal(null);
                    expect(results.control.differences).to.equal(null);
                    expect(results.control.errorDifferences).to.equal(null);
                    expect(results.candidates[0].duration).to.be.a.number();
                    expect(results.candidates[0].name).to.equal('It depends');
                    expect(results.candidates[0].args).to.equal(null);
                    expect(results.candidates[0].value).to.deep.equal([
                        {
                            name: 'Depends'
                        },
                        {
                            name: 'It'
                        }
                    ]);
                    expect(results.candidates[0].error).to.equal(null);
                    expect(results.candidates[0].timeDifference).to.be.a.number();
                    expect(results.candidates[0].timeDifference).to.equal(results.candidates[0].duration - results.control.duration);
                    expect(results.candidates[0].differences).to.deep.equal([{
                        kind: 'E',
                        path: [
                            0,
                            'name'
                        ],
                        lhs: 'It',
                        rhs: 'Depends'
                    }, {
                        kind: 'E',
                        path: [
                            1,
                            'name'
                        ],
                        lhs: 'Depends',
                        rhs: 'It'
                    }], {
                        prototype: false
                    });
                    expect(results.candidates[0].errorDifferences).to.equal(null);
                    done();
                }
            }
        });

        const radiationExperiment = marieCurie.createExperiment({
            name: 'Is Radiation Bad?'
        });
        radiationExperiment.use({
            name: 'Yes, yes it is',
            func: function () {

                return [
                    {
                        name: 'It'
                    },
                    {
                        name: 'Depends'
                    }
                ];
            }
        });
        radiationExperiment.try({
            name: 'It depends',
            func: function () {

                return [
                    {
                        name: 'Depends'
                    },
                    {
                        name: 'It'
                    }
                ];
            }
        });
        expect(radiationExperiment.study()).to.deep.equal([
            {
                name: 'It'
            },
            {
                name: 'Depends'
            }
        ]);
    });

    it('should be able to experiment with the same errors', (done) => {

        const marieCurie = new Scientist({
            reporter: {
                onResult: function (results) {

                    expect(results.control.duration).to.be.above(0);
                    expect(results.control.name).to.equal('Yes, yes it is');
                    expect(results.control.args).to.equal(null);
                    expect(results.control.value).to.equal(null);
                    expect(results.control.error).to.deep.equal(new Error('This is an error'));
                    expect(results.control.timeDifference).to.equal(null);
                    expect(results.control.differences).to.equal(null);
                    expect(results.control.errorDifferences).to.equal(null);
                    expect(results.candidates[0].duration).to.be.a.number();
                    expect(results.candidates[0].name).to.equal('It depends');
                    expect(results.candidates[0].args).to.equal(null);
                    expect(results.candidates[0].value).to.equal(null);
                    expect(results.candidates[0].error).to.deep.equal(new Error('This is an error'));
                    expect(results.candidates[0].timeDifference).to.be.a.number();
                    expect(results.candidates[0].timeDifference).to.equal(results.candidates[0].duration - results.control.duration);
                    expect(results.candidates[0].differences).to.equal(null);
                    expect(results.candidates[0].errorDifferences).to.equal(null);
                    done();
                }
            }
        });

        const radiationExperiment = marieCurie.createExperiment({
            name: 'Is Radiation Bad?'
        });
        radiationExperiment.use({
            name: 'Yes, yes it is',
            func: function () {

                throw new Error('This is an error');
            }
        });
        radiationExperiment.try({
            name: 'It depends',
            func: function () {

                throw new Error('This is an error');
            }
        });
        expect(() => {

            radiationExperiment.study();
        }).to.throw(Error, 'This is an error');
    });

    it('should be able to experiment with different error messages', (done) => {

        const marieCurie = new Scientist({
            reporter: {
                onResult: function (results) {

                    expect(results.control.duration).to.be.above(0);
                    expect(results.control.name).to.equal('Yes, yes it is');
                    expect(results.control.args).to.equal(null);
                    expect(results.control.value).to.equal(null);
                    expect(results.control.error).to.deep.equal(new Error('This is an error'));
                    expect(results.control.timeDifference).to.equal(null);
                    expect(results.control.differences).to.equal(null);
                    expect(results.control.errorDifferences).to.equal(null);
                    expect(results.candidates[0].duration).to.be.a.number();
                    expect(results.candidates[0].name).to.equal('It depends');
                    expect(results.candidates[0].args).to.equal(null);
                    expect(results.candidates[0].value).to.equal(null);
                    expect(results.candidates[0].error).to.deep.equal(new Error('This is a different error'));
                    expect(results.candidates[0].timeDifference).to.be.a.number();
                    expect(results.candidates[0].timeDifference).to.equal(results.candidates[0].duration - results.control.duration);
                    expect(results.candidates[0].differences).to.equal(null);
                    expect(results.candidates[0].errorDifferences).to.deep.equal([{
                        kind: 'E',
                        lhs: 'This is an error',
                        rhs: 'This is a different error',
                        path: [
                            'message'
                        ]
                    }]);
                    done();
                }
            }
        });

        const radiationExperiment = marieCurie.createExperiment({
            name: 'Is Radiation Bad?'
        });
        radiationExperiment.use({
            name: 'Yes, yes it is',
            func: function () {

                throw new Error('This is an error');
            }
        });
        radiationExperiment.try({
            name: 'It depends',
            func: function () {

                throw new Error('This is a different error');
            }
        });
        expect(() => {

            radiationExperiment.study();
        }).to.throw(Error, 'This is an error');
    });

    it('should be able to experiment with different errors', (done) => {

        const marieCurie = new Scientist({
            reporter: {
                onResult: function (results) {

                    const err = new Error('This is an error');
                    err.statusCode = 418;
                    expect(results.control.duration).to.be.above(0);
                    expect(results.control.name).to.equal('Yes, yes it is');
                    expect(results.control.args).to.equal(null);
                    expect(results.control.value).to.equal(null);
                    expect(results.control.error).to.deep.equal(err);
                    expect(results.control.timeDifference).to.equal(null);
                    expect(results.control.differences).to.equal(null);
                    expect(results.control.errorDifferences).to.equal(null);
                    expect(results.candidates[0].duration).to.be.a.number();
                    expect(results.candidates[0].name).to.equal('It depends');
                    expect(results.candidates[0].args).to.equal(null);
                    expect(results.candidates[0].value).to.equal(null);
                    expect(results.candidates[0].error).to.deep.equal(new Error('This is a different error'));
                    expect(results.candidates[0].timeDifference).to.be.a.number();
                    expect(results.candidates[0].timeDifference).to.equal(results.candidates[0].duration - results.control.duration);
                    expect(results.candidates[0].differences).to.equal(null);
                    expect(results.candidates[0].errorDifferences).to.deep.equal([{
                        kind: 'D',
                        path: [
                            'statusCode'
                        ],
                        lhs: 418
                    }, {
                        kind: 'E',
                        lhs: 'This is an error',
                        rhs: 'This is a different error',
                        path: [
                            'message'
                        ]
                    }], {
                        prototype: false
                    });
                    done();
                }
            }
        });

        const radiationExperiment = marieCurie.createExperiment({
            name: 'Is Radiation Bad?'
        });
        radiationExperiment.use({
            name: 'Yes, yes it is',
            func: function () {

                const err = new Error('This is an error');
                err.statusCode = 418;
                throw err;
            }
        });
        radiationExperiment.try({
            name: 'It depends',
            func: function () {

                throw new Error('This is a different error');
            }
        });
        expect(() => {

            radiationExperiment.study();
        }).to.throw(Error, 'This is an error');
    });
});
