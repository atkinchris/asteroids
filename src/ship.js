const vertices = [
  { x: 5, y: 3 },
  { x: 15, y: 5 },
  { x: 0, y: -30 },
  { x: -15, y: 5 },
  { x: -5, y: 3 },
  { x: -5, y: 20 },
  { x: 5, y: 20 },
]

class Ship {
  constructor(p) {
    this.p = p

    this.position = p.createVector(p.width / 2, p.height / 2)
    this.rotation = 0
  }

  update() {
    const { p, position } = this
    const mouseAngle = Math.atan2(
      p.mouseY - position.y,
      p.mouseX - position.x,
    )

    this.rotation = mouseAngle + p.HALF_PI
  }

  draw() {
    const { p, position, rotation } = this

    p.push()
    p.translate(position.x, position.y)
    p.rotate(rotation)
    p.fill('black')
    p.stroke('#ff9900')

    p.beginShape()
    vertices.forEach(v => p.vertex(v.x, v.y))
    p.endShape(p.CLOSE)

    if (p.mouseIsPressed) {
      p.line(0, -30, 0, -200)
    }

    p.pop()
  }
}

export default Ship
