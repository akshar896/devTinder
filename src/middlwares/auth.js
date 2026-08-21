const auth =(req,res,next)=>{
    const token="abcr";
    const authToken="abc";
    if(token===authToken){
        next();
    }
    else{
        res.status(401).send("Unauthorised access");
    }
}
module.exports={
    auth
}