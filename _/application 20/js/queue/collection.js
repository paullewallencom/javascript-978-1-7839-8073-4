define([
  'track/controller'
, 'utils/iterator_mixin'
, 'utils/util'
], function(TrackController, IteratorMixin, Util){
  function TracksIterator() {
    this.init()
  }

  Util.mixFromTo(IteratorMixin, TracksIterator.prototype)

  var tracksCollection = new TracksIterator()

  tracksCollection.addChild(new TrackController('track', {
    id: 1
  , title: 'First track'
  , duration: 7
  }))

  tracksCollection.addChild(new TrackController('track', {
    id: 2
  , title: 'Best track'
  , duration: 12
  }))

  tracksCollection.addChild(new TrackController('track', {
    id: 3
  , title: 'New track'
  , duration: 23
  }))

  tracksCollection.addChild(new TrackController('single', {
    id: 4
  , name: 'Single track'
  , duration: 3
  , year: 2010
  }))

  var album5 = new TrackController('album', {
    id: 5
  , albumYear: 2010
  , albumTitle: 'Red fox'
  })

  album5.addChild(new TrackController('track', {
    id: 6
  , title: 'Nested track'
  , duration: 23
  }))

  var subAlbum7 = new TrackController('album', {
      id: 7
    , albumYear: 2019
    , albumTitle: 'Under Red Fox'
  })

  subAlbum7.addChild(new TrackController('track', {
    id: 8
  , title: 'Doubly Nested track'
  , duration: 8
  }))

  album5.addChild(subAlbum7)

  tracksCollection.addChild(album5)

  return function() {
    return tracksCollection
  }
})
