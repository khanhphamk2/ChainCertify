const { Web3 } = require('web3');
// Path: Backend\services\issuer.service.js
// Compare this snippet from Backend\controllers\index.js:

async function addIssuer(req, res, next) {
    try {
        const issuer = await issuerService.addIssuer(req.body);
        res.json(issuer);
    } catch (error) {
        next(error);
    }
}

async function getIssuers(req, res, next) {
    try {
        const issuers = await issuerService.getIssuers();
        res.json(issuers);
    } catch (error) {
        next(error);
    }
}
