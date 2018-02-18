import { Graphics } from 'pixi.js'

import { Vector } from '../utils'
import { COLOUR_WHITE } from '../constants'

class Bullet extends Graphics {
  constructor(width) {
    super()

    this.maxSpeed = 10
    this.maxLife = width / this.maxSpeed
    this.beginFill(COLOUR_WHITE)
    this.drawEllipse(0, 0, 3, 3)
    this.endFill()

    this.kill()
  }

  respawn(x, y, direction) {
    this.alive = true
    this.visible = true

    this.life = this.maxLife
    this.x = x
    this.y = y
    this.velocity = new Vector(0, -this.maxSpeed)
    this.velocity.setDirection(direction)
  }

  kill() {
    this.alive = false
    this.visible = false
  }

  update(delta) {
    if (!this.alive) return

    if (this.life > 0) {
      this.life -= delta
    }

    if (this.life <= 0) {
      this.kill()
    }

    this.x += this.velocity.x * delta
    this.y += this.velocity.y * delta
  }
}

export default Bullet
