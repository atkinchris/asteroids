import { Application } from 'pixi.js'

import Ship from './ship'
import Link from './link'

const width = window.innerWidth
const height = window.innerHeight

const app = new Application(width, height, { antialias: true })
document.body.appendChild(app.view)

const ship = new Ship(width / 2, height / 2)
const link = new Link(width, height)

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
})
