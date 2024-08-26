import { COMP_CONST, MAX_X, MAX_Y, MIN_X, MIN_Y } from '@/constants'
import * as math from 'mathjs'
import * as yup from 'yup'

const REQUIRED = '必須入力項目です。'
const NUM_REGEX = /^-?(\d|\d+|\d+\.\d+)?$/

export const schema = yup.object().shape({
  min_x: yup
    .string()
    .label(MIN_X)
    .required(REQUIRED)
    .matches(NUM_REGEX, '数値を入力してください'),
  max_x: yup
    .string()
    .label(MAX_X)
    .required(REQUIRED)
    .matches(NUM_REGEX, '数値を入力してください'),
  min_y: yup
    .string()
    .label(MIN_Y)
    .required(REQUIRED)
    .matches(NUM_REGEX, '数値を入力してください'),
  max_y: yup
    .string()
    .label(MAX_Y)
    .required(REQUIRED)
    .matches(NUM_REGEX, '数値を入力してください'),
  comp_const_a: yup
    .string()
    .label(`${COMP_CONST}_a`)
    .required(REQUIRED)
    .matches(NUM_REGEX, '数値を入力してください')
    .test(
      'custom',
      '複素定数が2より大きいため描画できません。',
      function (comp_a) {
        if (
          math.larger(
            math.add(Number(comp_a), Number(this.parent.comp_const_b)),
            2
          )
        ) {
          return false
        }
        return true
      }
    ),
  comp_const_b: yup
    .string()
    .label(`${COMP_CONST}_b`)
    .required(REQUIRED)
    .matches(NUM_REGEX, '数値を入力してください')
    .test(
      'custom',
      '複素定数が2より大きいため描画できません。',
      function (comp_b) {
        if (
          math.larger(
            math.add(Number(this.parent.comp_const_a), Number(comp_b)),
            2
          )
        ) {
          return false
        }
        return true
      }
    )
})

export type SchemaType = yup.InferType<typeof schema>

export const defaultValues = {
  min_x: '',
  max_x: '',
  min_y: '',
  max_y: '',
  comp_const_a: '',
  comp_const_b: ''
}
