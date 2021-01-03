define([
  'queue/collectionview'
, 'player/controller'
, 'header/view'
, 'utils/timer'
], function(CollectionView, PlayerController, HeaderView, Timer){
  CollectionView.render()
  PlayerController.play()

  Timer.setTimeout(2, function(){
    PlayerController.pause()
  })
})
