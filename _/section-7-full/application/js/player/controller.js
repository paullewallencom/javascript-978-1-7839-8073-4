define([
  'player/progress'
, 'track/track_data'
, 'utils/dom'
, 'utils/timer'
, 'utils/pubsub'
], function(PlayerProgressBar, TrackData, D$, Timer, PubSub){
  var playerTitle = document.getElementById('player-title')
    , playerButtonPlay = document.getElementById('player-button-play')
    , playerButtonPlayIcon = document.getElementById('player-button-play-icon')
    , playerState = {
        track: null
      , isPlaying: false
      , progress: 0
      , interval: null
      }
    , playerDataOriginalYear = document.getElementById('player-data-original-year')
    , playerDataCover = document.getElementById('player-data-cover')
    , playerDataCoverImage = playerDataCover.children[0]

  function setButtonState(state) {
    D$.removeClass(playerButtonPlayIcon, 'glyphicon-play')
    D$.removeClass(playerButtonPlayIcon, 'glyphicon-pause')
    D$.addClass(playerButtonPlayIcon, 'glyphicon-' + state)
  }

  function playTrack(track){
    // Do nothing if it is the same track and player is already playing
    if (playerState.track && track.id === playerState.track.id && playerState.isPlaying) return false;
    if (!track.isPlayable) return PubSub.trigger('request:queue:next')

    // If same track, just play forward
    if (!playerState.track || track.id !== playerState.track.id) {
      clearInterval(playerState.interval)
      playerState.progress = 0
      playerState.track = track
      playerTitle.innerHTML = track.title
      PlayerProgressBar.set(0)
    }

    playerState.isPlaying = true
    setButtonState('play')
    PubSub.trigger('player:play', track)
    renderTrackAdditionalInfo(track)

    PlayerProgressBar.set(playerState.progress / playerState.track.duration)
    playerState.interval = Timer.setInterval(0.5 , function(){
      playerState.progress += 0.5

      if (playerState.progress <= playerState.track.duration){
        PlayerProgressBar.set(playerState.progress / playerState.track.duration)
      } else {
        clearInterval(playerState.interval)
        playerState.interval = null
        playerState.progress = 0

        playNextTrack()
      }
    })
  }

  function renderTrackAdditionalInfo(track) {
    TrackData(track)
      .then(function(trackData) {
        setOriginalYear(trackData.originalYear || null)
        setCover(trackData.cover || null)
      })
      .catch(function(err) {
        setOriginalYear(null)
        setCover(null)
        console.log('Was not able to get additional track info for ID=' + track.get('id'))
      })
  }

  function setOriginalYear(value) {
    if (value) {
      D$.removeClass(playerDataOriginalYear, 'hide')
      D$.text(playerDataOriginalYear, 'Original Year: ' + value)
    } else {
      D$.addClass(playerDataOriginalYear, 'hide')
    }
  }

  function setCover(value) {
    if (value) {
      D$.removeClass(playerDataCover, 'hide')
      D$.attr(playerDataCoverImage, 'src', value)
    } else {
      D$.addClass(playerDataCover, 'hide')
    }
  }

  function pauseTrack(){
    if (!playerState.isPlaying) return false;

    playerState.isPlaying = false
    clearInterval(playerState.interval)
    playerState.interval = null
    setButtonState('pause')
    PubSub.trigger('player:pause')
  }

  function playNextTrack(){
    PubSub.trigger('request:queue:next')
  }

  D$.on(playerButtonPlay, 'click', function(ev) {
    ev.preventDefault()
    if (playerState.isPlaying) {
      pauseTrack()
    } else {
      if (playerState.track != null) {
        playTrack(playerState.track)
      } else {
        PubSub.trigger('request:queue:next')
      }
    }
  })

  PubSub.on('request:player:play', function(trackData) {
    playTrack(trackData)
  })

  PubSub.on('request:player:pause', function() {
    pauseTrack()
  })
})
