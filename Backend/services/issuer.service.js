const { Web3 } = require('web3');
const { httpStatus } = require('http-status');
const config = require('../config/config');

const web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));

const issuerABI = require('../utils/abi/issuer.json');

const issuerContractAddress = config.issuerAddress;

const issuerContract = new web3.eth.Contract(issuerABI, issuerContractAddress);

const addIssuer = async (owner, newIssuer) => {
    try {
        const gas = await issuerContract.methods.addIssuer(newIssuer).estimateGas();
        const result = await issuerContract.methods.addIssuer(newIssuer).send({ from: owner, gas });
        console.log(result);
        return result;
    } catch (error) {
        return httpStatus.INTERNAL_SERVER_ERROR;
    }
};

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