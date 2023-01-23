import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express'
import { router } from '../src/routes.js'
const app = express()
app.set('view engine', 'ejs') 
app.set('views', './public');
app.use(express.static('public'));
app.use(express.json())
app.use(router)
console.log(process.env.DBPASSWORD)
export {app}