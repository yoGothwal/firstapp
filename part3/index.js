console.log('hello world 00')
const express = require('express')
const app = express()
app.use(express.json())
let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]
  

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  app.get('/api/notes/:id', (request, response)=>{
    const id = request.params.id;
    const note = notes.find(note=> note.id === id)
    if(note){
        response.json(note)
    }else{
        response.status(40).end()
    }
  })
  const generateID = ()=>{
    return notes.length > 0 ? Math.max(...notes.map(note => note = Number(note.id))) : 0;
  }
  app.post('/api/notes', (request, response) => {
    if(!request.body.content){
      return response.status(404).json({error: 'missing content'})
    }
    const note = request.body
    note.id = String(generateID()+1);
    note.important = false;
    notes = notes.concat(note)
    console.log(note)
    response.json(note)
  })
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })
  app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })
  port = 3001
  app.listen(port, ()=> {
    console.log(`server running onn ${port}`)
  })