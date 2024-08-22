import { useContext, useEffect, useState } from 'react'
import { height, initParams, width } from '../../../src/constants/const'
import type { ErrorMessageType, InputParamType } from '../../types/type'
import { Loading } from '../components/Loading'
import { ToastContext } from '../components/ToastProvider'
import { Form } from './Form'
import PreviewJulia from './PreviewJulia'

export default function JuliaSet(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)
  const [params, setParams] = useState<InputParamType>(initParams)
  const [messages, setMessages] = useState<ErrorMessageType>(initParams)
  const [juliaRows, setJuliaRows] = useState<number[][]>([])
  const [png, setPng] = useState<string | null>(null)
  const showToast = useContext(ToastContext)

  const openToast = (msg: string) => {
    showToast && showToast(msg)
  }

  const checkRequired = (): boolean => {
    let canSubmit = true
    for (const [key, value] of Object.entries(params)) {
      if (value === '') {
        canSubmit = false
        setMessages(prevMessages => {
          return { ...prevMessages, [key]: '必須入力です。' }
        })
      }
    }
    return canSubmit
  }

  const onSubmit = async () => {
    const canSubmit = checkRequired()
    if (!canSubmit) {
      return
    }

    setLoading(true)
    await calcJulia()
    setLoading(false)
  }

  const calcJulia = async () => {
    await fetch('/julia', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.rows) {
          setJuliaRows(() => data.rows)
        } else {
          openToast(
            data.errorMessage ? data.errorMessage : 'サーバーエラーです。',
          )
        }
      })
      .catch(error => {
        openToast('エラーが発生しました。')
      })
  }

  useEffect(() => {
    const canvasElem = document.createElement('canvas')
    canvasElem.width = width
    canvasElem.height = height
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

  return (
    <>
      {loading && <Loading />}
      <Form
        onSubmit={onSubmit}
        loading={loading}
        params={params}
        setParams={setParams}
        messages={messages}
        setMessages={setMessages}
      />
      {png && <PreviewJulia png={png} />}
    </>
  )
}
