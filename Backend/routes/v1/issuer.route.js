const multer = require('multer');
const express = require('express');
const issuerController = require('../../controllers/issuer.controller');

const upload = multer();
const router = express.Router();

router.route('/add').post(upload.none(), issuerController.addIssuer);
router.route('/revoke').put(upload.none(), issuerController.revokeIssuer);
router.route('/gets').get(issuerController.getIssuers);

module.exports = router;