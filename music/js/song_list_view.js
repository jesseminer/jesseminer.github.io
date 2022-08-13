SongListView = function () {
  this.el = document.querySelector('.song-list');

  this.addPlayButtonListener = () => {
    this.el.addEventListener('click', function (e) {
      let btn = e.target;
      const clickedTriangle = btn.classList.contains('play-triangle');
      if (!btn.classList.contains('play-song') && !clickedTriangle) { return; }
      if (clickedTriangle) { btn = btn.parentElement; }

      const songId = parseInt(btn.getAttribute('data-id'));
      const song = app.songs.find(s => s.id === songId);
      app.playerView.playSong(song);
    });
  };

  this.addSearchListener = () => {
    const self = this;
    document.querySelector('.search-box').addEventListener('keyup', function (e) {
      const query = this.value.toLowerCase();
      if (query) {
        const matchingSongs = app.songs.filter(song => {
          const artistName = (song.artist || '').toLowerCase();
          return song.title.toLowerCase().includes(query) || artistName.includes(query);
        });
        self.render(matchingSongs);
      } else {
        self.render(app.songs);
      }
    });
  };

  this.render = songs => {
    this.el.innerHTML = '';
    songs.forEach(song => {
      const row = document.createElement('tr');
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
      this.el.appendChild(row);
    });
  };
};
