define([
  'queue/collectionview'
, 'player/controller'
, 'utils/timer'
], function(CollectionView, PlayerController, Timer){
  CollectionView.render()
  PlayerController.play()

  Timer.setTimeout(2, function(){
    PlayerController.pause()
  })
})
