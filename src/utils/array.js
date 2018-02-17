/* eslint-disable import/prefer-default-export */

const arrayOf = (count, constructor) =>
  [...Array(count)].map((_, index) => new constructor(index))

export {
  arrayOf,
}
