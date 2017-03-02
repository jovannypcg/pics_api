'use strict';

let test = require('tape');
let securityUtils = require('./../../../api/utils/security_utils');

let secret = 'secret_for_testing';

/* =========================================
 * Tests begin
 * =======================================*/

test('getCredential should return hash correctly', function (t) {
    t.plan(1);

    let expectedCredential = '1299973c4f0f45a762eddabc42b7a41991261f57';

    t.equal(securityUtils.getCredential(secret),
            expectedCredential,
            'Returned credential is correct');
});
