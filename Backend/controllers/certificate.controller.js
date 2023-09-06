const { Web3 } = require('web3');

const web3 = new Web3(window.ethereum);

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { certificateService } = require('../services');

const createCertificate = catchAsync(async (req, res) => {
    if (window.ethereum) {
        const address = web3.eth.getAccounts()[0];

        const certificate = await certificateService.issueCertificate(address, req.body);

        res.status(httpStatus.CREATED).send(certificate);
    } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Vui lòng kết nối MetaMask để sử dụng ứng dụng này.');
        console.error('Vui lòng kết nối MetaMask để sử dụng ứng dụng này.');
    }
});

const revokeCertificate = catchAsync(async (req, res) => {
    if (window.ethereum) {
        const address = web3.eth.getAccounts()[0];

        const revoke = await certificateService.revokeCertificate(address, req.body);

        res.status(httpStatus.CREATED).send(revoke);
    } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Vui lòng kết nối MetaMask để sử dụng ứng dụng này.');

        console.error('Vui lòng kết nối MetaMask để sử dụng ứng dụng này.');
    }
});

const verifyCertificate = catchAsync(async (req, res) => {
    try {
        const certificate = await certificateService.verifyCertificate(req.body.holderAddress, req.body.certificateHash);

        res.status(httpStatus.OK).send(certificate);
    } catch (error) {
        console.error('Lỗi khi gọi hàm verifyCertificate:', error);
    }

});

const getCertificate = catchAsync(async (req, res) => {
    try {
        const certificate = await certificateService.getCertificate(req.body.holderAddress, req.body.certificateHash);
        return certificate;
    } catch (error) {
        console.error('Lỗi khi gọi hàm getCertificate:', error);
    }
});

module.exports = {
    createCertificate,
    revokeCertificate,
    verifyCertificate,
    getCertificate,
}