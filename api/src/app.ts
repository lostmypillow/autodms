import express, { type Express, type Response } from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import addRouter from './routes/add/router.js'
// import addRouter from './routes/add/add.ts'
import deleteRouter from './routes/delete/router.js'
import readRouter from './routes/read/router.js'
import updateRouter from './routes/update/router.js'
import scrapeRouter from './routes/scrape/route.js'
import cors from 'cors'
import path from 'path'
const app = express()
const corsOptions = {
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://dms-dev.lostmypillow.com',
        'https://dms-prod.lostmypillow.com',
        'https://dms.lostmypillow.com',
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
}
app.use(logger('dev'))
app.use(express.json())
app.use(cors(corsOptions))
const staticPath = path.join(import.meta.dirname, 'public')
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/add', addRouter)
app.use('/delete', deleteRouter)
app.use('/read', readRouter)
app.use('/update', updateRouter)
app.use('/scrape', scrapeRouter)
app.use(express.static(staticPath))
app.get('{*splat}', (res: Response) => {
    res.sendFile(path.join(staticPath, 'index.html'))
})
export default app
