app.playerView = (function () {
  const el = document.querySelector('.player')
  const player = el.querySelector('audio')

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

  player.addEventListener('ended', playRandomSong)

  return { playSong, playRandomSong }
})()
