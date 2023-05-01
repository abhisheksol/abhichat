const socket =io()
let nam;
let textarea=document.querySelector('#messageinp')

let messagearea=document.querySelector('.container')

do{
    nam=prompt("enter the name:")
} while(!nam)

textarea.addEventListener('keyup', (e) =>{
    if(e.key == "Enter"){
        sendMessage(e.target.value)
    }
})
function sendMessage(mess){
    let msg={
        user: nam,
        message: mess
    }
    //append
    appendMessage(msg,'right')
    textarea.value=''
    //send to server

    socket.emit('message',msg)
}

function appendMessage(msg, type){
     let maindiv =document.createElement('div')
     let className=type
     maindiv.classList.add(className,'message')

     let markup=`
     <h4>${msg.user}</h4>
     <p>${msg.message}</p>
     `
     maindiv.innerHTML=markup
     messagearea.appendChild(maindiv)
}

// recieve

socket.on('message', (msg)=>{
    console.log(msg)
    appendMessage(msg,'left')
})