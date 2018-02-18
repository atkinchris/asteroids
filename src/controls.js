import { setHasOverlay } from './utils'

const registerControls = ({ start, stop }) => {
  const playButton = document.getElementById('play-button')
  const stopButton = document.getElementById('stop-button')

  playButton.onclick = () => {
    setHasOverlay(false)
    start()
  }

  stopButton.onclick = () => {
    stop()
    setHasOverlay(true)
  }
}

export default registerControls
