app.songs = [
  "3 Doors Down|Kryptonite",
  "Avril Lavigne|Complicated",
].map((str, index) => {
  const [artist, title, filename] = str.split('|')
  return {
    artist,
    title,
    id: index,
    file_id: filename || `${title}.mp3`
  }
})
