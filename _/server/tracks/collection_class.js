function TracksCollection() {
  this.inlineTracks = {}
  this.nestedTracks = []
  this.maxTrackId = 0
}

TracksCollection.prototype.add = function(track) {
  if (track.parentId != null && this.inlineTracks[track.parentId] != null) {
    // Check if parent has tracks field
    if (this.inlineTracks[track.parentId].tracks == null) {
      this.inlineTracks[track.parentId].tracks = []
    }

    this.inlineTracks[track.parentId].tracks.push(track)
  } else {
    this.nestedTracks.push(track)
  }

  this.inlineTracks[track.id] = track
}

TracksCollection.prototype.getTracksTree = function() {
  return this.nestedTracks
}

module.exports = TracksCollection
