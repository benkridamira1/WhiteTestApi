const mongoose = require('mongoose');
const Joi = require('joi');

let certification_schema = new mongoose.Schema({
    name : String,
    whitetests : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref  : ' WhiteTest'
        }
    ]
});

let validation_certification = Joi.object({
    name : Joi.string().min(3).required()
});

let validation_update_certification = Joi.object({
    name : Joi.string().min(3).required()
});

let Certification = mongoose.model('Certification',certification_schema);

module.exports.Certification = Certification;
module.exports.validation_certification = validation_certification;
module.exports.validation_update_certification = validation_update_certification;