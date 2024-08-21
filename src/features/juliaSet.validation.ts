import * as yup from 'yup'
import { COMP_CONST, MAX_X, MAX_Y, MIN_X, MIN_Y } from './julia.constants'

const REQUIRED = '必須入力項目です。'

export const schema = yup.object().shape({
  min_x: yup.number().label(MIN_X).required(REQUIRED),
  max_x: yup.number().label(MAX_X).required(REQUIRED),
  min_y: yup.number().label(MIN_Y).required(REQUIRED),
  max_y: yup.number().label(MAX_Y).required(REQUIRED),
  comp_const_a: yup.number().label(`${COMP_CONST}_a`).required(REQUIRED),
  comp_const_b: yup.number().label(`${COMP_CONST}_b`).required(REQUIRED),
  // 実数(半角スペース)虚数i の形で入力してください。
})

export type SchemaType = yup.InferType<typeof schema>
