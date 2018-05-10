const path = require('path')
require('dotenv').config({
  path: process.env.DEV ? path.join(__dirname, '/../.env-dev') : path.join(__dirname, '/../.env')
})

const debug = require('debug')('media-server')
const app = require('express')()

const PlaylistService = require('./playlistService')

app.get('/playlist', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')

  PlaylistService.getPlaylist()
    .then(tracks => {
      res.send(tracks)
    })
    .catch(err => {
      res.status(500).send(err)
    })
})

app.listen(process.env.PORT, () => {
  debug('app listening on ' + process.env.PORT + '!')
  debug('mongodb URL ' + process.env.MONGO_URL)
})