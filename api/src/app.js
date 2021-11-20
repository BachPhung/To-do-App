const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const config = require('./utils/config')
require('dotenv').config();
require('express-async-errors')
const emojisRouter = require('./api/index')
const router = require('./api/emojis')
const app = express();
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const usersRoute = require('./controllers/users')
const loginRouter = require('./controllers/login')
logger.info('connecting to', config.MONGODB_URI)
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Team 19: Duc Thai - Bach Phung'
  });
});

app.get('/api', (req,res)=>{
  res.json({
    message: 'Team 19: Duc Thai - Bach Phung - Freechoice Project: To-do list'
  });
});
mongoose.connect('mongodb+srv://BachPhung:thutrang251@cluster0.c7sqy.mongodb.net/note_app?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/v1',emojisRouter);
app.use('/api/v1/emojis',router);
app.use('/api/notes', notesRouter)
app.use('/api/users', usersRoute)
app.use('/api/login',loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;
