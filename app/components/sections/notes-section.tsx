import { NoteInfo } from '~/types'

import { Section } from '~/components/section'
import { H1 } from '~/components/typograph'
import { NotePreview } from '~/components/note-preview'
import { NavigationButton } from '~/components/navigation-button'

interface NotesSectionProps {
  notes: Array<NoteInfo>
}

export const NotesSection = ({ notes }: NotesSectionProps) => {
  if (notes.length === 0) return null

  return (
    <Section className="pb-20">
      <div className="flex gap-6 items-center justify-between lg:justify-start">
        <H1 className="mb-0">Blog</H1>
        <NavigationButton href="/blog" direction="forward">
          See more
        </NavigationButton>
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
        {notes.map((note) => (
          <NotePreview {...note} key={note.id} />
        ))}
      </div>
    </Section>
  )
}
