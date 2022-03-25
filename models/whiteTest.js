const mongoose=require('mongoose');
const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi)


let whitetestSchema=new  mongoose.Schema({

    title:{ type : String,
            required : true,
        unique : true,
        minlength: 5
        },
 
    date :{
            type :Date,
            required : true },   
    certification:{
        name: {type : String,
                required : true},
        id: {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Certification'
        }
    },
                 
   

});


let whitetest_validation=Joi.object({

    title: Joi.string().min(5).max(50).alphanum().required(),
    certification: Joi.objectId().required(),
    
})




let whitetest_validation_update=Joi.object({

    title: Joi.string().min(5).max(50).alphanum(),
    certification: Joi.objectId().required(),
   
})



let object_id_validation=Joi.object({

   id:Joi.objectId().required()
});


let WhiteTest=mongoose.model('WhiteTest',whitetestSchema);
module.exports.WhiteTest=WhiteTest;
module.exports.whitetest_validation=whitetest_validation;
module.exports.whitetest_validation_update=whitetest_validation_update
module.exports.object_id_validation=object_id_validation