define(['utils/util', 'utils/pubsub_mixin'], function(Util, PubSubMixin) {
  var TrackModel = Object.create(PubSubMixin)

  TrackModel.init = function(data) {
    PubSubMixin.init.call(this) // Call PubSub init
    this.attributes = data || {}
    return this // Return to allow chaining
  }

  TrackModel.toJSON = function() {
    return Util.clone(this.attributes)
  }

  TrackModel.has = function(attr) {
    return this.attributes.hasOwnProperty(attr)
  }

  TrackModel.get = function(attr) {
    if (this.has(attr)) {
      return this.attributes[attr]
    } else {
      return null
    }
  }

  return function(data) {
    return Object.create(TrackModel).init(data)
  }
})
