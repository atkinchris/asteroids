import { extras, Graphics } from 'pixi.js'

const { TilingSprite } = extras

class StarField extends TilingSprite {
  constructor(width, height) {
    const graphics = new Graphics()
    graphics.beginFill(0xCCCCCC)

    for (let i = 0; i < 15; i += 1) {
      const x = Math.round(Math.random() * 400)
      const y = Math.round(Math.random() * 400)
      graphics.drawCircle(x, y, 1)
    }
    graphics.endFill()

    const texture = graphics.generateCanvasTexture()
    super(texture, width, height)
  }
}

export default StarField
