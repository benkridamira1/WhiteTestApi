const router=require('express').Router();
const { Certification } = require('../models/certification');
const {WhiteTest} =require('../models/whiteTest')
const {whitetest_validation,whitetest_validation_update,object_id_validation} =require('../models/whiteTest')
const auth=require('../middlewares/auth')
const autoris=require('../middlewares/autoris')

//get all documents from whitetests
router.get('',async(req,res)=>{

     let whitetests=await WhiteTest.find().populate('certification.id');
    res.send(whitetests);
})


//add a new whitetest to db 

router.post('',[auth,autoris],async(req,res)=>{

    let result_valid= whitetest_validation.validate(req.body);
    if(result_valid.error)
        return res.status(400).send(result_valid.error.details[0].message)

    let certification  = await Certification.findById(req.body.certification);

    if(!certification)
        return res.status(400).send('certification id is not found')
    
   

    let whiteTest= new WhiteTest(req.body);
    whiteTest.certification.name=certification.name;
    whiteTest.certification.id=certification._id;
    try {
        whiteTest=await whiteTest.save();

        certification.whitetests.push(whiteTest._id);
        await certification.save();
        res.send(whiteTest);
    } catch (error) {
        res.status(400).send(error.message);
    }
  
})

//get all doculments from whitetest using title

    router.get('/title/:t',auth, async(req,res)=>{

        let whiteTests=await WhiteTest.find({title: req.params.t})
        res.send(whiteTests);
    });

    //get all documents titles starts  with

    router.get('/title/start/:prefixe', async(req,res)=>{

        let whiteTests=await WhiteTest.find({title: new RegExp('^'+req.params.prefixe,'i')})
                             
        res.send(whiteTests);
    });
      

//update

router.put('/:id',[auth,autoris], async (req,res)=>{

    // updateOne:  find by id and update 
    let result_valid= whitetest_validation_update.validate(req.body);
    if(result_valid.error)
        return res.status(400).send(result_valid.error.details[0].message)
      
    let id_result_valid= object_id_validation.validate(req.params);
        if(id_result_valid.error)
            return res.status(400).send(id_result_valid.error.details[0].message)

    try {
        await WhiteTest.updateOne({ _id : req.params.id},req.body);
    res.send(await WhiteTest.findById(req.params.id));
    } catch (error) {
        res.status(400).send('Problem in updating  WhiteTest')
            }
    
});



// delete
router.delete('/:id',[auth,autoris],async (req,res)=>{

       
    let id_result_valid= object_id_validation.validate(req.params);
        if(id_result_valid.error)
            return res.status(400).send(id_result_valid.error.details[0].message)

    try {
        let whiteTest =  await WhiteTest.findByIdAndRemove(req.params.id)
        if(!whiteTest)
            return res.status(404).send('WhiteTest id not found');
        res.send(whiteTest);
    } catch (error) {
        res.status(400).send('Problem in delete WhiteTest ')
            }
    
});
 
module.exports=router;