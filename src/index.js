import Ship from './ship'
import Asteroid from './asteroid'

const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = window.innerWidth
  const height = window.innerHeight

  const ship = new Ship(p)
  let asteroids = []
  const lasers = []

  p.setup = () => {
    p.createCanvas(width, height)

    for (let i = 0; i < 5; i += 1) {
      asteroids.push(new Asteroid(p))
    }
  }

  p.draw = () => {
    p.background(0)

    for (let i = 0; i < asteroids.length; i += 1) {
      if (ship.hits(asteroids[i])) {
        console.log('ooops!')
      }

      asteroids[i].render()
      asteroids[i].update()
      asteroids[i].edges()
    }

    for (let i = lasers.length - 1; i >= 0; i -= 1) {
      lasers[i].render()
      lasers[i].update()
      if (lasers[i].offscreen()) {
        lasers.splice(i, 1)
      } else {
        for (let j = asteroids.length - 1; j >= 0; j -= 1) {
          if (lasers[i].hits(asteroids[j])) {
            if (asteroids[j].r > 10) {
              const newAsteroids = asteroids[j].breakup()
              asteroids = asteroids.concat(newAsteroids)
            }
            asteroids.splice(j, 1)
            lasers.splice(i, 1)
            break
          }
        }
      }
    }

    ship.render()
    ship.turn()
    ship.update()
    ship.edges()
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
