import { between } from './random'

const TWO_PI = Math.PI * 2

const flatten = points => points.reduce((out, p) => [...out, p.x, p.y], [])

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

const dPolygon = (x, y, radius, nsides) => {
  const points = rPolygon(x, y, radius, nsides)
  const angle = TWO_PI / nsides
  const dentedIndex = between(1, points.length - 2)

  points.splice(dentedIndex, 0, {
    x: x + (Math.cos(angle * dentedIndex) * (radius / 2)),
    y: y + (Math.sin(angle * dentedIndex) * (radius / 2)),
  })

  return points
}

const rPolygonFlat = (...args) => flatten(rPolygon(...args))
const dPolygonFlat = (...args) => flatten(dPolygon(...args))

export {
  rPolygon,
  rPolygonFlat,
  dPolygon,
  dPolygonFlat,
}
