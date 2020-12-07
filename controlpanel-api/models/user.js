const mongoose = require('mongoose');
const joi = require('@hapi/joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const userJoiSchema = joi.object({
    name: joi.string().min(6),
    email: joi.string().min(6).max(255).email(),
    password: joi.string().min(6).max(255)
});

const loginJoiSchema = joi.object({
    email: joi.string().min(6).max(255).email(),
    password: joi.string().min(6).max(255)
});

module.exports.user = mongoose.model('user', userSchema);
module.exports.userValidate = (body) => {
    return userJoiSchema.validate(body);
}

module.exports.loginValidate = (body) => {
    return loginJoiSchema.validate(body);
}