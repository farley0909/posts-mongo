import neo4j from 'neo4j-driver'

const uri = "neo4j+s://e46590e9.databases.neo4j.io";
const user = "neo4j";
const password = "JwLKmdugeYXcQ7b9_zcrHyZnG9tgQ9FBcrp9b3TSyMc";
console.log("Dados de conexao: ", uri, user, password)
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

import { MongoClient } from "mongodb";
import { uuid } from "uuidv4";


async function userCreate(data) {
    data.id = await uuid()
    let mongo = new MongoClient(process.env.DB_URL, { useUnifiedTopology: true })
    try {
        await mongo.connect()
        const user = await mongo.db('projetoBD2').collection('user')
        await user.insertOne(data).then(console.log('User salvo'))
        await mongo.close()
        await createUserOnNeo4J(data)
        return await { status: 'okay' }
    } catch (error) {
        await mongo.close()
        return await { status: error.message }
    }

}
async function createUserOnNeo4J(data){
    const session = driver.session()
    const query = `CREATE (u:User{name:"${data.name}", id:"${data.id}"}) RETURN u`
    try {
        await session.run(query).then(result => {
            console.log(result.records[0].length >0)
        }) 
    } catch (error) {
        console.log(error.message)
    }finally{
        session.close()
    }
  
}
export {userCreate}