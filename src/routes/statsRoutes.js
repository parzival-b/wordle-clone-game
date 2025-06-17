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
  const {outcome}= req.body
let updateStats

if(outcome==1){
     updateStats= db.prepare('UPDATE Score SET gamesPlayed=gamesPlayed+1, wins=wins+1 WHERE user_id=?')
}
else{
    updateStats= db.prepare('UPDATE Score SET gamesPlayed=gamesPlayed+1, losses=losses+1 WHERE user_id=?')
}


  updateStats.run(req.userId)

  const getUpdated=db.prepare('SELECT * FROM Score WHERE user_id=?')

  const Updated = getUpdated.all(req.userId)

  res.json(Updated)
  

})






export default router


// i want to change the front end stats page and make the open satats for get stats CRUD operation
// and plagain will be the update CRUD operation  