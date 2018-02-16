import { Application } from 'pixi.js'

import Ship from './ship'

const width = window.innerWidth
const height = window.innerHeight

const app = new Application(width, height, { antialias: true })
document.body.appendChild(app.view)

const ship = new Ship(width / 2, height / 2)

app.stage.addChild(ship)

app.ticker.add((delta) => {
  ship.update(delta)

  if (ship.y < 0) ship.y = app.stage.height
})
