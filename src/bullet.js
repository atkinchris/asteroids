import { Graphics } from 'pixi.js'

import Vector from './utils/vector'
import { COLOUR_WHITE } from './constants'

class Bullet extends Graphics {
  constructor() {
    super()

    this.speed = 7
    this.alive = false
    this.beginFill(COLOUR_WHITE)
    this.drawEllipse(0, 0, 3, 3)
    this.endFill()
  }

  respawn(x, y, direction) {
    this.alive = true

    this.life = 1000
    this.x = x
    this.y = y
    this.velocity = new Vector(0, -this.speed)
    this.velocity.setDirection(direction)
  }

  kill() {
    this.alive = false
  }

  update(delta) {
    if (!this.alive) {
      this.visible = false
      return
    }

    if (this.life > 0) {
      this.life -= delta
    }

    if (this.life <= 0) {
      this.alive = false
    }

    this.visible = true
    this.x += this.velocity.x * delta
    this.y += this.velocity.y * delta
  }
}

export default Bullet
