import { MongoClient } from "mongodb";
   
  
async function MongoUpdate(data){
    let mongo = new MongoClient(process.env.DB_URL, {useUnifiedTopology:true})
    try {
        await mongo.connect()
        const post =await  mongo.db('projetoBD2').collection('post')
        await post.updateOne({id:data.id}, {$set:{title:data.title, content:data.content}}).then(console.log('Post Atualizado'))
        await mongo.close()
        return await {status:'okay'}
    } catch (error) {
        await mongo.close()
        return await {status: error.message}
    }
        
}
export {MongoUpdate}