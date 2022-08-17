app.playerView = (function () {
  const el = document.querySelector('.player')
  const player = el.querySelector('audio')
  const searchBox = el.querySelector('.search-box')

  const playSong = song => {
    player.src = 'https://drive.google.com/uc?export=download&id=' + song.file_id
    player.play()
    el.querySelector('.current-song').textContent = song.title
    document.title = song.title
  }

  const playRandomSong = () => {
    const index = Math.floor(Math.random() * app.songs.length)
    playSong(app.songs[index])
  }

  const search = () => {
    const query = searchBox.value.toLowerCase()
    if (query) {
      const matchingSongs = app.songs.filter(song => {
        const artistName = (song.artist || '').toLowerCase()
        return song.title.toLowerCase().includes(query) || artistName.includes(query)
      })
      app.songListView.render(matchingSongs)
    } else {
      app.songListView.render(app.songs)
    }
  }

  player.addEventListener('ended', playRandomSong)
  searchBox.addEventListener('keyup', search)

  return { playSong, playRandomSong }
})()
