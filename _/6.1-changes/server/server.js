var express = require('express')
var app = express()

app.use(express.static('application'))

app.get('/tracks', function (req, res) {
  res.json([
    {
      id: 1
    , title: 'First track'
    , duration: 5
    }
  , {
      id: 2
    , title: 'Second track'
    , duration: 7
    }
  ])
})

app.listen(3000)
