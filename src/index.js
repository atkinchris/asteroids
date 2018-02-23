import { Application } from 'pixi.js'
import Viewport from 'pixi-viewport'

import { ScoreManager, Ship, AsteroidManager, BulletManager, StarField } from './entities'
import { setHasOverlay, clamp } from './utils'
import registerControls from './controls'

import './styles'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight
const worldWidth = 3000
const worldHeight = 3000
const score = new ScoreManager()
const app = new Application(screenWidth, screenHeight, { antialias: true })
document.querySelector('.canvas').appendChild(app.view)

const viewport = new Viewport({
  screenWidth,
  screenHeight,
  worldWidth,
  worldHeight,
})
app.stage.addChild(viewport)

const asteroids = new AsteroidManager(worldWidth, worldHeight, viewport)
const bullets = new BulletManager(worldWidth, worldHeight)
const ship = new Ship(worldWidth / 2, worldHeight / 2)
const starField = new StarField(worldWidth, worldHeight)

viewport.addChild(starField)
viewport.addChild(bullets)
viewport.addChild(asteroids)
viewport.addChild(ship)
viewport.follow(ship)

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
  clamp({
    width: worldWidth,
    height: worldHeight,
  })(ship)

  bullets.update(delta)
  asteroids.update(delta)
  asteroids.collides(ship)

  score.update()
})

stop()
