import { MongoClient } from "mongodb";
   
  
async function MongoDelete(id){
    let mongo = new MongoClient(process.env.DB_URL, {useUnifiedTopology:true})
    try {
        await mongo.connect()
        const post =await  mongo.db('projetoBD2').collection('post')
        await post.deleteOne({id:id}).then(console.log('Post Removido'))
        await mongo.close()
        return await {status:'okay'}
    } catch (error) {
        await mongo.close()
        return await {status: error.message}
    }
        
}
export {MongoDelete}