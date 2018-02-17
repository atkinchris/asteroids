import { Application } from 'pixi.js'

import Bullet from './bullet'
import Ship from './ship'
import Link from './link'
import AsteroidManager from './asteroidManager'
import { arrayOf } from './utils/array'

const width = window.innerWidth
const height = window.innerHeight
const app = new Application(width, height, { antialias: true })
document.body.appendChild(app.view)

const bullets = arrayOf(10, () => new Bullet(width))
const spawnBullet = (x, y, direction) => {
  const bullet = bullets.shift()
  bullet.respawn(x, y, direction)
  bullets.push(bullet)
}

const ship = new Ship(width / 2, height / 2, spawnBullet)
const link = new Link(width, height)
const asteroids = new AsteroidManager(width, height)

bullets.forEach(bullet => app.stage.addChild(bullet))
app.stage.addChild(asteroids)
app.stage.addChild(ship)
app.stage.addChild(link)

const clamp = ({ position }) => {
  if (position.x > width) position.x = 0
  if (position.x < 0) position.x = width
  if (position.y > height) position.y = 0
  if (position.y < 0) position.y = height
}

app.ticker.add((delta) => {
  ship.update(delta)
  clamp(ship)

  bullets.filter(b => b.alive).forEach((bullet) => {
    bullet.update(delta)
    clamp(bullet)
    asteroids.collides(bullet)
  })

  asteroids.update(delta)
})
