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
  }
})
