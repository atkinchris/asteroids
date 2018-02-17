import { Container, Graphics, Point, Text } from 'pixi.js'

import { COLOUR_ORANGE, COLOUR_WHITE } from './constants'
import { vertices } from './ship'
import Link from './link'

const tagline = 'Develop the\nfuture of\ngroceries'

class Splash extends Container {
  constructor(width, height) {
    super()

    const scaleBase = Math.min(width, height) / 200

    const background = new Graphics()
    background.beginFill(COLOUR_ORANGE)
    background.drawRect(0, 0, width, height)
    background.endFill()

    const cursor = new Graphics()
    cursor.beginFill(COLOUR_WHITE)
    cursor.drawPolygon(vertices)
    cursor.endFill()
    cursor.rotation = Math.PI * 1.3
    cursor.scale = new Point(scaleBase, scaleBase)
    cursor.x = width * 0.65
    cursor.y = (height * 0.5) - (cursor.height * 0.5)

    const text = new Text(tagline, {
      fontFamily: 'MaryAnn-Regular',
      fontSize: 20 * scaleBase,
      fill: COLOUR_WHITE,
      align: 'right',
    })
    text.x = (width * 0.55) - (text.width)
    text.y = (height * 0.5) - (text.height * 0.5)

    const link = new Link(width, height, COLOUR_WHITE)

    this.addChild(background)
    this.addChild(cursor)
    this.addChild(text)
    this.addChild(link)
  }
}

export default Splash
