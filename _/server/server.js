var express = require('express')
  , app = express()
  , TracksCollection = require('./tracks/collection')

app.use(express.static('application'))

app.get('/tracks', function (req, res) {
  res.json(TracksCollection.getTracksTree())
})

app.listen(3000)
