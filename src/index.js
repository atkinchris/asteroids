import { Application } from 'pixi.js'

import { Ship, AsteroidManager, BulletManager } from './entities'
import { setHasOverlay, clamp } from './utils'
import registerControls from './controls'

import './styles'

const width = window.innerWidth
const height = window.innerHeight
const app = new Application(width, height, { antialias: true })
document.querySelector('.canvas').appendChild(app.view)

const asteroids = new AsteroidManager(width, height)
const bullets = new BulletManager(width, height)
const ship = new Ship(width / 2, height / 2)

app.stage.addChild(bullets)
app.stage.addChild(asteroids)
app.stage.addChild(ship)

const start = () => {
  setHasOverlay(false)
  ship.respawn()
  app.start()
}

const stop = () => {
  app.stop()
  setHasOverlay(true)
}

bullets.asteroids = asteroids
ship.bulletManager = bullets
ship.onKill = stop
registerControls({ start, stop })

app.ticker.add((delta) => {
  ship.update(delta)
  clamp({ width, height })(ship)

  bullets.update(delta)
  asteroids.update(delta)
  asteroids.collides(ship)
})

stop()
