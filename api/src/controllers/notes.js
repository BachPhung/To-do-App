const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
notesRouter.get('/', async (request, response) => {
  const body = request.body
  console.log(body);
  console.log('1');
  const notes = await Note.find({}).populate('user',{username:1,name:1})
  response.json(notes)
})

const getTokenFrom = request =>{
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

notesRouter.get('/:id', async (request, response, next) => {
  const notes = await Note.findById(request.params.id)
  response.json(notes.toJSON())
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.headers.authorization.split(' ')[1];
  console.log(token);
  const decodedToken = jwt.verify(token,"secret");
  if(!token || !decodedToken.id){
      return response.status(401).json({error:'token missing or invalid'})
  }
  const user = await User.findById(decodedToken.id).select('-passwordHash');

  console.log(user);
  
  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user.id,
  })

  const savedNote = await note.save()
  user.notes.push(savedNote.id);
  await user.save()
  console.log(savedNote);
  return response.json(savedNote);
})

notesRouter.delete('/:id', async (request, response, next) => {
   await Note.findByIdAndRemove(request.params.id).then(response.send('Note deleted'))
})

notesRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const note = {
    content: body.content,
    important: body.important,
  }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
  response.json(updatedNote)
})

module.exports = notesRouter