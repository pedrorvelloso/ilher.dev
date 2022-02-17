import type { LoaderFunction, LinksFunction } from 'remix'
import { json, useLoaderData } from 'remix'

import { getLatestNotes } from '~/server/collectedNotes.server'
import { getHeaders, MaxAge } from '~/utils/headers'
import { NoteInfo } from '~/types'

import { AboutMeSection } from '~/components/sections/about-me-section'
import { HeroSection } from '~/components/sections/hero-section'
import { StackSection } from '~/components/sections/stack-section'

import prismtyles from '~/styles/prism.css'
import { NotesSection } from '~/components/sections/notes-section'

type IndexLoaderData = {
  notes: Array<NoteInfo>
}

export const headers = getHeaders

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: prismtyles },
]

export const loader: LoaderFunction = async () => {
  const notes = await getLatestNotes()

  return json<IndexLoaderData>(
    { notes: notes.splice(0, 3) },
    {
      headers: {
        ...MaxAge,
      },
    },
  )
}

const Index = () => {
  const { notes } = useLoaderData<IndexLoaderData>()

  return (
    <>
      <HeroSection />
      <StackSection />
      <AboutMeSection />
      <NotesSection notes={notes} />
    </>
  )
}

export default Index
