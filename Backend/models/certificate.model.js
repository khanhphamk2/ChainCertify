const mongoose = require('mongoose');

const certificateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    image: String,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;