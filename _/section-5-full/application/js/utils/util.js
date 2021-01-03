define([], function() {
  return {
    clone: function(obj) {
      var objClone = {}
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          objClone[key] = obj[key]
        }
      }

      return objClone
    }

  , mixFromTo: function(From, To) {
      for (var key in From) {
        if (From.hasOwnProperty(key)) {
          To[key] = From[key]
        }
      }
    }

  }
})
