import { Graphics } from 'pixi.js'

import { Vector, dPolygonFlat, between, rPolygonFlat } from '../utils'
import { COLOUR_WHITE } from '../constants'

class Asteroid extends Graphics {
  constructor(x, y, rotation, radius) {
    super()

    this.maxSpeed = 1
    this.alive = true

    this.x = x
    this.y = y
    this.rotation = rotation
    this.radius = radius

    this.velocity = new Vector(0, -this.maxSpeed)
    this.velocity.setDirection(this.rotation)

    const sides = between(6, 9)
    const type = Math.random() > 0.75 ? dPolygonFlat : rPolygonFlat
    const polygon = type(0, 0, this.radius, sides)

    this.lineStyle(2, COLOUR_WHITE, 1)
    this.beginFill('black')
    this.drawPolygon(polygon)
    this.endFill()
  }

  kill() {
    this.onKill(this)
    this.alive = false
    this.visible = false
  }

  distanceSqFrom({ x, y }) {
    const dX = (x - this.x) ** 2
    const dY = (y - this.y) ** 2
    return dX + dY
  }

  collides(entity) {
    const distance = this.distanceSqFrom(entity)

    return distance < (this.radius + entity.radius) ** 2
  }

  update(delta) {
    this.x += this.velocity.x * delta
    this.y += this.velocity.y * delta
  }
}

export default Asteroid
