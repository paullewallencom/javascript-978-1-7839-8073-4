(function() {
  PlayerJS.queue.view.render()
  PlayerJS.player.controller.play()

  PlayerJS.utils.Timer.setTimeout(2, function(){
    PlayerJS.player.controller.pause()
  })
}())
