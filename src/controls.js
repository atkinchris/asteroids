const registerControls = ({ start, stop }) => {
  const playButton = document.getElementById('play-button')
  const stopButton = document.getElementById('stop-button')

  playButton.onclick = ({ srcElement }) => {
    if (srcElement && srcElement.blur) srcElement.blur()
    start()
  }

  stopButton.onclick = ({ srcElement }) => {
    if (srcElement && srcElement.blur) srcElement.blur()
    stop()
  }
}

export default registerControls
