'use strict';

let objectUtils = require('./../utils/object_utils');
let securityUtils = require('./../utils/security_utils');
let paramsValidator = require('./../utils/param_validator');
let responseUtils = require('./../utils/response_utils');
let responseMessage = require('./../utils/messages');

let ObjectNotFoundError = require('./../utils/errors').ObjectNotFoundError;

let Snap = require( './../models/snap');

const TAG = 'snaps_controller';

/**
 * Specifies the mandatory fields that the POST /snaps request must have.
 */
const SNAP_EXPECTED_PARAMS = [
    'user',
    'pics',
    'location',
    'cause',
    'description',
    'device_details'
];

/**
 * Specifies the fields that are going to be excluded from
 * any response related to snaps.
 */
const SNAP_RESPONSE_UNDESIRED_KEYS = [];

/**
 * Creates a new snap.
 *
 * @param {object} request  The HTTP request object, which could
 *                          have query parameters.
 * @param {object} response The HTTP response object which will
 *                          reply to the request.
 * @param {funciton} next   Callback function to execute after responding
 *                          to the request.
 */
exports.createSnap = function(request, response, next) {
    const logger = request.log;

    let areValidParams = paramsValidator.validateParams(request.body,
            SNAP_EXPECTED_PARAMS);

    if (!areValidParams) {
        responseUtils.errorResponse(response,
                400, responseMessage.MISSED_PARAMS);

        return next();
    }

    let newSnap = new Snap({
        user: request.params.user,
        pics: request.params.pics,
        location: request.params.location,
        cause: request.params.cause,
        description: request.params.description,
        device_details: request.params.device_details
    });

    newSnap.save().then(savedSnap => {
        let responseObject = responseUtils.convertToResponseObject(
                savedSnap,
                SNAP_RESPONSE_UNDESIRED_KEYS);

        response.send(200, responseObject);
        return next();
    }).catch(error => {
        logger.error(`${TAG} createSnap:: ${error}` );
        responseUtils.errorResponseBaseOnErrorType(error, response);
        return next();
    });
}

/**
 * Gets the snaps from DB.
 *
 * @param {object} request  The HTTP request object, which could
 *                          have query parameters.
 * @param {object} response The HTTP response object which will
 *                          reply to the request.
 * @param {funciton} next   Callback function to execute after responding
 *                          to the request.
 */
exports.getSnaps = function(request, response, next) {
    const logger = request.log;

    let snapsQuery = {
        user: request.params.user_id
    }

    Snap.find(snapsQuery).exec().then(snaps => {
        let responseObject = responseUtils.convertToResponseObjects(
                snaps,
                SNAP_RESPONSE_UNDESIRED_KEYS,
                request);

        response.send(200, responseObject);
        return next();
    }).catch(error => {
        logger.error(`${TAG} createSnap:: ${error}` );
        responseUtils.errorResponseBaseOnErrorType(error, response);
        return next();
    });
}
