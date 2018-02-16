class Asteroid {
  constructor(p) {
    this.p = p
    this.pos = p.createVector(p.random(p.width), p.random(p.height))
    this.vel = p5.Vector.random2D()
    this.r = p.random(7, 50)
    this.total = p.floor(p.random(5, 15))
    this.offset = []
    for (let i = 0; i < this.total; i += 1) {
      this.offset[i] = p.random(-10, 10)
    }
  }

  update() {
    this.pos.add(this.vel)
  }

  render() {
    const { p } = this

    p.push()
    p.noFill()
    p.stroke(255)
    p.translate(this.pos.x, this.pos.y)

    p.beginShape()
    for (let i = 0; i < this.total; i += 1) {
      const angle = p.map(i, 0, this.total, 0, p.TWO_PI)
      const r = this.r + this.offset[i]
      const x = r * p.cos(angle)
      const y = r * p.sin(angle)
      p.vertex(x, y)
    }
    p.endShape(p.CLOSE)
    p.pop()
  }

  edges() {
    if (this.pos.x > this.p.width + this.r) {
      this.pos.x = -this.r
    } else if (this.pos.x < -this.r) {
      this.pos.x = this.p.width + this.r
    }
    if (this.pos.y > this.p.height + this.r) {
      this.pos.y = -this.r
    } else if (this.pos.y < -this.r) {
      this.pos.y = this.p.height + this.r
    }
  }
}

export default Asteroid
