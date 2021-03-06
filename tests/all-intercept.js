/*jslint strict: false, evil: true */
/*global Packages: false, process: false, require: true, define: true, doh: false */

//A hack to doh to avoid dojo setup stuff in doh/runner.js
var skipDohSetup = true,
    fs, vm, load, env;

require('../intercept');

(function () {
    if (typeof Packages !== 'undefined') {
        env = 'rhino';
    } else if (typeof process !== 'undefined') {
        env = 'node';

        fs = require('fs');
        vm = require('vm');

        load = function (path) {
            return vm.runInThisContext(fs.readFileSync(path, 'utf8'), path);
        };
    }

}());

//Load the tests.
load("doh/runner.js");
load('doh/_' + env + 'Runner.js');

require("./basic-intercept/basic-tests");

//Print out the final report
doh.run();
