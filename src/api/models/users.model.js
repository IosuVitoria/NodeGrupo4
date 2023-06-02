const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema (
    {
        userName: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, default: 'user', enum: ['admin', 'user', 'moderator']}

    }, {
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema);

module.exports = User;
