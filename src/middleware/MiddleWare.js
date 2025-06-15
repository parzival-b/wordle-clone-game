import jwt from 'jsonwebtoken'

function authMiddleware(req,res, next){

const token = req.headers['authorization']
if(!token){return res.status(401).send({message:'token not found'})}

jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
    if(err){return res.status(401).send({message:'Invalid token'})}

     req.userId = decoded.id
     next()

})

}


export default authMiddleware