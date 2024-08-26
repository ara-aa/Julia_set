import { HEIGHT, THRESHOLD, WIDTH, cMaps } from '@/constants'
import * as math from 'mathjs'
import { getRows } from './getRows'

const calc = (
  count: number,
  min: number,
  max: number,
  size: number
): number | bigint | math.MathType => {
  const subtraction = math.subtract(max, min)
  const multiplied = math.multiply(count, subtraction)
  const division = math.divide(multiplied, size)

  return math.add(min, division)
}

// x ^ 2
const squared = (num: math.MathType) => {
  return math.pow(num, 2)
}

export const calcJuliaSet = (
  min_x: number,
  max_x: number,
  min_y: number,
  max_y: number,
  comp_a: number,
  comp_b: number
): string[][] => {
  const rows = getRows()

  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
      let x = calc(i, min_x, max_x, WIDTH)
      let y = calc(j, min_y, max_y, HEIGHT)

      for (let k = 1; k <= THRESHOLD; k++) {
        const xx = math.add(math.subtract(squared(x), squared(y)), comp_a)
        const yy = math.add(math.multiply(2, x, y), comp_b)

        if (math.larger(math.add(squared(xx), squared(yy)), 4.0)) {
          rows[i][j] = cMaps[k]
          break
        }

        x = xx
        y = yy
      }
    }
  }
  return rows
}
