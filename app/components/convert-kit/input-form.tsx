import { useEffect, useRef } from 'react'
import { useFetcher } from 'remix'
import { motion } from 'framer-motion'

import { ConvertKitSubscriptionResponse } from '~/types'

import { Input } from '~/components/input'

interface ConvertKitInputFormProps {
  formId: string
}

export const ConvertKitInputForm = ({ formId }: ConvertKitInputFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const convertKit = useFetcher<ConvertKitSubscriptionResponse>()

  const state: 'idle' | 'success' | 'error' | 'submitting' =
    (!convertKit.data || convertKit.data?.status === 'error') &&
    convertKit.submission
      ? 'submitting'
      : convertKit.data?.status === 'error'
      ? 'error'
      : convertKit.data?.status === 'success'
      ? 'success'
      : 'idle'

  useEffect(() => {
    if (state === 'error') {
      inputRef.current?.focus()
    }
  }, [state])

  return (
    <convertKit.Form
      method="post"
      action="/action/convert-kit"
      className="relative"
    >
      <input type="hidden" value={formId} name="formId" />
      {state === 'success' && (
        <motion.div
          animate={{ scale: 1, opacity: 1 }}
          initial={{ scale: 0, opacity: 0 }}
          className="absolute z-10 left-0 right-0 bottom-0 top-0 border border-green-600 rounded-xl bg-green-600 text-white font-bold select-none flex justify-center items-center text-sm sm:text-base"
        >
          Success, check your e-mail!
        </motion.div>
      )}
      <Input
        name="email"
        placeholder="E-mail"
        type="email"
        ref={inputRef}
        autoComplete="off"
        disabled={state === 'submitting' || state === 'success'}
        errorMessage={convertKit.data?.error}
        leftContent={
          <button
            type="submit"
            disabled={state === 'submitting' || state === 'success'}
            className="bg-accent text-white text-sm py-1 px-2 rounded-xl border border-accent hover:bg-transparent hover:text-accent transition-colors whitespace-nowrap disabled:bg-gray-300 disabled:hover:text-gray-500 disabled:text-gray-500 disabled:border-gray-300"
          >
            {state === 'submitting' ? 'submitting' : 'sign up'}
          </button>
        }
      />
    </convertKit.Form>
  )
}
