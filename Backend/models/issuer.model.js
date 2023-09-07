const mongoose = require('mongoose');

const issuerSchema = mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true,
    },
    revoked: {
        type: Boolean,
        default: false,
    },
});

const Issuer = mongoose.model('Issuer', issuerSchema);

module.exports = Issuer;
