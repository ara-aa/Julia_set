import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { HEIGHT, WIDTH } from './julia.constants'
import { type SchemaType, schema } from './juliaSet.validation'

export const action = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [juliaRows, setJuliaRows] = useState<number[][]>([])
  const [png, setPng] = useState<string | null>(null)

  const juliaForm = useForm<SchemaType>({
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<SchemaType> = async data => {
    setIsLoading(true)
    await calcJulia(data)
    setIsLoading(false)
  }

  const calcJulia = async (data: SchemaType) => {
    await fetch('/julia', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.rows) {
          setJuliaRows(() => data.rows)
        } else {
          toast(data.errorMessage ? data.errorMessage : 'サーバーエラーです。')
        }
      })
      .catch(_ => {
        toast('エラーが発生しました。')
      })
  }

  useEffect(() => {
    const canvasElem = document.createElement('canvas')
    canvasElem.width = WIDTH
    canvasElem.height = HEIGHT
    const ctx = canvasElem.getContext('2d')
    if (!ctx) return

    juliaRows.forEach((h, i) => {
      h.forEach((w, j) => {
        ctx.fillStyle = `${w}`
        ctx.fillRect(i, j, 1, 1)
      })
    })

    setPng(canvasElem.toDataURL())
  }, [juliaRows])

  return { juliaForm, onSubmit, isLoading, png }
}
