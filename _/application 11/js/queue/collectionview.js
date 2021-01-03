define(['utils/dom'], function(D$){
  var tracksContainer = document.getElementById('tracks')

  function render(tracks) {
    var i, row, cell1, cell2, cell3, cell4, button1, button1icon, button2icon;
    for(i = 0; i < tracks.length; i++) {
      row = D$.create('tr', {parent: tracksContainer})
      cell1 = D$.create('td', {parent: row, text: tracks[i].id})
      cell2 = D$.create('td', {parent: row, text: tracks[i].title})
      cell3 = D$.create('td', {parent: row, text: tracks[i].duration})
      cell4 = D$.create('td', {parent: row})

      button1 = D$.create('button', {parent: cell4, className: 'btn btn-xs btn-danger'})
      D$.create('span', {parent: button1, className: 'glyphicon glyphicon-remove'})

      button2 = D$.create('button', {parent: cell4, className: 'btn btn-xs btn-primary'})
      D$.create('span', {parent: button2, className: 'glyphicon glyphicon-play'})
    }
  }

  return {render: render}
})
