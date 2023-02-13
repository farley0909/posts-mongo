import { MongoClient } from "mongodb";
import neo4j, { session } from 'neo4j-driver'
const uri = "neo4j+s://e46590e9.databases.neo4j.io";
const user = "neo4j";
const password = "JwLKmdugeYXcQ7b9_zcrHyZnG9tgQ9FBcrp9b3TSyMc";
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));


async function MongoSave(postData, autorId) {
    let mongo = new MongoClient(process.env.DB_URL, { useUnifiedTopology: true })
    try {
        await mongo.connect()
        const post = await mongo.db('projetoBD2').collection('post')
        await post.insertOne(postData).then(console.log('Post salvo'))
        await mongo.close()
        await createPostOnNeo4J(postData, autorId)
        return await { status: 'okay' }
    } catch (error) {
        await mongo.close()
        return await { status: error.message }
    }

}

async function createPostOnNeo4J(postData, idAutor){
    const session = driver.session()
    const query = `CREATE (p:Post{title:"${postData.title}", id:"${postData.id}"}) RETURN p`
    try {
        await session.run(query).then(result => {
            console.log(result.records[0].length >0)
        }) 
        relation(idAutor, postData.id)
    } catch (error) {
        console.log(error.message)
    }finally{
        session.close()
    }
  
}

async function relation(user, post){
    const session = driver.session()
    try {
        const query = `MATCH (u:User), (p:Post) WHERE u.id ="${user}" AND p.id="${post}" CREATE (u)-[:CRIOU]->(p)`
        await session.run(query).then(result => {
            result.summary.counters._stats.relationshipsCreated
        })
    } catch (error) {
        console.log(error.message)
    }finally{
        await session.close()
    }
}
export { MongoSave }