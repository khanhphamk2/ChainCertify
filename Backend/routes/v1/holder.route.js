const multer = require('multer');
const express = require('express');
const holderController = require('../../controllers/holder.controller');

const upload = multer();
const router = express.Router();

// router.route('/add').post(upload.none(), holderController.addHolder);
// router.route('/revoke').put(upload.none(), holderController.revokeHolder);
// router.route('/gets').get(holderController.getHolders);

module.exports = router;

