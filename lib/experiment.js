'use strict';

const Joi = require('joi');
const Observation = require('./observation');

const optionsSchema = Joi.object().keys({
    name: Joi.string().required(),
    reporter: Joi.object().keys({
        onResult: Joi.func().required()
    }).unknown(true).required()
});

const trialsSchema = Joi.object().keys({
    name: Joi.string().required(),
    func: Joi.func().required()
});

const Experiment = function (optionsArgs) {

    const options = Joi.attempt(optionsArgs, optionsSchema);

    // Make sure we were called with `new`, if not make it happen for us.
    if (!(Experiment.is(this))) {
        return new Experiment(options);
    }

    this.options = options;
    this.control = null;
    this.candidates = [];
};

Experiment.prototype.study = function () {

    const results = {
        control: new Observation(this.control.name, this.control.func, {
            isControl: true
        }),
        candidates: []
    };

    setTimeout(() => {

        for (let i = 0; i < this.candidates.length; i++) {
            results.candidates.push(new Observation(this.candidates[i].name, this.candidates[i].func));
            results.candidates[i].run(arguments);
        }
        for (let i = 0; i < results.candidates.length; i++) {
            results.candidates[i].compareToControl(results.control);
        }
        this.options.reporter.onResult(results);
    });

    return results.control.run(arguments);
};

Experiment.prototype.use = function (control) {

    this.control = Joi.attempt(control, trialsSchema);
};

Experiment.prototype.try = function (candidate) {

    this.candidates.push(Joi.attempt(candidate, trialsSchema));
};

Experiment.is = function (object) {

    return object instanceof Experiment;
};

module.exports = Experiment;
