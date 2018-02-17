class Vector {
  constructor(x = 0, y = 0) {
    this.x = x
    this.y = y
  }

  clone() {
    return new Vector(this.x, this.y)
  }

  add(vector) {
    this.x += vector.x
    this.y += vector.y
    return this
  }

  subtract(vector) {
    this.x -= vector.x
    this.y -= vector.y
    return this
  }

  negative() {
    this.x = -this.x
    this.y = -this.y
    return this
  }

  getDirection() {
    return Math.atan2(this.y, this.x)
  }

  setDirection(angle) {
    const magnitude = this.getMagnitude()
    this.x = Math.cos(angle) * magnitude
    this.y = Math.sin(angle) * magnitude
    return this
  }

  getMagnitude() {
    return Math.sqrt((this.x ** 2) + (this.y ** 2))
  }

  setMagnitude(magnitude) {
    const direction = this.getDirection()
    this.x = Math.cos(direction) * magnitude
    this.y = Math.sin(direction) * magnitude
    return this
  }
}

export default Vector
