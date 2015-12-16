'use strict';
//const Scientist = require('../lib/index');
//
//let forLoopsExperiment = new Scientist.Experiment({
//    name: 'Different For Loops, With and Without Closure'
//});
//let items = ['one', 'two', 'three', 'four', 'five'];
//
//for (let x = 0; x <= 10; x++) {
//    items = items.concat(items);
//}
//
//function noop() {
//}
//
//forLoopsExperiment.use({
//    name: 'For loop, basic',
//    func: function () {
//        for (let i = 0; i < items.length; i++) {
//            noop(items[i]);
//        }
//    }
//});
//
//forLoopsExperiment.try({
//    name: 'While loop, basic',
//    func: function () {
//        let i = 0;
//        while (i < items.length) {
//            noop(i);
//            i++;
//        }
//    }
//});
//
//forLoopsExperiment.try({
//    name: 'For loop, cached',
//    func: function () {
//        for (var i = 0, len = items.length; i < len; i++) {
//            noop(items[i]);
//        }
//    }
//});
//
//forLoopsExperiment.try({
//    name: 'For loop, i--',
//    func: function () {
//        for (let i = items.length; i > 0; i--) {
//            noop(i);
//        }
//    }
//});
//
//forLoopsExperiment.try({
//    name: 'Do-while loop, i--',
//    func: function () {
//        let i = items.length - 1;
//        do {
//            noop(i);
//        }
//        while (i--);
//    }
//});
//
//forLoopsExperiment.try({
//    name: 'Do-while loop, --i',
//    func: function () {
//        let i = items.length;
//        if (i > 0) {
//            do {
//                noop(i);
//            }
//            while (--i);
//        }
//    }
//});
//
//forLoopsExperiment.try({
//    name: 'For..in loop',
//    func: function () {
//        for (let i in items) {
//            noop(i);
//        }
//    }
//});
//
//forLoopsExperiment.try({
//    name: 'forEach loop',
//    func: function () {
//        items.forEach(function (item) {
//            noop(item);
//        });
//    }
//});
//
//forLoopsExperiment.study();
//
