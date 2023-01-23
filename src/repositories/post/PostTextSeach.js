import { MongoClient } from "mongodb";
   
  
async function MongoTextSearch(stringToSearch){
    let mongo = new MongoClient(process.env.DB_URL, {useUnifiedTopology:true})
    try {
        await mongo.connect()
        const post =await  mongo.db('projetoBD2').collection('post')
        let result = []
        await post.find({ $text: { $search: "post" } } ,{ score: { $meta: "textScore" } }).sort( { ignoredName: { $meta: "textScore" } } ).forEach(p=>result.push(p))
        await mongo.close()
        return await {status:result}
    } catch (error) {
        await mongo.close()
        return await {status: error.message}
    }
        
}
export {MongoTextSearch}