require('./db/connect')
const express=require('express');
const appDebug=require('debug')('app.debug');

const whitetest_router=require('./routers/whitetests');

const certification_router=require('./routers/certifications');




const user_router = require('./routers/users');

const port =process.env.PORT ||3000;

const app=express();

app.listen(port,()=> appDebug(`Server on ${port}`));


app.use(express.json());
app.use('/api/whitetests',whitetest_router);
app.use('/api/certifactions',certification_router);
app.use('/api/users',user_router);



