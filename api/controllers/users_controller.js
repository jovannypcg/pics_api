'use strict';

let objectUtils = require('./../utils/object_utils');
let securityUtils = require('./../utils/security_utils');
let paramsValidator = require('./../utils/param_validator');
let responseUtils = require('./../utils/response_utils');
let responseMessage = require('./../utils/messages');

let UserAlreadyRegisteredError = require('./../utils/errors').UserAlreadyRegisteredError;
let ObjectNotFoundError = require('./../utils/errors').ObjectNotFoundError;

let User = require( './../models/user');

const TAG = 'users_controller';

/**
 * Specifies the mandatory fields that the POST /users request must have.
 */
const USER_EXPECTED_PARAMS = [
    'first_name',
    'email',
    'password'
];

/**
 * Specifies the fields that are going to be excluded from
 * any response related to users.
 */
const USER_RESPONSE_UNDESIRED_KEYS = [
    'password'
];

/**
 * Creates a new user.
 *
 * @param {object} request  The HTTP request object, which could
 *                          have query parameters.
 * @param {object} response The HTTP response object which will
 *                          reply to the request.
 * @param {funciton} next   Callback function to execute after responding
 *                          to the request.
 */
exports.createUser = function(request, response, next) {
    const logger = request.log;

    let userQuery = { email: request.params.email };

    let areValidParams = paramsValidator.validateParams(request.body,
            USER_EXPECTED_PARAMS);

    if (!areValidParams) {
        responseUtils.errorResponse(response,
                400, responseMessage.MISSED_PARAMS);

        return next();
    }

    let newUser = new User({
        first_name: request.params.first_name,
        email     : request.params.email,
        password  : request.params.password
    });

    User.findOne(userQuery).exec().then(existingUser => {
        if (existingUser) {
            throw new UserAlreadyRegisteredError();
        }

        return newUser.save();
    }).then(savedUser => {
        response.send(200, savedUser);
        return next();
    }).catch(error => {
        logger.error(`${TAG} createUser:: ${error}` );
        responseUtils.errorResponseBaseOnErrorType(error, response);
        return next();
    });
}
