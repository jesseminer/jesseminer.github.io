PlayerView = function () {
  this.el = document.querySelector('.player');
  this.player = this.el.querySelector('audio');

  this.playRandomSong = () => {
    var index = Math.floor(Math.random() * app.songs.length);
    this.playSong(app.songs[index]);
  };

  this.playSong = song => {
    this.player.src = 'https://drive.google.com/uc?export=download&id=' + song.file_id;
    this.player.play();
    this.el.querySelector('.current-song').textContent = song.title;
    document.title = song.title;
  };

  this.player.addEventListener('ended', this.playRandomSong.bind(this));
};
