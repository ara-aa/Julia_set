import { height, width } from '@/constants'

export const getRows = (): string[][] => {
  const rows: string[][] = []
  for (let i = 0; i < width; i++) {
    rows[i] = []
    for (let j = 0; j < height; j++) {
      rows[i][j] = '#000'
    }
  }
  return rows
}
