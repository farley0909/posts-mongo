import { MongoClient } from "mongodb";
   
  
async function MongoSave(data){
    let mongo = new MongoClient(process.env.DB_URL, {useUnifiedTopology:true})
    try {
        await mongo.connect()
        const post =await  mongo.db('projetoBD2').collection('post')
        await post.insertOne(data).then(console.log('Post salvo'))
        await mongo.close()
        return await {status:'okay'}
    } catch (error) {
        await mongo.close()
        return await {status: error.message}
    }
        
}
export {MongoSave}