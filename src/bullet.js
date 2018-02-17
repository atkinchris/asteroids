import { Graphics, Point } from 'pixi.js'

import { COLOUR_WHITE } from './constants'

class Bullet extends Graphics {
  constructor(x, y) {
    super()

    this.x = x
    this.y = y

    this.beginFill(COLOUR_WHITE)
    this.drawEllipse(0, 0, 2, 2)
    this.endFill()
  }
}

export default Bullet
