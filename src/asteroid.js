import { Graphics } from 'pixi.js'

import Vector from './utils/vector'
import { rPolygonFlat } from './utils/polygon'
import { COLOUR_WHITE } from './constants'
import { between } from './utils/random'

class Asteroid extends Graphics {
  constructor(width, height) {
    super()

    this.radius = 24
    this.maxSpeed = 1
    this.alive = true

    this.rotation = between(0, Math.PI)
    this.x = this.rotation < Math.PI / 2 ? 0 : width
    this.y = between(0, height)

    this.velocity = new Vector(0, -this.maxSpeed)
    this.velocity.setDirection(this.rotation)

    const sides = between(6, 9)
    const polygon = rPolygonFlat(0, 0, this.radius, sides)

    this.lineStyle(2, COLOUR_WHITE, 1)
    this.drawPolygon(polygon)
  }

  kill() {
    this.alive = false
    this.visible = false
  }

  collides({ x, y }) {
    const dX = (x - this.x) ** 2
    const dY = (y - this.y) ** 2
    return Math.sqrt(dX + dY) < this.radius
  }

  update(delta) {
    this.x += this.velocity.x * delta
    this.y += this.velocity.y * delta
  }
}

export default Asteroid
