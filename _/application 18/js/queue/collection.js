define(['track/controller'], function(TrackController){
  var tracks = []

  tracks.push(new TrackController('track', {
    id: 1
  , title: 'First track'
  , duration: 7
  }))

  tracks.push(new TrackController('track', {
    id: 2
  , title: 'Best track'
  , duration: 12
  }))

  tracks.push(new TrackController('track', {
    id: 3
  , title: 'New track'
  , duration: 23
  }))

  tracks.push(new TrackController('single', {
    id: 4
  , name: 'Single track'
  , duration: 14
  , year: 2010
  }))

  tracks.push(new TrackController('album', {
    id: 5
  , duration: 17
  , name: 'Red Fox'
  , albumYear: 2010
  , albumTitle: 'Where wind glows'
  }))

  function* tracksIterator() {
    var currentIndex = 0

    while (currentIndex < tracks.length) {
      yield tracks[currentIndex]
      currentIndex++
    }
  }

  return function() {
    return tracksIterator()
  }
})
