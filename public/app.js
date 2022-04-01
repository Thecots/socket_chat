const socket = io('http://localhost:5030')
const container = document.querySelector('.container')
const form = document.querySelector('form')
const input = document.querySelector('input')
let username = ''
m = true
do {
  username = prompt('Nombre de usuario');
  if(username != null) m = false
} while (m);
socket.emit('uconnect', username)

/* user connected */
socket.on('uconnected', data => {
  appendMessage(data,null)
})

/* message recived */
socket.on('chat-message', data => {
  appendMessage(data.message, data.username)
})

/* form */
form.addEventListener('submit', e => {
  e.preventDefault()
  socket.emit('send-chat-message',  {message: input.value, username})
  appendMessage(input.value,false,true)
  input.value = '';
})

function appendMessage(e,u,c){
  m = document.createElement('div')
  container.append(m)
  if(u != null){
    if(c) m.classList.add('me')
    if(!u) u = 'Yo'
    container.children[container.childElementCount-1].innerHTML = `<p>${u}</p><p>${e}</p>`
  }else{
    m.classList.add('connected')
    container.children[container.childElementCount-1].innerHTML = `<p>${e} se ha conectado</p>`

  }
  container.scrollTo(0,container.scrollHeight)
}