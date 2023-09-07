const { Web3 } = require('web3');
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
        console.log(error);
    }
};

const revokeIssuer = async (owner, issuer) => {
    try {
        const gas = await issuerContract.methods.revokeIssuer(issuer).estimateGas();
        const result = await issuerContract.methods.revokeIssuer(issuer).send({ from: owner, gas });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

const getIssuers = async (owner) => {
    try {
        const result = await issuerContract.methods.getIssuers().call({ from: owner });
        console.log(result);
        return result;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    addIssuer,
    revokeIssuer,
    getIssuers,
};