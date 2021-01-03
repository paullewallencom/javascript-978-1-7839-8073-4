define(['track/model', 'track/view', 'utils/pubsub'], function(TrackModel, TrackView, PubSub) {
  function TrackController(data) {
    this.model = TrackModel(data)
    this.view = new TrackView(this.onEvent.bind(this))
    this.hookGlobalEvents()
  }

  TrackController.prototype.hookGlobalEvents = function() {
    PubSub.on('player:play', function(track) {
      if (track.id === this.model.get('id')) {
        this.model.set('isActive', true)
      } else {
        this.model.set('isActive', false)
      }
    }, this)
  }

  TrackController.prototype.show = function() {
    this.view.render(this.model.toJSON())
    this.hookModelEvents()
  }

  TrackController.prototype.hookModelEvents = function() {
    var that = this
    this.model.on('change', function() {
      that.view.render(that.model.toJSON())
    })
  }

  // Called from view
  TrackController.prototype.onEvent = function(action) {
    switch (action) {
      case 'play':
        PubSub.trigger('request:queue:play', this.model.toJSON())
        break;
    }
  }

  return TrackController
})
