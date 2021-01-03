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

    // Current track index
    this.currentIndex = -1

    this.initHooks()

    if (options.autoload) {
      this.loadData()
    }

    if (options.autorender) {
      this.render()
    }

    if (options.autoplay) {
      if (this.collection && this.collection.length) {
        PubSub.trigger('request:player:play', this.collection[0].model.toJSON())
      }
    }
  }

  QueueController.prototype.getTrackIndex = function(track) {
    for (var i = 0; i < this.collection.length; i++) {
      if (this.collection[i].model.get('id') === track.id) {
        return i
      }
    }

    return -1
  }

  QueueController.prototype.initHooks = function() {
    PubSub
      .on('player:play', function(track){
        this.currentIndex = this.getTrackIndex(track)
      }, this)

      .on('request:queue:play', function(track) {
        var trackIndex = this.getTrackIndex(track)
        PubSub.trigger('request:player:play', this.collection[trackIndex].model.toJSON())
      }, this)

      .on('request:queue:next', function() {
        if (this.collection.length > this.currentIndex + 1) {
          PubSub.trigger('request:player:play', this.collection[this.currentIndex + 1].model.toJSON())
        }
      }, this)

      .on('request:queue:index', function(index) {
        if (this.collection.length > index) {
          PubSub.trigger('request:player:play', this.collection[index].model.toJSON())
        }
      }, this)

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
    this.collection = TracksCollection.getTracks()
  }

  QueueController.prototype.render = function() {
    if (this.view == null) {
      this.view = new TracksView(this.collection)
    }
    this.view.render()
  }

  return QueueController
})
