import { HEIGHT, WIDTH } from '@/constants'

export const getRows = (): string[][] => {
  const rows: string[][] = []
  for (let i = 0; i < WIDTH; i++) {
    rows[i] = []
    for (let j = 0; j < HEIGHT; j++) {
      rows[i][j] = '#000'
    }
  }
  return rows
}
