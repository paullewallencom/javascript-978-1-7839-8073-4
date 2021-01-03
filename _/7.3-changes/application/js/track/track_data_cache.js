define([], function() {
  var tracksCache = {}

  function getCachedTrackData(track) {
    var promise = new Promise(function(resolve, reject) {
      // If available in cache
      if (tracksCache.hasOwnProperty(track.id)) {
        resolve(tracksCache[track.id])
      } else {
        reject('No cache for given track')
      }
    })

    // Return promise
    return promise
  }

  function addTrackToCache(id, trackData) {
    tracksCache[id] = trackData
  }

  return {
    get: getCachedTrackData
  , set: addTrackToCache
  }
})
