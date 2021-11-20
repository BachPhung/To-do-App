
const emojisRouter = require('express').Router();

emojisRouter.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});


module.exports = emojisRouter;
