import { collectedNotes } from 'collected-notes'
import { getEnv } from '~/utils/misc'

export const cn = collectedNotes(getEnv('CN_EMAIL'), getEnv('CN_TOKEN'))

export const sitePath = getEnv('CN_SITE_PATH')
