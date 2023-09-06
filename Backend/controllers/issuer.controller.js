const { Web3 } = require('web3');

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { issuerService } = require('../services');

const web3 = new Web3(window.ethereum);

const addIssuer = catchAsync(async (req, res) => {
    if (window.ethereum) {
        const issuer = await issuerService.createIssuer(req.body.address);
        res.status(httpStatus.CREATED).send(issuer);
    } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Vui lòng kết nối MetaMask để sử dụng ứng dụng này.');
    }
});

const revokeIssuer = catchAsync(async (req, res) => {
    if (window.ethereum) {
        const issuer = await issuerService.revokeIssuer(req.body.address);
        res.status(httpStatus.CREATED).send(issuer);
    } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Vui lòng kết nối MetaMask để sử dụng ứng dụng này.');
    }
});

const getIssuers = catchAsync(async (req, res) => {
    const issuers = await issuerService.getIssuers();
    res.status(httpStatus.OK).send(issuers);
});

module.exports = {
    addIssuer,
    revokeIssuer,
    getIssuers,
};