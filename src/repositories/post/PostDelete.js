import { MongoClient } from "mongodb";
import neo4j, { session } from 'neo4j-driver'
const uri = "neo4j+s://e46590e9.databases.neo4j.io";
const user = "neo4j";
const password = "JwLKmdugeYXcQ7b9_zcrHyZnG9tgQ9FBcrp9b3TSyMc";
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password)); 
  
async function MongoDelete(id){
    let mongo = new MongoClient(process.env.DB_URL, {useUnifiedTopology:true})
    try {
        await mongo.connect()
        const post =await  mongo.db('projetoBD2').collection('post')
        await post.deleteOne({id:id}).then(console.log('Post Removido'))
        await mongo.close()
        deletePostNeo4j(id)
        return await {status:'okay'}
    } catch (error) {
        await mongo.close()
        return await {status: error.message}
    }
        
}
async function deletePostNeo4j(id){
    const session = driver.session()
    try {
        const query = `MATCH (p:Post)
        WHERE p.id = "${id}"
        DETACH DELETE p`  
        await session.run(query).then(result => {
            console.log(result.summary.counters._stats.nodesDeleted)
        })   
    } catch (error) {
        console.log(error.message) 
    }finally{
        session.close()
    }
}

export {MongoDelete}