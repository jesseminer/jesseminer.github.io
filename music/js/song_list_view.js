SongListView = function () {
  this.el = document.querySelector('.song-list');

  this.addPlayButtonListener = function () {
    this.el.addEventListener('click', function (e) {
      var btn = e.target;
      if (!btn.classList.contains('play-song')) { return; }

      var songId = parseInt(btn.getAttribute('data-id'));
      var song = app.songs.find(function (s) {
        return s.id === songId;
      });
      app.playerView.playSong(song);
    });
  };

  this.render = function () {
    var self = this;
    app.songs.forEach(function (song) {
      var row = document.createElement('tr');
      row.classList.add('song-row');
      row.innerHTML = `
        <td>
          <div class="flex-vertical-center">
            <img class="play-song" data-id="${song.id}" src="images/play.svg">
            <span class="margin-left">${song.title.substring(0, 40)}</span>
          </div>
        </td>
        <td class="artist-name">${song.artist.substring(0, 40)}</td>
      `;
      self.el.appendChild(row);
    });
  };
};
