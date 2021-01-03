PlayerJS.player.controller = (function(){
  var playerTitle = document.getElementById('player-title')
    , playerProgressBar = PlayerJS.player.progress
    , playerButtonPlay = document.getElementById('player-button-play')
    , playerState = {
        track: null
      , isPlaying: false
      , progress: 0
      , interval: null
      }
    , tracks = PlayerJS.queue.collection

  function playTrack(track){
    // Do nothing if it is the same track and player is already playing
    if (track === playerState.track && playerState.isPlaying) return false;

    // If same track, just play forward
    if (track !== playerState.track) {
      playerState.track = track
      playerTitle.innerHTML = track.title
      playerProgressBar.set(0)
    }

    playerState.isPlaying = true

    playerProgressBar.set(playerState.progress / playerState.track.duration)
    playerState.interval = PlayerJS.utils.Timer.setInterval(0.5 , function(){
      playerState.progress += 0.5

      if (playerState.progress <= playerState.track.duration){
        playerProgressBar.set(playerState.progress / playerState.track.duration)
      } else {
        clearInterval(playerState.interval)
        playerState.interval = null
        playerState.progress = 0

        playNextTrack()
      }
    })
  }

  function pauseTrack(){
    if (!playerState.isPlaying) return false;

    playerState.isPlaying = false
    clearInterval(playerState.interval)
    playerState.interval = null
  }

  function playNextTrack(){
    for (var i = 0; i < tracks.length; i++) {
      // Find current track
      if (tracks[i] === playerState.track) {
        // Check if next song is available
        if (i < tracks.length - 1) {
          playTrack(tracks[i + 1])
        }
        break;
      }
    }
  }

  PlayerJS.utils.D$.on(playerButtonPlay, 'click', function(ev){
    ev.preventDefault()
    if (playerState.isPlaying) {
      pauseTrack()
    } else {
      playTrack(playerState.track || tracks[0])
    }
  })

  return {
    play: function() {
      playTrack(playerState.track || tracks[0])
    }
  , pause: function() {
      pauseTrack()
    }
  }
}())
