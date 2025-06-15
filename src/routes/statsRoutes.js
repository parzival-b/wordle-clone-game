import express from 'express'
import db from '../db.js'

const router = express.Router()

router.get('/',(req,res)=>{
    const getstats= db.prepare('SELECT * FROM Score WHERE user_id = ?')

if (!req.userId) {
  return res.status(401).json({ message: 'Unauthorized request' })
}

    const stats = getstats.all(req.userId)
    res.json(stats)





})
router.put('/',(req,res)=>{


})


export default router


// i want to change the front end stats page and make the open satats for get stats CRUD operation
// and plagain will be the update CRUD operation  