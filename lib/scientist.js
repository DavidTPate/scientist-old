'use strict';
const Joi = require('joi');
const extend = require('extend');

const Experiment = require('./experiment');
const consoleReporter = require('./consoleReporter');
const optionsSchema = Joi.object().keys({
    reporter: Joi.object().default(consoleReporter).optional()
});
const Scientist = function (optionsArgs) {

    const options = Joi.attempt(optionsArgs, optionsSchema);

    // Make sure we were called with `new`, if not make it happen for us.
    if (!(Scientist.is(this))) {
        return new Scientist(options);
    }
    this.options = options;
    this.experiments = new Map();
};

Scientist.prototype.createExperiment = function createExperiment(options) {
    this.experiments.set(options, new Experiment(extend(true, {}, this.options, options)));
    return this.experiments.get(options);
};

Scientist.is = function (object) {

    return object instanceof Scientist;
};

module.exports = Scientist;