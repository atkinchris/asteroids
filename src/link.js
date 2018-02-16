import { Text } from 'pixi.js'

import { COLOUR_ORANGE } from './constants'

class Link extends Text {
  constructor(x, y) {
    super('sainsburys.work/dandt', {
      fontFamily: 'MaryAnn-Regular',
      fontSize: 24,
      fill: COLOUR_ORANGE,
      align: 'right',
    })

    this.x = x - this.width - 40
    this.y = y - this.height - 40
  }
}

export default Link
