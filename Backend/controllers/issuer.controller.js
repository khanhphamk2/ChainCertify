const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { issuerService } = require('../services');

const createIssuer = catchAsync(async (req, res) => {
    const issuer = await issuerService.createIssuer(req.body);
    res.status(httpStatus.CREATED).send(issuer);
});