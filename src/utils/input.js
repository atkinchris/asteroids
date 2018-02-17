const bindKeys = () => {
  const controls = {
    down: false,
    up: false,
    left: false,
    right: false,
    // fire: false,
  }

  const handleKey = (event, pressed) => {
    const { key } = event

    switch (key) {
      case 'ArrowDown':
      case 's':
        controls.down = pressed
        break
      case 'ArrowUp':
      case 'w':
        controls.up = pressed
        break
      case 'ArrowLeft':
      case 'a':
        controls.left = pressed
        break
      case 'ArrowRight':
      case 'd':
        controls.right = pressed
        break
      default:
        break
    }
  }

  document.addEventListener('keydown', e => handleKey(e, true))
  document.addEventListener('keyup', e => handleKey(e, false))

  return () => controls
}

export default bindKeys
