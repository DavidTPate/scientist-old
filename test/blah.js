'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const before = lab.before;
const after = lab.after;
const expect = Code.expect;

describe('dumb tests', () => {

    it('should be nothing', (done) => {

        expect(require('../lib/index')).to.deep.equal({});
        done();
    });
});
