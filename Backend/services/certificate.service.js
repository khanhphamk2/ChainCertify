const { Web3 } = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

const certificatesABI = require('../utils/abi/certificates.json');

const certificateContractAddress = '0x3aa2941b80b6d5ab641573FD10e9E731057965A7';

const certificateContract = new web3.eth.Contract(certificatesABI, certificateContractAddress);

async function getCertificateCount(holderAddress) {
    try {
        const count = await certificateContract.methods.getCertificateCount(holderAddress).call();
        console.log(`Số chứng chỉ của địa chỉ ${holderAddress}: ${count}`);
    } catch (error) {
        console.error('Lỗi khi gọi hàm getCertificateCount:', error);
    }
}

async function issueCertificate(holderAddress, information) {
    try {
        const receipt = await certificateContract.methods.issueCertificate(holderAddress, information).send({ from: 'YOUR_SENDER_ADDRESS' });
        console.log('Giao dịch issueCertificate đã được gửi. Hash giao dịch:', receipt.transactionHash);
    } catch (error) {
        console.error('Lỗi khi gọi hàm issueCertificate:', error);
    }
}

async function createCertificate(holderAddress, information) {
    try {

    } catch (error) {
        console.error('Lỗi khi gọi hàm createCertificate:', error);
    }
}

module.exports = {
    issueCertificate,
    getCertificateCount,
    createCertificate
}
