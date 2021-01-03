define(['track/controller'], function(TrackController){
  var tracks = []

  tracks.push(new TrackController({
    id: 1
  , title: 'First track'
  , duration: 7
  }))
  tracks.push(new TrackController({
    id: 2
  , title: 'Best track'
  , duration: 12
  }))
  tracks.push(new TrackController({
    id: 3
  , title: 'New track'
  , duration: 23
  }))

  return tracks
})
