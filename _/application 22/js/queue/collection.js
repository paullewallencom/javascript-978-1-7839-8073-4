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

  function TracksIterator() {
    this.init()
  }

  TracksIterator.prototype.init = function() {
    this.currentIndex = -1
  }

  TracksIterator.prototype.hasNext = function() {
    return this.currentIndex + 1 < tracks.length
  }

  TracksIterator.prototype.next = function() {
    this.currentIndex++
    return this.current()
  }

  TracksIterator.prototype.current = function() {
    if (this.currentIndex < tracks.length) {
      return {value: tracks[this.currentIndex], done: false}
    } else {
      return {value: undefined, done: true}
    }
  }

  TracksIterator.prototype.reset = function() {
    this.currentIndex = -1
  }

  // WARNING: Affects all iterators. Updates currentIndex only for current iterator
  TracksIterator.prototype.removeById = function(id) {
    for (var i = 0; i < tracks.length; i++) {
      if (tracks[i].model.get('id') == id) {
        tracks[i].destroy()
        tracks.splice(i, 1)

        if (i < this.currentIndex) {
          this.currentIndex -= 1
        }

        break
      }
    }
  }

  return function() {
    return new TracksIterator()
  }
})
