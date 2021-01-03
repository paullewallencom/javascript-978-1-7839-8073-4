define(['track/model_track', 'utils/util'], function(TrackModel, Util) {
  var AlbumModel = Object.create(TrackModel)

  AlbumModel.toJSON = function() {
    var data = Util.clone(this.attributes)
    data.title = '[' + data.albumYear + '][Album] ' + data.albumTitle
    return data
  }

  return AlbumModel
})
