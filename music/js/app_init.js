window.app = {
  playerView: new PlayerView(),
  songListView: new SongListView()
};

app.songListView.addSearchListener();
app.songListView.addPlayButtonListener();

fetch('https://jtunes.herokuapp.com/songs').then(response => response.json()).then(songs => {
  app.songs = songs;
  app.songListView.render(app.songs);
  app.playerView.playRandomSong();
});
