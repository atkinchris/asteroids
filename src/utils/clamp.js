const clamp = ({ width, height }) => (entity) => {
  const { position, width: eW, height: eH } = entity

  if (position.x > width + eW) position.x = 0
  if (position.x < -eW) position.x = width
  if (position.y > height + eH) position.y = 0
  if (position.y < -eH) position.y = height
}

export default clamp
