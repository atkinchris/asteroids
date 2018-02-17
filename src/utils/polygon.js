const TWO_PI = Math.PI * 2

const rPolygon = (x, y, radius, nsides) => {
  const points = []
  const angle = TWO_PI / nsides

  for (let a = 0; a < TWO_PI; a += angle) {
    points.push({
      x: x + (Math.cos(a) * radius),
      y: y + (Math.sin(a) * radius),
    })
  }

  points.push(points[0])

  return points
}

const rPolygonFlat = (...args) => rPolygon(...args)
  .reduce((out, p) => [...out, p.x, p.y], [])

export {
  rPolygon,
  rPolygonFlat,
}
