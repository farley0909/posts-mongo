import { MongoClient } from "mongodb";
   
  
async function MongoGetAll(){
    let mongo = new MongoClient(process.env.DB_URL, {useUnifiedTopology:true})
    try {
        await mongo.connect()
        const post =await  mongo.db('projetoBD2').collection('post')
        let allPost = []
        await post.find().forEach(p=>allPost.push(p))
        await mongo.close()
        return await {status:allPost}
    } catch (error) {
        await mongo.close()
        return await {status: error.message}
    }
        
}
export {MongoGetAll}