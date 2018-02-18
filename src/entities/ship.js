import { Graphics } from 'pixi.js'

import { bindKeys, Vector } from '../utils'
import { COLOUR_ORANGE, COLOUR_BLACK } from '../constants'

export const vertices = [
  0, 0,
  -33, 15,
  -30, 5,
  -50, 5,
  -50, -5,
  -30, -5,
  -33, -15,
  0, 0,
]

class Ship extends Graphics {
  constructor(x, y, spawnBullet) {
    super()

    this.getKeys = bindKeys()

    this.spawnBullet = spawnBullet
    this.x = x
    this.y = y
    this.velocity = new Vector()
    this.acceleration = 0.5
    this.maxSpeed = 5
    this.turningSpeed = 0.075
    this.breakingSpeed = 0.1
    this.bulletTimer = 0

    this.rotation = Math.PI * 1.3

    this.beginFill(COLOUR_BLACK)
    this.lineStyle(2, COLOUR_ORANGE, 1)
    this.drawPolygon(vertices)
    this.endFill()
  }

  updateMovement(delta, keys) {
    if (keys.left) {
      this.rotation -= this.turningSpeed * delta
    } else if (keys.right) {
      this.rotation += this.turningSpeed * delta
    }

    const rotatedAccel = new Vector(-this.acceleration)
    rotatedAccel.setDirection(this.rotation)

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
    if (keys.fire && !this.isFiring) {
      this.spawnBullet(this.x, this.y, this.rotation)
      this.isFiring = true
    }

    if (!keys.fire) {
      this.isFiring = false
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
