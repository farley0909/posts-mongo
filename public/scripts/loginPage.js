let btn = document.getElementById('btnLogin')
btn.addEventListener("click", async ()=>{
   let email = document.getElementById('emailInput').value
   let senha = document.getElementById('senhaInput').value
   let body = {
    email:email,
    password:senha
   }
   let result = await fetch('http://localhost:3333/user/login', {
    headers:{
        'Content-type':"application/json"
    },
    body:JSON.stringify(body),
    method:"POST"
   })
   let conv = await result.json()
   console.log(conv)
   if(conv.status != "unauthorized"){
        location.href=`http://localhost:3333/home/${conv.status.id}`
   }
})
let btnRegister =document.getElementById('registerBtn')

btnRegister.addEventListener("click", async ()=>{
   let cancel = document.getElementById('cancel')
    let email = document.getElementById("emailRegister").value
    let senha = document.getElementById("senhaRegister").value
    let name = document.getElementById("nameRegister").value
    let body = {
        name: name,
        email: email,
        password:senha
    }
    let result = await fetch('http://localhost:3333/user/create/', {
        headers:{
            'Content-type':"application/json"
        },
        body:JSON.stringify(body),
        method:"POST"
    })
    let conv = await result.json()
    cancel.click()  
    console.log(conv)

})