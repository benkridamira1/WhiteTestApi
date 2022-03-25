const router = require('express').Router();
const {Certification, validation_certification,validation_update_certification} = require('../models/certification');

const auth=require('../middlewares/auth')


const autoris=require('../middlewares/autoris')

// add certification to DB 
router.post('',[auth,autoris],async (req,res)=>{
    try {
        let results= validation_certification.validate(req.body);
        if(results.error)
            return res.status(400).send(results.error.details[0].message);
        let certification = new Certification(req.body);
        certification = await certification.save();
        res.send(certification);
    } catch (error) {
        res.status(400).send('Error saving Certification :'+error.message);
    }
    
});

// get All certifications 
router.get('',auth,async (req,res)=>{
    try {
        let certifications = await Certification.find();
        res.send(certifications)
    } catch (error) {
        res.status(400).send('Error  :'+error.message);
    }
    
});

//update a certification by its id 
router.put('/:id',[auth,autoris],async (req,res)=>{
    try {
        let results= validation_update_certification.validate(req.body);
        if(results.error)
            return res.status(400).send(results.error.details[0].message);
        
        await Certification.updateOne({_id : req.params.id}, req.body);
        res.send(await Certification.findById(req.params.id));
    } catch (error) {
        res.status(400).send('Error updating certification :'+error.message);
    }
    
});

// delete a certification by its id

router.delete('/:id',[auth,autoris],async (req,res)=>{
    try {
        let certification = await Certification.findByIdAndRemove(req.params.id);
        if(!certification)
            return res.status(404).send('Certification with id is not found');
        res.send(certification);
    } catch (error) {
        res.status(400).send('Error Deleting Certification :'+error.message);
    }
    
});

module.exports=router;