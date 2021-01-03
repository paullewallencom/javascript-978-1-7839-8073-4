define([], function() {
  function getTrackData(track) {
    var promise = new Promise(function(resolve, reject) {
      var client = new XMLHttpRequest()
      client.open('GET', '/track/' + track.id)
      client.onload = function() {
        if (this.status == 200) {
          resolve(JSON.parse(this.response))
        } else {
          reject(this.statusText)
        }
      }
      client.onerror = function(error) {
        reject(this.statusText)
      }
      client.send()
    })

    return promise
  }

  return getTrackData
})
