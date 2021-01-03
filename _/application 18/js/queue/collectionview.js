define([], function(){
  function TracksView() {}

  TracksView.prototype.render = function(tracksIterator) {
    var track
    while(track = tracksIterator.next().value) {
      track.show()
    }
  }

  return TracksView
})
