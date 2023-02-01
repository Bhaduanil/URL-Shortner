require('dotenv').config()
const mongoose=require('mongoose')
const uri=process.env.URI;
const connectdb=async ()=>{
    try{
        console.log('CONNECTING...');
    const connect=await mongoose.connect(uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
}
catch(err)
{
    console.log(err);
}
};
module.exports=connectdb;