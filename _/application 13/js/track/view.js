define(['utils/dom'], function(D$){
  function TrackView(model) {
    this.model = model
  }

  TrackView.prototype.render = function() {
    var row, cell4
      , tracksContainer = document.getElementById('tracks')
      , className = this.model.get('isActive') ? 'success' : ''

    row = D$.create('tr', {parent: tracksContainer, className: className})
    D$.create('td', {parent: row, text: this.model.get('id')})
    D$.create('td', {parent: row, text: this.model.get('title')})
    D$.create('td', {parent: row, text: this.model.get('duration')})
    cell4 = D$.create('td', {parent: row})

    this.renderButtons(cell4)
  }

  TrackView.prototype.renderButtons = function(buttonsContainer) {
    var button1, button2

    button1 = D$.create('button', {parent: buttonsContainer, className: 'btn btn-xs btn-danger'})
    D$.create('span', {parent: button1, className: 'glyphicon glyphicon-remove'})

    button2 = D$.create('button', {parent: buttonsContainer, className: 'btn btn-xs btn-primary'})
    D$.create('span', {parent: button2, className: 'glyphicon glyphicon-play'})
  }

  return TrackView
})
