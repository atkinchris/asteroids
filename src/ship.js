class Ship {
  constructor(p) {
    this.pos = p.createVector(p.width / 2, p.height / 2)
    this.r = 20
    this.heading = 0
    this.rotation = 0
    this.vel = p.createVector(0, 0)
    this.isBoosting = false
    this.p = p
  }

  boosting(isBoosting) {
    this.isBoosting = isBoosting
  }

  update() {
    if (this.isBoosting) {
      this.boost()
    }

    this.pos.add(this.vel)
    this.vel.mult(0.99)
  }

  boost() {
    const force = p5.Vector.fromAngle(this.heading)
    force.mult(0.1)
    this.vel.add(force)
  }

  hits(asteroid) {
    const d = this.p.dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y)

    return d < this.r + asteroid.r
  }

  render() {
    this.p.push()
    this.p.translate(this.pos.x, this.pos.y)
    this.p.rotate(this.heading + this.p.HALF_PI)
    this.p.fill(0)
    this.p.stroke(255)
    this.p.triangle(-this.r, this.r, this.r, this.r, 0, -this.r)
    this.p.pop()
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

  setRotation(a) {
    this.rotation = a
  }

  turn() {
    this.heading += this.rotation
  }
}

export default Ship
