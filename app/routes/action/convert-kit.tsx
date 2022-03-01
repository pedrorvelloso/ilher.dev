import { createConvertKitAction } from '~/server/convertKit.server'
import { ErrorPage } from '~/components/error'

export const action = createConvertKitAction

const ConvertKitAction = () => {
  return (
    <ErrorPage
      title="You should probably enable Javascript 😉"
      description="Oooops (check your email LOL)"
    />
  )
}

export default ConvertKitAction
