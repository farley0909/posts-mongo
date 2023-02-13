import { MongoClient } from "mongodb";
export async function userLogin(data){
  let mongo = new MongoClient(process.env.DB_URL, { useUnifiedTopology: true })
  try {
    await mongo.connect()
    const user = await  mongo.db('projetoBD2').collection('user')
    let userInfo = []
    await user.find().forEach(p=> userInfo.push(p))
    await mongo.close()
    let validado = 0
    let userValidado
    userInfo.forEach(el => {
      if(el.email == data.email && el.password == data.password) {
        validado =1
        userValidado = el
      }
    })
    if(validado == 0){
      return {status:'unauthorized'}
    }else{
      return {status:userValidado}
    }


    return  {status:userInfo}
  } catch (error) {
      return {status: error.message}
  }

}

   
