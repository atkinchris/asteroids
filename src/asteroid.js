import { Graphics, Point } from 'pixi.js'

import Vector from './utils/vector'
import { COLOUR_WHITE } from './constants'
import { between } from './utils/random'

class Asteroid extends Graphics {
  constructor() {
    super()

    this.alive = false
    this.maxSpeed = 2
    this.lineStyle(2, COLOUR_WHITE, 1)
    this.drawEllipse(0, 0, 12, 12)

    this.pivot = new Point(6, 6)
  }

  respawn(width, height) {
    this.alive = true

    this.x = between(0, width)
    this.y = between(0, height)
    this.rotation = between(0, Math.PI)

    this.velocity = new Vector(0, -this.maxSpeed)
    this.velocity.setDirection(this.rotation)
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
