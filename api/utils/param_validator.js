'use strict';

let objectUtilities = require('./object_utils');

const FILTER = 'filter';
const SORT = 'sort';
const PAGE_NUMBER = 'page';
const PAGE_SIZE = 'limit';
const FIELD = 'fields';

const EXPECTED_QUERY_PARAMS = [
    FILTER,
    SORT,
    PAGE_NUMBER,
    PAGE_SIZE,
    FIELD
];

const DEFAULT_PAGE_SIZE = 20;

/**
 * Provides methods to validate the parameters in requests.
 */
module.exports = {
    FILTER_QUERY_STRING: FILTER,
    SORT_QUERY_STRING: SORT,
    PAGE_NUMBER_QUERY_STRING: PAGE_NUMBER,
    PAGE_SIZE_QUERY_STRING: PAGE_SIZE,
    FIELD_QUERY_STRING: FIELD,

    /**
     * Validates if the keys of a JSON object are expected.
     * First, it validates the sizes of 'params' and expectedParams; if
     * the size of 'params' is less than the size of expectedParams,
     * false is returned.
     *
     * params = { name: 'Jovanny', phone: '5512345678' }
     * expectedParams = ['name', 'phone']
     *
     * @param {object} params JSON object to be analyzed.
     * @param {array} expectedParams Set of 'keys' that are expected
     *                               to be in the JSON object 'params'.
     */
    validateParams: function(params, expectedParams) {
        if (objectUtilities.sizeOf(params) <
            objectUtilities.sizeOf(expectedParams)) {
            return false;
        }

        for (let expectedParam of expectedParams) {
            if (!(expectedParam in params)) {
                return false;
            }
        }

        return true;
    },

    /**
     * Validates if the params.query of a request has the expected parameters
     * sent as parameter in this function.
     *
     * request.query is a JSON object which contains keys.
     * These keys are compared with the ones in expectedParams.
     *
     * @param {object} params JSON object which represents request.query.
     */
    validateQueryParams: function(params) {
        for (let param in params) {
            if (!objectUtilities.inArray(param, EXPECTED_QUERY_PARAMS)) {
                return false;
            }
        }

        return true;
    },

    /**
     * Checks if the 'queryValues' are valid based on the 'expectedValues'.
     *
     * @param {array} queryValues Values to check.
     * @param {array} expectedValues The expected values 'queryValues' to have.
     */
    validateQueryParamValues: function(queryValues, expectedValues) {
        for (let value of queryValues) {
            if (!objectUtilities.inArray(value, expectedValues)) {
                return false;
            }
        }

        return true;
    }
}
