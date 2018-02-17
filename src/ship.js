import { Graphics, Point } from 'pixi.js'

import { COLOUR_ORANGE } from './constants'
import bindKeys from './utils/input'
import Vector from './utils/vector'
import Bullet from './bullet'

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
  constructor(x, y, stage) {
    super()

    this.getKeys = bindKeys()

    this.stage = stage
    this.x = x
    this.y = y
    this.velocity = new Vector()
    this.acceleration = 0.5
    this.maxSpeed = 4
    this.turningSpeed = 0.075
    this.breakingSpeed = 0.1

    this.rotation = -0.4

    this.lineStyle(2, COLOUR_ORANGE, 1)
    this.drawPolygon(vertices)
    this.pivot = new Point(0, 25)
  }

  updateMovement(delta, keys) {
    if (keys.left) {
      this.rotation -= this.turningSpeed * delta
    } else if (keys.right) {
      this.rotation += this.turningSpeed * delta
    }

    const rotatedAccel = new Vector(0, -this.acceleration)
    rotatedAccel.setDirection(this.rotation - (Math.PI / 2))

    if (keys.up) {
      this.velocity.add(rotatedAccel)
    }

    if (keys.down) {
      const newMag = this.velocity.getMagnitude() - this.breakingSpeed
      this.velocity.setMagnitude(newMag < this.breakingSpeed ? 0 : newMag)
    }

    if (this.velocity.getMagnitude() > this.maxSpeed) {
      this.velocity.setMagnitude(this.maxSpeed)
    }
  }

  updateAttack(delta, keys) {
    if (keys.fire) {
      const bullet = new Bullet(this.x, this.y)
      this.stage.addChild(bullet)
    }
  }

  update(delta) {
    const keys = this.getKeys()

    this.updateMovement(delta, keys)
    this.updateAttack(delta, keys)

    this.x += this.velocity.x * delta
    this.y += this.velocity.y * delta
  }
}

export default Ship
