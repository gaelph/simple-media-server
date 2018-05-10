const debug = require('debug')('media-server:playlist-service')
const MongoClient = require('mongodb').MongoClient

const getPlaylist = () => new Promise((resolve, reject) => {
  MongoClient.connect(process.env.MONGO_URL, (err, client) => {
    debug('connected to client')

    if (err) {
      debug(err)
      reject(err)
    }
    else {
      const db = client.db('simple_media')
      db.collection('tracks').find({}).toArray((err, tracks) => {
        debug('got tracks', tracks)
        if (err) {
          reject(err)
        }
        else {
          resolve(tracks)
        }

        client.close()
      })
    }
  })
})

module.exports = {
  getPlaylist
}