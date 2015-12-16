'use strict';
const colors = {
    'pass': 90
    , 'fail': 31
    , 'pending': 36
    , 'suite': 0
    , 'fast': 90
    , 'medium': 33
    , 'slow': 31
    , 'green': 32
};
const color = (type, str) => {

    return '\u001b[' + colors[type] + 'm' + str + '\u001b[0m';
};

const onResult = (results) => {

    results.candidates.sort((lhs, rhs) => {

        if (lhs.timeDifference < rhs.timeDifference) {
            return -1;
        }
        else if (lhs.timeDifference > rhs.timeDifference) {
            return 1;
        }
        return 0;
    });
    console.log(results.control.name + ' ' + results.control.duration + 'ns');
    for (let i = 0; i < results.candidates.length; ++i) {
        let textColor = 'pending';
        if (results.candidates[i].timeDifference >= 0) {
            textColor = 'medium';
            if (results.candidates[i].timeDifference >= 100000) {
                textColor = 'fail';
            }
        }
        else if (results.candidates[i].timeDifference <= 0) {
            textColor = 'green';
        }
        console.log(results.candidates[i].name + ' ' + results.candidates[i].duration + 'ns (' + color(textColor, results.candidates[i].timeDifference + 'ns)'));
    }
};

module.exports = {
    onResult: onResult
};
