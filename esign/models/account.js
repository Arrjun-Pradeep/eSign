var mongoose = require('mongoose');

module.exports = mongoose.model('accounts', {
    email: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    password: String,
    address: String
})