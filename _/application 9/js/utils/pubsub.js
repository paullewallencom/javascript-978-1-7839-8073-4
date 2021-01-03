define([], function(){
  var observers = {}

  function ensureTopicExist(topic) {
    if (!observers.hasOwnProperty(topic)) {
      observers[topic] = []
    }
  }

  return {
    on: function(topic, cb, context) {
      context = context || null
      ensureTopicExist(topic)
      observers[topic].push({cb: cb, context: context})
    }
  , off: function(topic, cb) {
      ensureTopicExist(topic)
      for (var i = observers[topic].length - 1; i >= 0; i--) {
        if (observers[topic][i].cb === cb) {
          observers[topic].splice(i, 1)
        }
      }
    }
  , trigger: function(topic) {
      if (observers.hasOwnProperty(topic))
      for (var i = 0; i < observers[topic].length; i++) {
        observers[topic][i].cb.apply(observers[topic][i].context, Array.prototype.slice.call(arguments, 1))
      }
    }
  }
})
