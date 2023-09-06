const { Web3 } = require('web3');
const config = require('../config/config');

const web3 = new Web3(new Web3.providers.HttpProvider(config.web3Provider));

const certificatesABI = require('../utils/abi/certificates.json');

const certificateContractAddress = config.certificateAddress;

const certificateContract = new web3.eth.Contract(certificatesABI, certificateContractAddress);

async function getCertificateCount(holderAddress) {
    try {
        const count = await certificateContract.methods.getCertificateCount(holderAddress).call();
        console.log(`Số chứng chỉ của địa chỉ ${holderAddress}: ${count}`);
    } catch (error) {
        console.error('Lỗi khi gọi hàm getCertificateCount:', error);
    }
}

const issueCertificate = async (issuerAddress, certificateBody) => {
    try {
        const gas = await certificateContract.methods.issueCertificate(certificateBody).estimateGas();
        const receipt = await certificateContract.methods.issueCertificate(certificateBody).send({
            from: issuerAddress,
            gas: gas,
        });
        console.log('Giao dịch createCertificate đã được gửi. Hash giao dịch:', receipt.transactionHash);
        return receipt.transactionHash;
    } catch (error) {
        console.error('Lỗi khi gọi hàm createCertificate:', error);
    }
}

const revokeCertificate = async (issuerAddress, certificateBody) => {
    try {
        const gas = await certificateContract.methods.revokeCertificate(certificateBody).estimateGas();
        const receipt = await certificateContract.methods.revokeCertificate(certificateBody).send({
            from: issuerAddress,
            gas: gas,
        });
        console.log('Giao dịch revokeCertificate đã được gửi. Hash giao dịch:', receipt.transactionHash);
        return receipt.transactionHash;
    } catch (error) {
        console.error('Lỗi khi gọi hàm revokeCertificate:', error);
    }
}

const verifyCertificate = async (holderAddress, certificateHash) => {
    try {
        const result = await certificateContract.methods.verifyCertificate(holderAddress, certificateHash).call();
        console.log('Kết quả xác thực chứng chỉ:', result);
        return result;
    } catch (error) {
        console.error('Lỗi khi gọi hàm verifyCertificate:', error);
    }
}

module.exports = {
    issueCertificate,
    getCertificateCount,
    revokeCertificate,
    verifyCertificate,
}
