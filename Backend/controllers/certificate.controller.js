const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { certificateService } = require('../services');

const createCertificate = catchAsync(async (req, res) => {
    const certificate = await certificateService.createCertificate(req.body);
    res.status(httpStatus.CREATED).send(certificate);
});

const getCertificates = catchAsync(async (req, res) => {

});