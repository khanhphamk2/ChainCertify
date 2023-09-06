const multer = require('multer');
const express = require('express');
const certificateController = require('../../controllers/certificate.controller');

const upload = multer();
const router = express.Router();

router.route('/issue').post(upload.none(), certificateController.createCertificate);
router.route('/get').get(certificateController.getCertificate);
router.route('/verify').get(certificateController.verifyCertificate);
router.route('/revoke').put(upload.none(), certificateController.revokeCertificate);

module.exports = router;
