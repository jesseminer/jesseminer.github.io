window.app = {
  playerView: new PlayerView(),
  songListView: new SongListView()
};

app.songListView.addPlayButtonListener();

fetch('https://jtunes.herokuapp.com/songs').then(function (response) {
  return response.json();
}).then(function (songs) {
  app.songs = songs;
  app.songListView.render();
});
