define([], function() {
  var tracksCache = {}

  function getTrackData(track) {
    var promise = new Promise(function(resolve, reject) {
      // If available in cache
      if (tracksCache.hasOwnProperty(track.id)) {
        resolve(tracksCache[track.id])

      // Else get from server
      } else {
        var client = new XMLHttpRequest()
        client.open('GET', '/track/' + track.id)
        client.onload = function() {
          if (this.status == 200) {
            // Cache
            tracksCache[track.id] = JSON.parse(this.response)

            resolve(tracksCache[track.id])
          } else {
            reject(this.statusText)
          }
        }
        client.onerror = function(error) {
          reject(this.statusText)
        }
        client.send()
      }
    })

    return promise
  }

  return getTrackData
})
