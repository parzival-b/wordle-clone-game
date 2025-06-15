import express from 'express'
import bcrypt from 'bcryptjs'
import db from '../db.js'
import jwt from 'jsonwebtoken'

const router= express.Router()

router.post('/register',(req,res)=>{
    const {username,password}= req.body
    const hashedpassword = bcrypt.hashSync(password,8)
    try{
        const insertUser = db.prepare(`INSERT INTO Users (username , password) VALUES (?,?)`)
         const result=insertUser.run(username, hashedpassword)
         const userId= result.lastInsertRowid
         const wins=0
         const losses=0
         const games=0
         const firstGame= db.prepare('INSERT INTO score (user_Id,wins,losses,gamesPlayed) VALUES (?,?,?,?)')
         firstGame.run(userId,wins,losses,games)

        console.log('Inserted user ID:', result.lastInsertRowid);
         const token = jwt.sign({id: result.lastInsertRowid},process.env.JWT_SECRET,{expiresIn: '24h'})
console.log(token)
         res.json({token})
    }
    catch(err){
        console.log("error in registering: "+err.message )
        res.sendStatus(503)
    }
})



router.post('/login',(req,res)=>{
    const {username, password}= req.body
   try{
     const selectUser = db.prepare(`SELECT * FROM Users WHERE username=?`)
    const user = selectUser.get(username)
    if(!user){return res.status(404).send({message:'User not found'})}

    const comparePass = bcrypt.compareSync(password,user.password)
    if(!comparePass){return res.status(404).send({message:'wrong password'})}


const token = jwt.sign({id: user.id},process.env.JWT_SECRET,{expiresIn:'24h'})
     res.json({token})
   }
   catch(err){
    console.log("error in loggining in: "+err )
        res.sendStatus(503)
   }
})




export default router