import { Application } from 'pixi.js'

import Bullet from './bullet'
import Ship from './ship'
import Link from './link'
import Asteroid from './asteroid'
import { arrayOf } from './utils/array'

const maxAsteroids = 5
const width = window.innerWidth
const height = window.innerHeight
const app = new Application(width, height, { antialias: true })
document.body.appendChild(app.view)

const bullets = arrayOf(10, Bullet)
const asteroids = []

const spawnBullet = (x, y, direction) => {
  const bullet = bullets.shift()
  bullet.respawn(x, y, direction)
  bullets.push(bullet)
}

const ship = new Ship(width / 2, height / 2, spawnBullet)
const link = new Link(width, height)

bullets.forEach(bullet => app.stage.addChild(bullet))
app.stage.addChild(ship)
app.stage.addChild(link)

const clamp = ({ position }) => {
  if (position.x > width) position.x = 0
  if (position.x < 0) position.x = width
  if (position.y > height) position.y = 0
  if (position.y < 0) position.y = height
}

const confine = (entity) => {
  if (
    entity.position.x > width ||
    entity.position.x < 0 ||
    entity.position.y > height ||
    entity.position.y < 0
  ) entity.kill()
}

app.ticker.add((delta) => {
  ship.update(delta)
  clamp(ship)

  bullets.filter(b => b.alive).forEach((bullet) => {
    bullet.update(delta)
    confine(bullet)

    asteroids.forEach((asteroid) => {
      if (asteroid.collides(bullet)) {
        asteroid.kill()
        bullet.kill()
      }
    })
  })

  asteroids.forEach((asteroid, index) => {
    if (!asteroid.alive) {
      asteroids.splice(index, 1)
    }

    asteroid.update(delta)
    clamp(asteroid)
  })

  if (asteroids.length < maxAsteroids) {
    const asteroid = new Asteroid(width, height)
    app.stage.addChild(asteroid)
    asteroids.push(asteroid)
  }
})
