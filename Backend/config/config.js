const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../.env') });

const envVarsSchema = Joi.object()
    .keys({
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required().description('Mongo DB url'),
        NETWORK: Joi.string().required().description('Network URL'),
        CERTIFICATE: Joi.string().required().description('Certificate contract address'),
        ISSUER: Joi.string().required().description('Issuer contract address'),
        HOLDER: Joi.string().required().description('Holder contract address'),
        VERIFICATION: Joi.string().required().description('Verification contract address'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    web3Provider: envVars.NETWORK,
    issuerAddress: envVars.ISSUER,
    certificateAddress: envVars.CERTIFICATE,
    verificationAddress: envVars.VERIFICATION,
    holderAddress: envVars.HOLDER,
};