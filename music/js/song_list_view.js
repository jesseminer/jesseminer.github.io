SongListView = function () {
  this.el = document.querySelector('.song-list');

  this.addPlayButtonListener = function () {
    this.el.addEventListener('click', function (e) {
      var btn = e.target;
      var clickedTriangle = btn.classList.contains('play-triangle');
      if (!btn.classList.contains('play-song') && !clickedTriangle) { return; }
      if (clickedTriangle) { btn = btn.parentElement; }

      var songId = parseInt(btn.getAttribute('data-id'));
      var song = app.songs.find(function (s) {
        return s.id === songId;
      });
      app.playerView.playSong(song);
    });
  };

  this.addSearchListener = function () {
    var self = this;
    document.querySelector('.search-box').addEventListener('keyup', function (e) {
      var query = this.value.toLowerCase();
      if (query) {
        var matchingSongs = app.songs.filter(function (song) {
          var artistName = (song.artist || '').toLowerCase();
          return song.title.toLowerCase().includes(query) || artistName.includes(query);
        });
        self.render(matchingSongs);
      } else {
        self.render(app.songs);
      }
    });
  };

  this.render = function (songs) {
    var self = this;
    this.el.innerHTML = '';
    songs.forEach(function (song) {
      var row = document.createElement('tr');
      row.classList.add('song-row');
      row.innerHTML = `
        <td>
          <div class="flex-vertical-center">
            <div class="play-song" data-id="${song.id}">
              <div class="play-triangle"></div>
            </div>
            <span class="margin-left-sm">${song.title.substring(0, 40)}</span>
          </div>
        </td>
        <td class="artist-name">${(song.artist || '').substring(0, 40)}</td>
      `;
      self.el.appendChild(row);
    });
  };
};
