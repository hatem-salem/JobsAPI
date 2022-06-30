const NotFoundError = require('./404');
const UnauthenticatedError = require('./unauthenticated');
const BadRequestError = require('./bad-request');
const CustomAPIError = require('./custom-api');

module.exports = {
    NotFoundError,
    UnauthenticatedError,
    BadRequestError,
    CustomAPIError
}