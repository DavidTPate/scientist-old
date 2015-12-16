'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const Scientist = require('../lib/index');

describe('Module Use', () => {

    it('should be able to experiment with the default reporter', (done) => {

        const marieCurie = new Scientist();

        const radiationExperiment = marieCurie.createExperiment({
            name: 'Is Radiation Bad?'
        });
        radiationExperiment.use({
            name: 'Yes, yes it is',
            func: function () {

                for (let i = 0; i < 10000; ++i) {

                }
                return true;
            }
        });
        radiationExperiment.try({
            name: 'Not for Blinky',
            func: function () {

                return true;
            }
        });
        radiationExperiment.try({
            name: 'Not for Super Mutants',
            func: function () {

                for (let i = 0; i < 1000; ++i) {

                }
                return false;
            }
        });
        expect(radiationExperiment.study()).to.deep.equal(true);
        done();
    });

    it('should be able to create and use a scientist without the `new` keyword', (done) => {

        const marieCurie = Scientist({
            reporter: {
                onResult: () => {}
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
        done();
    });
});
