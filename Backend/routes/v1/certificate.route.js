const multer = require('multer');
const express = require('express');
const certificateController = require('../../controllers/certificate.controller');

const upload = multer();
const router = express.Router();

router.route('/').post(upload.none(), certificateController.createCertificate);
// router.route('/').get(certificateController.getCertificates);
// router.route('/:id').get(certificateController.getCertificateById);
// router.route('/:id').put(upload.none(), certificateController.revokeCertificate);

module.exports = router;
