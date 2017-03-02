'use strict';

let User = require('./../models/user');
let responseMessage = require('./../utils/messages');
let securityUtils = require('./../utils/security_utils');
let responseUtils = require('./../utils/response_utils');
let paramsValidator = require('./../utils/param_validator');
let UnauthorizedError = require('./../utils/errors').UnauthorizedError;

const TAG = 'auth_controller';
const LOG_LEVEL = 'debug';

const LOGIN_EXPECTED_PARAMS = [
    'email',
    'password'
]

/**
 * Receives email and password of a user.
 * Verifies that the email exists and the password matches with
 * the stored user in db. If everything is OK, a JSON Web Token
 * is sent in the HTTP response.
 *
 * @param {object} request  The HTTP request object. Should include
 *                          email and password.
 * @param {object} response The HTTP response object which will
 *                          reply to the request.
 * @param {funciton} next   Callback function to execute after responding
 *                          to the request.
 */
exports.login = function(request, response, next) {
    const logger = request.log;

    let payload;
    let token;
    let credential;

    let email = request.params.email;
    let password = request.params.password;

    let query = {
        email: email
    };

    let areValidParams = paramsValidator.validateParams(request.params,
            LOGIN_EXPECTED_PARAMS);

    if (!areValidParams) {
        responseUtils.errorResponse(response,
                400, responseMessage.MISSED_PARAMS);

        return next();
    }

    User.findOne(query).exec().then(foundUser => {
        if (!foundUser || foundUser.password != password) {
            responseUtils.errorResponse(response,
                    401, responseMessage.PROVIDED_INFO_DOES_NOT_MATCH);

            return next();
        }

        payload = {
            email: foundUser.email,
            first_name: foundUser.first_name,
            id: foundUser.id
        };

        credential = securityUtils.getCredential();
        token = securityUtils.getToken(payload, credential);

        response.send(200, {
            data: {
                token: token
            }
        });

        return next();
    }).catch(error => {
        logger.error( `${TAG} login :: ${error}` );
        responseUtils.errorResponseBaseOnErrorType(error, response);
        return next();
    });
}

exports.authenticate = function(request, response, next) {
    const logger = request.log;

    let token = request.headers.authorization;
    let credential = securityUtils.getCredential();
    let verifiedToken;
    let userQuery;

    if (!token) {
        responseUtils.errorResponse(response,
                401, responseMessage.UNAUTHORIZED);

        return;
    }

    try {
        verifiedToken = securityUtils.verifyToken(token, credential);

        if (!verifiedToken) {
            throw new UnauthorizedError();
        }

        return next();
    } catch (error) {
        logger.error( `${TAG} authenticate :: ${error}` );
        responseUtils.errorResponseBaseOnErrorType(error, response);
        return next();
    }
}
