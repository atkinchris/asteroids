import Ship from './ship'

const canvas = document.querySelector('.container')

const sketch = (p) => {
  const width = window.innerWidth
  const height = window.innerHeight

  let ship

  p.setup = () => {
    p.createCanvas(width, height)
    ship = new Ship(p)
  }

  p.draw = () => {
    p.background('black')
    ship.update()
    ship.draw()
  }
}

new p5(sketch, canvas) // eslint-disable-line no-new
