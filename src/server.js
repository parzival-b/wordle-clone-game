import express from 'express'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import MiddleWare from './middleware/MiddleWare.js'
import statsRoutes from './routes/statsRoutes.js'

const app = express()
const PORT = process.env.PORT 

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

app.use(express.json())

app.use(express.static(path.join(__dirname, '../public')))

app.get('/',(req,res)=>{

res.sendFile(path.join(__dirname, '../public','index.html'))

})

app.use('/auth',authRoutes)
app.use('/stats', MiddleWare, statsRoutes)


app.listen(PORT, ()=>{

    console.log(`the server is running on PORT ${PORT}`)
})