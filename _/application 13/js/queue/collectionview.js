define([], function(){
  function TracksView(collection) {
    this.collection = collection
  }

  TracksView.prototype.render = function() {
    for (var i = 0; i < this.collection.length; i++) {
      this.collection[i].show()
    }
  }

  return TracksView
})
