import type { LoaderFunction } from 'remix'
import { json, useLoaderData } from 'remix'
import { getLatestNotes } from '~/server/collectedNotes.server'
import { NoteInfo } from '~/types'

import { Section } from '~/components/section'
import { NavigationButton } from '~/components/navigation-button'
import { NotePreview } from '~/components/note-preview'
import { Paragraph } from '~/components/typograph'

type BlogLoaderData = {
  notes: Array<NoteInfo>
}

export const loader: LoaderFunction = async () => {
  const notes = await getLatestNotes()

  return json<BlogLoaderData>({ notes })
}

const Blog = () => {
  const { notes } = useLoaderData<BlogLoaderData>()

  return (
    <>
      <Section as="main">
        <Paragraph className="font-bold mt-16">Blog</Paragraph>
        <Paragraph className="mb-16">
          Everything I have to say about Web Development is here.
        </Paragraph>
        {notes.map((note) => (
          <NotePreview {...note} key={note.id} />
        ))}
      </Section>
      <Section as="div" className="flex mt-16">
        <NavigationButton href="/" direction="backward">
          Back to home page
        </NavigationButton>
      </Section>
    </>
  )
}

export default Blog
