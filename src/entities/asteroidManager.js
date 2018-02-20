import { Container } from 'pixi.js'

import { between } from '../utils'
import Asteroid from './asteroid'

class AsteroidManager extends Container {
  constructor(width, height) {
    super()

    this.bounds = { width, height }
    this.maxAsteroids = 20
    this.asteroids = []

    this.timer = 0
    this.spawnTime = 200

    this.sizes = [32, 24, 16]
  }

  clamp({ position }) {
    const { width, height } = this.bounds

    if (position.x > width) position.x = 0
    if (position.x < 0) position.x = width
    if (position.y > height) position.y = 0
    if (position.y < 0) position.y = height
  }

  collides(entity) {
    this.asteroids.forEach((asteroid) => {
      if (asteroid.collides(entity)) {
        asteroid.kill()
        entity.kill()
      }
    })
  }

  spawnNew() {
    const { width, height } = this.bounds
    const rotation = between(0, Math.PI)
    const x = this.rotation < Math.PI / 2 ? 0 : width
    const y = between(0, height)
    const radius = this.sizes[0]

    this.spawn(x, y, rotation, radius, 0)
  }

  spawnChild(parent, generation) {
    const { x, y, rotation } = parent

    const nextGeneration = generation + 1

    if (!this.sizes[nextGeneration]) return

    this.spawn(x, y, rotation + 90, this.sizes[nextGeneration], nextGeneration)
    this.spawn(x, y, rotation - 90, this.sizes[nextGeneration], nextGeneration)
  }

  spawn(x, y, rotation, radius, generation) {
    const asteroid = new Asteroid(x, y, rotation, radius)
    asteroid.onKill = () => {
      this.spawnChild(asteroid, generation)
      this.onKill()
    }
    this.addChild(asteroid)
    this.asteroids.push(asteroid)
  }

  reset() {
    this.asteroids.forEach(asteroid => asteroid.destroy())
    this.asteroids = []
  }

  update(delta) {
    const { asteroids } = this

    asteroids.forEach((asteroid, index) => {
      if (!asteroid.alive) {
        asteroid.destroy()
        asteroids.splice(index, 1)
        return
      }

      asteroid.update(delta)
      this.clamp(asteroid)
    })

    if (this.timer > 0) {
      this.timer -= delta
    }

    if (this.timer <= 0 && asteroids.length < this.maxAsteroids) {
      this.timer = this.spawnTime
      this.spawnNew()
    } else {
      this.timer -= delta
    }
  }
}

export default AsteroidManager
