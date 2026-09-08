import express from 'express'
import * as path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import addRouter from './routes/add.ts'
import deleteRouter from './routes/delete.ts'
import readRouter from './routes/read.ts'
import updateRouter from './routes/update.ts'
import cors from 'cors'
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/add', addRouter)
app.use('/delete', deleteRouter)
app.use('/read', readRouter)
app.use('/update', updateRouter)
export default app
