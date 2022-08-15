app.songListView = (function () {
  const el = document.querySelector('.song-list')

  const playButtonListener = e => {
    let btn = e.target
    const clickedTriangle = btn.classList.contains('play-triangle')
    if (!btn.classList.contains('play-song') && !clickedTriangle) { return }
    if (clickedTriangle) { btn = btn.parentElement }

    const songId = parseInt(btn.getAttribute('data-id'))
    const song = app.songs.find(s => s.id === songId)
    app.playerView.playSong(song)
  }

  const render = songs => {
    el.innerHTML = ''
    songs.forEach(song => {
      const row = document.createElement('tr')
      row.classList.add('song-row')
      row.innerHTML = songTemplate(song)
      el.appendChild(row)
    })
  }

  const songTemplate = song => {
    return `
      <td>
        <div class="flex-vertical-center">
          <div class="play-song" data-id="${song.id}">
            <div class="play-triangle"></div>
          </div>
          <span class="margin-left-sm">${song.title.substring(0, 40)}</span>
        </div>
      </td>
      <td class="artist-name">${(song.artist || '').substring(0, 40)}</td>
    `
  }

  el.addEventListener('click', playButtonListener)

  return { render }
})()
