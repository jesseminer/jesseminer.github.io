app.songs = [
  "2Pac|California Love",
  "2Pac|Life Goes On",
  "2Pac|Until the End of Time",
  "3 Doors Down|Kryptonite",
  "Avril Lavigne|Complicated",
  "Childish Gambino|Lights Turned On",
  "Chris Webby|Webster's Laboratory",
  "Fleetwood Mac|Go Your Own Way",
  "Guns N' Roses|Welcome To The Jungle|Welcome To The Jungle.m4a",
  "Nas|New York State of Mind",
  "Red Hot Chili Peppers|Desecration Smile",
  "Red Hot Chili Peppers|Minor Thing",
  "Snow Patrol|It's Beginning to Get to Me",
  "Snow Patrol|Shut Your Eyes",
  "Snow Patrol|You Could Be Happy",
  "Snow Patrol|You're All I Have",
].map((str, index) => {
  const [artist, title, filename] = str.split('|')
  return {
    artist,
    title,
    id: index,
    file_id: filename || `${title}.mp3`
  }
})
