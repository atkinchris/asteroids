const setHasOverlay = (visible) => {
  const { classList } = document.getElementById('container')
  const className = 'has-overlay'

  if (visible) {
    return classList.add(className)
  }

  return classList.remove(className)
}

export default setHasOverlay
