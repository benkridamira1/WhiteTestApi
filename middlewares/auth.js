const jwt = require('jsonwebtoken')

const config =require('config')


function verifyToken(req,res,next) {
    let token = req.headers['x-access-token'] ;
    if(!token)
        return res.status(403).send('A token is required');
    
    try {
        let decoded = jwt.verify(token.split(' ')[1],config.get('jwt'))
        req.user=decoded
    } catch (error) {
        return res.status(403).send('Invalid token '+error.message());
       
    }

    next();
    
}

module.exports=verifyToken;