import { useFetcher } from 'remix'
import { motion } from 'framer-motion'

import { Input } from '~/components/input'

interface ConvertKitInputFormProps {
  formId: string
}

export const ConvertKitInputForm = ({ formId }: ConvertKitInputFormProps) => {
  const convertKit = useFetcher()
  const state: 'idle' | 'success' | 'error' | 'submitting' =
    convertKit.submission
      ? 'submitting'
      : convertKit.data?.error
      ? 'error'
      : convertKit.data?.subscription
      ? 'success'
      : 'idle'

  return (
    <convertKit.Form
      method="post"
      action="/api/convert-kit"
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
        autoComplete="false"
        leftContent={
          <button
            type="submit"
            className="bg-accent text-white text-sm py-1 px-2 rounded-xl border border-accent hover:bg-transparent hover:text-accent transition-colors whitespace-nowrap"
          >
            sign up
          </button>
        }
      />
    </convertKit.Form>
  )
}
