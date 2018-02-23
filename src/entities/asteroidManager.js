import { Container } from 'pixi.js'

import { between, clamp } from '../utils'
import Asteroid from './asteroid'

class AsteroidManager extends Container {
  constructor(width, height, viewport) {
    super()

    this.parent = viewport
    this.bounds = { width, height }
    this.maxAsteroids = 500
    this.initialAsteroids = 20
    this.asteroids = []

    this.timer = 200
    this.spawnTime = 10
    this.clamp = clamp(this.bounds)

    this.sizes = [32, 24, 16]

    this.reset()
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
    const x = Math.random() > 0.5
      ? between(0, this.parent.left)
      : between(this.parent.right, width)
    const y = Math.random() > 0.5
      ? between(0, this.parent.top)
      : between(this.parent.bottom, height)
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

    for (let i = 0; i < this.initialAsteroids; i += 1) {
      this.spawnNew()
    }
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
