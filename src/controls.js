const registerControls = ({ start, stop }) => {
  const playButton = document.getElementById('play-button')
  const stopButton = document.getElementById('stop-button')

  playButton.onclick = () => start()
  stopButton.onclick = () => stop()
}

export default registerControls
