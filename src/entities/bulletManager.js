import { Container } from 'pixi.js'

import { arrayOf, clamp } from '../utils'
import Bullet from './bullet'

class BulletManager extends Container {
  constructor(width, height, asteroids) {
    super()

    this.asteroids = asteroids
    this.bounds = { width, height }
    this.clamp = clamp(this.bounds)
    this.bullets = arrayOf(10, () => new Bullet(width))

    this.bullets.forEach(bullet => this.addChild(bullet))
  }

  reset() {
    this.bullets.forEach(bullet => bullet.kill())
  }

  spawnBullet(x, y, direction) {
    const bullet = this.bullets.shift()
    bullet.respawn(x, y, direction)
    this.bullets.push(bullet)
  }

  update(delta) {
    this.bullets.filter(b => b.alive).forEach((bullet) => {
      bullet.update(delta)
      this.clamp(bullet)
      this.asteroids.collides(bullet)
    })
  }
}

export default BulletManager
