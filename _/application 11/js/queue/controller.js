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
        PubSub.trigger('request:player:play', this.collection[0])
      }
    }
  }

  QueueController.prototype.initHooks = function() {
    PubSub.on('player:play', function(track){
      for (var i = 0; i < this.collection.length; i++) {
        if (this.collection[i].id === track.id) {
          this.currentIndex = i
          break;
        }
      }
    }, this)

    PubSub.on('request:queue:next', function() {
      if (this.collection.length > this.currentIndex + 1) {
        PubSub.trigger('request:player:play', this.collection[this.currentIndex + 1])
      }
    }, this)
  }

  QueueController.prototype.loadData = function() {
    this.collection = TracksCollection
  }

  QueueController.prototype.render = function() {
    TracksView.render(this.collection)
  }

  return QueueController
})
