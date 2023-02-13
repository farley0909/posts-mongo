import { Router } from "express";
import uuid from 'uuidv4'
import { MongoDelete } from "./repositories/post/PostDelete.js";
import { MongoGetAll } from "./repositories/post/PostGetAll.js";
import { MongoSave } from "./repositories/post/PostSave.js";
import { MongoTextSearch } from "./repositories/post/PostTextSeach.js";
import { MongoUpdate } from "./repositories/post/PostUpdate.js";
import { userCreate } from "./repositories/user/CreateUser.js";
import { userLogin } from "./repositories/user/userLogin.js";
import { userById } from "./repositories/user/getUser.js";
const router = Router()

router.get("/home/:id", async (req, res)=>{
    let user = await userById(req.params.id)
    console.log(user)
    let posts = await MongoGetAll(user.status.name)
    res.render('index', {posts:posts.status, user:user.status})
})
router.get('/', async (req, res)=>{
    res.render('loginPage')
})
router.post('/post/create/', async (req, res)=>{
    let {title, content, author} = req.body
    let user = await userById(author)
    let postToSave = {
        id: uuid.uuid(),
        title: title,
        content:content,
        author:user.status.name
    }
    let result =await MongoSave(postToSave, author)
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
    let result = await MongoGetAll(false)
    res.json(result)
})
router.get('/post/search/:content', async (req, res)=>{
    let result = await MongoTextSearch(req.params.content)
    console.log("search", result)
    return res.json(result)
})
/// Rotas do usuário
router.post("/user/create/", async (req, res)=>{
    console.log(req.body)
    let result = userCreate(req.body)
    res.json(result)
})
router.post("/user/login/", async (req, res)=>{
    console.log(req.body)
    res.json(await userLogin(req.body))
})


export {router}