import type { ActionFunction } from 'remix'
import { json } from 'remix'

import { ConvertKitSubscriptionResponse } from '~/types'
import { getEnv } from '~/utils/misc'

export const checkAlreadySignedUp = (state: string) => state === 'active'

interface ConvertKitSubscription {
  error?: string
  message?: string
  subscription?: {
    state: string
  }
}

export const createConvertKitAction: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email')
  const formId = formData.get('formId')

  const body = {
    email,
    api_key: getEnv('CK_PUBLIC_API_KEY'),
  }

  const response = await fetch(
    `${getEnv('CK_BASE_URL')}/forms/${formId}/subscribe`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(body),
    },
  )

  const { error, message, subscription } =
    (await response.json()) as ConvertKitSubscription

  if (subscription && checkAlreadySignedUp(subscription?.state)) {
    return json<ConvertKitSubscriptionResponse>(
      { status: 'error', error: 'Already subscribed!' },
      { status: 409 },
    )
  }

  if (error)
    return json<ConvertKitSubscriptionResponse>(
      { status: 'error', error: message },
      { status: 400 },
    )

  return json<ConvertKitSubscriptionResponse>({ status: 'success' })
}
