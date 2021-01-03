define(['track/model', 'track/view'], function(TrackModel, TrackView) {
  function TrackController(data) {
    this.model = TrackModel(data)
    this.view = new TrackView(this.model, this)
  }

  TrackController.prototype.show = function() {
    this.view.render()
  }

  return TrackController
})
