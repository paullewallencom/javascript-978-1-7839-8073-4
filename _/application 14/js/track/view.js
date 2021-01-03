define(['utils/dom'], function(D$){
  function TrackView(onEvent) {
    this.onEvent = onEvent
    this.isRendered = false
    this.$row = null
  }

  TrackView.prototype.render = function(data) {
    var cell4
      , tracksContainer = document.getElementById('tracks')
      , className = data.isActive ? 'success' : ''

    // Replace old row with new
    if (this.isRendered) {
      var $newRow = D$.create('tr', {className: className})
      this.$row.parentNode.replaceChild($newRow, this.$row);
      this.$row = $newRow

    } else {
      this.$row = D$.create('tr', {parent: tracksContainer, className: className})
    }

    D$.create('td', {parent: this.$row, text: data.id})
    D$.create('td', {parent: this.$row, text: data.title})
    D$.create('td', {parent: this.$row, text: data.duration})
    cell4 = D$.create('td', {parent: this.$row})

    this.renderButtons(cell4)
    this.isRendered = true
  }

  TrackView.prototype.renderButtons = function(buttonsContainer) {
    var button1, button2
      , that = this

    button1 = D$.create('button', {parent: buttonsContainer, className: 'btn btn-xs btn-danger'})
    D$.create('span', {parent: button1, className: 'glyphicon glyphicon-remove'})

    button2 = D$.create('button', {parent: buttonsContainer, className: 'btn btn-xs btn-primary'})
    D$.create('span', {parent: button2, className: 'glyphicon glyphicon-play'})

    D$.on(button2, 'click', function() {
      that.onEvent('play')
    })
  }

  return TrackView
})
