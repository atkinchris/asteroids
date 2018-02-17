import { Application } from 'pixi.js'

import Bullet from './bullet'
import Ship from './ship'
import Link from './link'

const width = window.innerWidth
const height = window.innerHeight
const app = new Application(width, height, { antialias: true })
document.body.appendChild(app.view)

const bullets = [...Array(10)].map(() => new Bullet(10, 10))

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

  bullets.forEach((bullet) => {
    bullet.update(delta)
    confine(bullet)
  })
})
