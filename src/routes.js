import { Router } from "express";
import uuid from 'uuidv4'
import { MongoDelete } from "./repositories/post/PostDelete.js";
import { MongoGetAll } from "./repositories/post/PostGetAll.js";
import { MongoSave } from "./repositories/post/PostSave.js";
import { MongoTextSearch } from "./repositories/post/PostTextSeach.js";
import { MongoUpdate } from "./repositories/post/PostUpdate.js";
const router = Router()

router.get("/", async (req, res)=>{
    let posts = await MongoGetAll()
    res.render('index', {posts:posts.status})
})
router.post('/post/create/', async (req, res)=>{
    let {title, content, author} = req.body
    let postToSave = {
        id: uuid.uuid(),
        title: title,
        content:content,
        author:author
    }
    let result =await MongoSave(postToSave)
    res.json(result)
})

router.get('/post/delete/:id', async (req, res)=>{
    let {id} = req.params
    let result = await MongoDelete(id)
    res.json(result)
})
router.post('/post/update/', async (req,res)=>{
    let {id, title, content} = req.body
    let postAltered = {
        id:id,
        title:title,
        content:content
    }
    console.log("dataUpdate", postAltered)
    let result = await MongoUpdate(postAltered)
    res.json(result)
})
router.get('/post/getAll/', async (req, res)=>{
    let result = await MongoGetAll()
    res.json(result)
})
router.get('/post/search/:content', async (req, res)=>{
    let result = await MongoTextSearch(req.params.content)
    console.log("search", result)
    return res.json(result)
})
export {router}