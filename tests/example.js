'use strict';

let test = require('tape');

test('timing test', function (t) {
    t.plan(1);

    t.equal(typeof Date.now, 'function');
    let start = Date.now();
});
