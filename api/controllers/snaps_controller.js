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
    'description'
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
        ph_os_version: request.params.ph_os_version,
        ph_brand: request.params.ph_brand,
        ph_manufacturer: request.params.ph_manufacturer,
        ph_model: request.params.ph_model,
        ph_serial: request.params.ph_serial,
        ph_device: request.params.ph_device
    });

    newSnap.save().then(savedSnap => {
        response.send(200, savedSnap);
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
        response.send(200, snaps);
        return next();
    }).catch(error => {
        logger.error(`${TAG} createSnap:: ${error}` );
        responseUtils.errorResponseBaseOnErrorType(error, response);
        return next();
    });
}
