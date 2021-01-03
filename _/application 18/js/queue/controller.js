define([
  'queue/collection'
, 'queue/collectionview'
, 'utils/pubsub'
], function(TracksCollection, TracksView, PubSub) {
  var defaultOptions = {
      autoplay: false
    , autorender: true
    , autoload: true
    }

  function QueueController(options) {
    options = options || {}
    for (var key in defaultOptions) {
      if (defaultOptions.hasOwnProperty(key) && !options.hasOwnProperty(key)) {
        options[key] = defaultOptions[key]
      }
    }

    this.initHooks()

    if (options.autoload) {
      this.loadData()
    }

    if (options.autorender) {
      this.render()
    }

    if (options.autoplay) {
      PubSub.trigger('request:queue:next')
    }
  }

  QueueController.prototype.initHooks = function() {
    PubSub
      // TODO fixme
      .on('request:queue:play', function(track) {
        var trackIndex = this.getTrackIndex(track)
        PubSub.trigger('request:player:play', this.collection[trackIndex].model.toJSON())
      }, this)

      .on('request:queue:next', function() {
        var track
        if (track = this.collection.next().value) {
          PubSub.trigger('request:player:play', track.model.toJSON())
        }
      }, this)

      // TODO fixme
      .on('request:queue:index', function(index) {
        if (this.collection.length > index) {
          PubSub.trigger('request:player:play', this.collection[index].model.toJSON())
        }
      }, this)

    // TODO fixme
    PubSub.on('request:queue:remove', function(track) {
      var trackIndex = this.getTrackIndex(track)

      // Destroy track
      this.collection[trackIndex].destroy()

      // remove from collection
      this.collection.splice(trackIndex, 1)

      // if it was active song then play next after it
      if (trackIndex == this.currentIndex) {
        PubSub.trigger('request:queue:index', Math.min(this.collection.length -1, this.currentIndex))

      // if it was a track before current index then update current index
      } else if (trackIndex < this.currentIndex) {
        this.currentIndex -= 1
      }

    }, this)
  }

  QueueController.prototype.loadData = function() {
    this.collection = TracksCollection()
  }

  QueueController.prototype.render = function() {
    if (this.view == null) {
      this.view = new TracksView()
    }
    this.view.render(TracksCollection())
  }

  return QueueController
})
