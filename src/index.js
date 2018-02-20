import { Application } from 'pixi.js'

import { ScoreManager, Ship, AsteroidManager, BulletManager } from './entities'
import { setHasOverlay, clamp } from './utils'
import registerControls from './controls'

import './styles'

const width = window.innerWidth
const height = window.innerHeight
const score = new ScoreManager()
const app = new Application(width, height, { antialias: true })
document.querySelector('.canvas').appendChild(app.view)

const asteroids = new AsteroidManager(width, height)
const bullets = new BulletManager(width, height)
const ship = new Ship(width / 2, height / 2)

app.stage.addChild(bullets)
app.stage.addChild(asteroids)
app.stage.addChild(ship)

const start = () => {
  if (app.isRunning) return
  app.isRunning = true

  setHasOverlay(false)
  asteroids.reset()
  bullets.reset()
  score.reset()
  ship.respawn()
  app.start()
}

const stop = () => {
  if (!app.isRunning) return
  app.isRunning = false
  app.stop()
  setHasOverlay(true)
}

bullets.asteroids = asteroids
ship.bulletManager = bullets
ship.onKill = stop
asteroids.onKill = () => score.add(10)
registerControls({ start, stop })

app.ticker.add((delta) => {
  ship.update(delta)
  clamp({ width, height })(ship)

  bullets.update(delta)
  asteroids.update(delta)
  asteroids.collides(ship)

  score.update()
})

stop()
