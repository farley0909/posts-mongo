import { MongoClient } from "mongodb";
   
  
export async function userById(id){
    let mongo = new MongoClient(process.env.DB_URL, {useUnifiedTopology:true})
    try {
        await mongo.connect()
        const user = await  mongo.db('projetoBD2').collection('user')
        let allUsers = []
        await user.find().forEach(p=>allUsers.push(p))
        await mongo.close()
        let userToReturn
        allUsers.forEach(el => {
            if(el.id == id) userToReturn = el
        })
        return await {status:userToReturn}
    } catch (error) {
        await mongo.close()
        return await {status: error.message}
    }
        
}
