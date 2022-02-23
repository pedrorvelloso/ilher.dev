import { collectedNotes } from 'collected-notes'
import readingTime from 'reading-time'

import { formatDate } from '~/utils/dates'
import { getEnv } from '~/utils/misc'

export const cn = collectedNotes(getEnv('CN_EMAIL'), getEnv('CN_TOKEN'))

export const sitePath = getEnv('CN_SITE_PATH')

export const getLatestNotes = async () => {
  const notes = await cn.latestNotes(sitePath, 1, 'public')

  return notes.map((note) => ({
    title: note.title,
    headline: note.headline.split('\n')[0],
    createdAt: formatDate(note.created_at),
    id: note.id,
    path: note.path,
    readingTime: readingTime(note.body).text,
  }))
}

export const translateLink = (linkToCheck: string, domain: string) => {
  const reg = /<p>\(\(([A-Za-z]+)*:([A-Za-z-]+)*\)\)<\/p>/gi
  const matches = reg.exec(linkToCheck)

  if (!matches) return linkToCheck

  return `<ul><li>Read in <a href="${domain}/blog/${matches[2]}">${matches[1]}</a></li></ul>`
}

export const getNote = async (path: string, domain: string) => {
  const note = await cn.body(sitePath, path)

  if (Object.keys(note).length === 0) return null

  const { body, note: n } = note

  const splittedBody = body.split('\n').filter((b) => !!b)
  splittedBody[1] = `<span class="text-sm text-gray-700 dark:text-gray-400">${formatDate(
    n.created_at,
  )} — ${readingTime(n.body).text}</span>`
  splittedBody[2] = translateLink(splittedBody[2], domain) || splittedBody[2]

  return {
    body: splittedBody.join('\n'),
    title: n.title,
    headline: n.headline.split('\n')[0],
    path: n.path,
  }
}
