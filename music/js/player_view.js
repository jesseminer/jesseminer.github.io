PlayerView = function () {
  this.el = document.querySelector('.player');
  this.player = this.el.querySelector('audio');

  this.playSong = function (songId) {
    var song = app.songs.find(function (s) {
      return s.id === songId;
    });
    this.player.src = 'https://drive.google.com/uc?export=download&id=' + song.file_id;
    this.player.play();
    this.el.querySelector('.current-song').textContent = song.title;
  };
};
