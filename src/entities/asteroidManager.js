import { Container } from 'pixi.js'

import Asteroid from './asteroid'

class AsteroidManager extends Container {
  constructor(width, height) {
    super()

    this.bounds = { width, height }
    this.maxAsteroids = 5
    this.asteroids = []

    this.timer = 0
    this.spawnTime = 300
  }

  clamp({ position }) {
    const { width, height } = this.bounds

    if (position.x > width) position.x = 0
    if (position.x < 0) position.x = width
    if (position.y > height) position.y = 0
    if (position.y < 0) position.y = height
  }

  collides(bullet) {
    this.asteroids.forEach((asteroid) => {
      if (asteroid.collides(bullet)) {
        asteroid.kill()
        bullet.kill()
      }
    })
  }

  update(delta) {
    const { asteroids } = this

    asteroids.forEach((asteroid, index) => {
      if (!asteroid.alive) {
        asteroids.splice(index, 1)
      }

      asteroid.update(delta)
      this.clamp(asteroid)
    })

    if (this.timer > 0) {
      this.timer -= delta
    }

    if (this.timer <= 0 && asteroids.length < this.maxAsteroids) {
      this.timer = this.spawnTime
      const { width, height } = this.bounds
      const asteroid = new Asteroid(width, height)
      this.addChild(asteroid)
      asteroids.push(asteroid)
    } else {
      this.timer -= delta
    }
  }
}

export default AsteroidManager
