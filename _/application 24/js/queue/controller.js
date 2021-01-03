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

    var that = this

    if (options.autoload) {
      this.loadData(function() {
        if (options.autorender) {
          that.render()
        }

        if (options.autoplay) {
          PubSub.trigger('request:queue:next')
        }
      })
    }

  }

  QueueController.prototype.initHooks = function() {
    PubSub
      .on('request:queue:play', function(track) {
        this.collection.reset()
        while (this.collection.hasNext()) {
          if (this.collection.next().value.model.get('id') == track.id) {
            PubSub.trigger('request:player:play', this.collection.current().value.model.toJSON())
            break
          }
        }
      }, this)

      .on('request:queue:next', function() {
        if (this.collection.hasNext()) {
          PubSub.trigger('request:player:play', this.collection.next().value.model.toJSON())
        }
      }, this)

    PubSub.on('request:queue:remove', function(track) {
      // If it was active song then play next after it
      if (this.collection.current().value && this.collection.current().value.model.get('id') == track.id) {
        PubSub.trigger('request:queue:next')
      }

      // Remove from collection
      this.collection.removeById(track.id)

    }, this)
  }

  QueueController.prototype.loadData = function(callback) {
    this.collection = TracksCollection()

    this.collection.loadFrom('/tracks', function(error, data) {
      if (error != null) {
        console.error(error)
      } else {
        callback()
      }
    })
  }

  QueueController.prototype.render = function() {
    if (this.view == null) {
      this.view = new TracksView()
    }
    this.view.render(TracksCollection())
  }

  return QueueController
})