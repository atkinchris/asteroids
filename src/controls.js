import { setHasOverlay } from './utils'

const registerControls = ({ start }) => {
  const playButton = document.querySelector('.play-button')

  playButton.onclick = () => {
    setHasOverlay(false)
    start()
  }
}

export default registerControls
