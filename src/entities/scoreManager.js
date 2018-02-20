const scoreElement = document.getElementById('score')

class ScoreManager {
  constructor() {
    this.score = 0
  }

  update() {
    scoreElement.innerText = this.score
  }

  get() {
    return this.score
  }

  reset() {
    this.score = 0
  }

  add(value) {
    this.score += value
  }
}

export default ScoreManager
