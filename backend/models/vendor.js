const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contactEmail: String,
    contactPhone: String,
    address: String,
});

module.exports = mongoose.model('Vendor', vendorSchema);
