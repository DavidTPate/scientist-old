'use strict';

const deepEql = require('deep-eql');
const diff = require('deep-diff');

const Observation = function (name, func, options) {

    if (!name) {
        throw new Error('name is required');
    }

    if (!func) {
        throw new Error('func is required');
    }

    // Make sure we were called with `new`, if not make it happen for us.
    if (!(Observation.is(this))) {
        return new Observation(name, func);
    }

    this.options = options || {}; // The options for the observation
    this.begin = null; // When the observation was started (an array tuple of `[seconds, nanoseconds]`
    this.duration = null; // How long it took the observation to complete (in nanoseconds)
    this.name = name; // The name of the observation
    this.func = func; // The function to observe
    this.args = null; // The arguments used to call the functions
    this.value = null; // The value returned, if any. If it is a promise, the resolved value of the promise
    this.error = null; // The raised error, if any. If it is a promise, the resolved reason why the promise was rejected
    this.timeDifference = null; // The difference in execution time as compared to the control (in nanoseconds). Negative is good here.
    this.differences = null; // The differences, if any as compared to the control
    this.errorDifferences = null; // The differences in the errors, if any as compared to the control
};

Observation.prototype.run = function () {
    let timeDiff;
    try {
        this.begin = process.hrtime();
        this.value = this.func.call(this, arguments);
        timeDiff = process.hrtime(this.begin);
    } catch (err) {
        timeDiff = process.hrtime(this.begin);
        this.error = err;
    }
    this.duration = timeDiff[0] * 1e9 + timeDiff[1];

    if (this.options.isControl) {
        if (this.error) {
            throw this.error;
        }
        return this.value;
    }
};

Observation.prototype.compareToControl = function (leftHand) {

    return Observation.compare(leftHand, this);
};

Observation.compare = (leftHand, rightHand) => {

    if (!Observation.is(leftHand)) {
        throw new Error('Left Hand Side must be an Observation');
    } else if (!Observation.is(rightHand)) {
        throw new Error('Right Hand Side must be an Observation');
    }

    rightHand.timeDifference = rightHand.duration - leftHand.duration;

    if (!deepEql(leftHand.value, rightHand.value)) {
        rightHand.differences = diff(leftHand.value, rightHand.value);
    }

    if (!deepEql(leftHand.error, rightHand.error)) {
        rightHand.errorDifferences = diff(leftHand.error, rightHand.error);
    }

    //TODO: Not sure if this is actually needed nor if this is the right place for it. It's handling default JS errors through the messages right now.
    // We don't handle stacks, because they will obviously be different.
    if (leftHand.error && !leftHand.error.propertyIsEnumerable('message')) {
        if (leftHand.error.message !== rightHand.error.message) {
            rightHand.errorDifferences = rightHand.errorDifferences || [];
            rightHand.errorDifferences.push({
                kind: 'E',
                lhs: leftHand.error.message,
                rhs: rightHand.error.message,
                path: 'message'
            });
        }
    }
};

Observation.is = (object) => {

    return object instanceof Observation;
};

module.exports = Observation;
