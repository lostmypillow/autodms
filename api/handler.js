import serverlessExpress from '@codegenie/serverless-express'
import app from './app.js'

let handler
export default (handler = serverlessExpress({ app }))
