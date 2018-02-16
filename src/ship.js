import { Graphics, Point } from 'pixi.js'

import { COLOUR_ORANGE } from './constants'

const vertices = [
  0, 0,
  15, 35,
  5, 33,
  5, 50,
  -5, 50,
  -5, 33,
  -15, 35,
  0, 0,
]

class Ship extends Graphics {
  constructor(x, y) {
    super()

    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0

    this.rotation = -0.4

    this.lineStyle(2, COLOUR_ORANGE, 1)
    this.drawPolygon(vertices)
    this.pivot = new Point(0, 25)
  }

  update(delta) {
    this.x += this.vx * delta
    this.y -= this.vy * delta
  }
}

export default Ship
