import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import bodyParser from "body-parser"
import express from 'express'
import { router } from '../src/routes.js'
const app = express()
app.set('view engine', 'ejs') 
app.set('views', './public');
app.use(express.static('public'));
app.use(express.json())
app.use(router)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
export {app}