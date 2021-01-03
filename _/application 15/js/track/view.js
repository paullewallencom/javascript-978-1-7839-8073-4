define(['utils/dom'], function(D$){
  function TrackView(model, controller) {
    this.model = model
    this.controller = controller
    this.isRendered = false
    this.$row = null

    this.listenForModel()
  }

  TrackView.prototype.listenForModel = function() {
    this.model.on('change', function(attr, val, model) {
      // Rerender the view if model changes
      if (this.isRendered) {
        this.render()
      }
    }, this)
  }

  TrackView.prototype.render = function() {
    var cell4
      , tracksContainer = document.getElementById('tracks')
      , className = this.model.get('isActive') ? 'success' : ''

    // Replace old row with new
    if (this.isRendered) {
      var $newRow = D$.create('tr', {className: className})
      this.$row.parentNode.replaceChild($newRow, this.$row);
      this.$row = $newRow

    } else {
      this.$row = D$.create('tr', {parent: tracksContainer, className: className})
    }

    D$.create('td', {parent: this.$row, text: this.model.get('id')})
    D$.create('td', {parent: this.$row, text: this.model.get('title')})
    D$.create('td', {parent: this.$row, text: this.model.get('duration')})
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
      that.controller.onEvent('play')
    })
  }

  return TrackView
})
