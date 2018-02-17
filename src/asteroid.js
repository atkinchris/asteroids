import { Graphics } from 'pixi.js'

import Vector from './utils/vector'
import { rPolygonFlat } from './utils/polygon'
import { COLOUR_WHITE } from './constants'
import { between } from './utils/random'

class Asteroid extends Graphics {
  constructor() {
    super()

    this.alive = false
    this.maxSpeed = 1
  }

  respawn(width, height) {
    this.alive = true

    this.redraw()

    this.x = between(0, width)
    this.y = between(0, height)
    this.rotation = between(0, Math.PI)

    this.velocity = new Vector(0, -this.maxSpeed)
    this.velocity.setDirection(this.rotation)
  }

  redraw() {
    const sides = between(6, 9)
    const polygon = rPolygonFlat(0, 0, 24, sides)

    this.clear()
    this.lineStyle(2, COLOUR_WHITE, 1)
    this.drawPolygon(polygon)
  }

  update(delta) {
    if (!this.alive) {
      this.visible = false
      return
    }

    this.x += this.velocity.x * delta
    this.y += this.velocity.y * delta
  }
}

export default Asteroid
