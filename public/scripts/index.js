

let btn = document.getElementById('btnEnviaPost')
btn.addEventListener('click', async ()=>{
    let title = document.getElementById('titleInput').value
    let content = document.getElementById('contentInput').value
    let autor = document.getElementById('autorInput').value
    console.log(autor)
    if(title.length <= 0 || content.length<=0){
        alert("O título ou o conteúdo do post está vazio")
    }
    let contentToSend = {
        title: title,
        content: content,
        author: autor
    }
    try {
        let request = await fetch("http://localhost:3333/post/create/", {method:'POST', body:JSON.stringify(contentToSend),   headers: {
            'Content-Type': 'application/json',
          },})
        let result =await  request.json()
        console.log(result)
        document.getElementById('btnClose').click()
        document.location.reload(true);
    } catch (error) {
        console.log(error.message)
        document.getElementById('btnClose').click()
    }    
   
})
let btnEdit = document.getElementById('btnEdit')
async function edit(a){
    console.log(a)
    let req = await fetch('http://localhost:3333/post/getAll/')
    let posts = await req.json()
    console.log(posts)
    posts.status.forEach(element => {
        if(element.id === a){
            let title = document.getElementById('editTitle')
            let content = document.getElementById('editContent')
            title.value = '' + element.title
            content.value =''+ element.content
            document.getElementById('sendEdit').addEventListener('click', async ()=>{
                let editContent = {
                    title:  title.value,
                    content: content.value,
                    id:element.id
                }
                console.log(editContent)
                   let c =  await fetch('http://localhost:3333/post/update/', {method:'POST', body:JSON.stringify(editContent),  headers: {
                        'Content-Type': 'application/json',
                      } })
                    let d = await c.json()
                if(d.status === 'okay'){
                    document.getElementById('editClose').click()
                    document.location.reload(true);
                }
            })
        }
    });
   
}
async function postDelete(id){
    let req = await fetch(`http://localhost:3333/post/delete/${id}` )
    let posts = await req.json()
    document.location.reload(true);
}
let search = document.getElementById('search')
search.addEventListener('click', async ()=>{
   let content = document.getElementById('inputSearch').value
   try {
    let req = await fetch(`http://localhost:3333/post/search/${content}` )
    let result =await req.json()
    let container = document.getElementById('contianerPosts')
    container.innerHTML=' '

    result.status.forEach(el => {
     let div = document.createElement('div')
     div.classList.add('card')
     let cardHeader = document.createElement('div')
     cardHeader.classList.add('card-header')
     let span = document.createElement('span')
     span.innerHTML=el.title
     cardHeader.appendChild(span)
     let btnsHeaders = document.createElement('div')
    btnsHeaders.classList.add('d-grid')
    btnsHeaders.classList.add('gap-2')
    btnsHeaders.classList.add('d-md-flex')
    btnsHeaders.classList.add('justify-content-md-end')
    let buttonEdit = document.createElement('button')
    buttonEdit.id='btnEdit'
    buttonEdit.setAttribute('data-bs-toggle', 'modal')
    buttonEdit.setAttribute('data-bs-target', '#modalEdit')
    buttonEdit.addEventListener('click',async ()=>{
        await edit(el.id)})
    buttonEdit.classList.add('btn') 
    buttonEdit.classList.add('btn-light')
    buttonEdit.classList.add('me-md-2')
    let span2 = document.createElement('span')
    span2.classList.add('material-symbols-outlined')
    span2.innerHTML='edit'
    buttonEdit.appendChild(span2)


    let buttonDelete = document.createElement('button')
    buttonDelete.addEventListener('click', async ()=>{
       await postDelete(el.id)
    })
    buttonDelete.classList.add('btn') 
    buttonDelete.classList.add('btn-light')
    buttonDelete.classList.add('me-md-2')
    let span3= document.createElement('span')
    span3.classList.add('material-symbols-outlined')
    span3.innerHTML='delete'
    buttonDelete.appendChild(span3)
    btnsHeaders.appendChild(buttonDelete)
    btnsHeaders.appendChild(buttonEdit)
    cardHeader.appendChild(btnsHeaders)
    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')
    let bq = document.createElement('blockquote')
    bq.classList.add('blockquote')
    bq.classList.add('mb-0')
    let p = document.createElement('p')
    p.innerHTML=''+el.content
    let footer = document.createElement('footer')
    footer.classList.add('blockquote-footer')
    footer.innerHTML=''+el.author
    bq.appendChild(p)
    bq.appendChild(footer)
    cardBody.appendChild(bq)
    div.appendChild(cardHeader)
    div.appendChild(cardBody)
    container.appendChild(div)
    })
    
    
    
   } catch (error) {
       await  console.log(error.message)
   }
  
})
{/*



<div class="card-body">
  <blockquote class="blockquote mb-0">
    <p><%=post.content%></p>
    <footer class="blockquote-footer"><%=post.author%></footer>
  </blockquote>
</div>
</div> */}