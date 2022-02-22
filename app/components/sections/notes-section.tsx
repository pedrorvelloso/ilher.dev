import { IoArrowForward as ArrowForward } from 'react-icons/io5'
import { NoteInfo } from '~/types'

import { Section } from '~/components/section'
import { H1 } from '~/components/typograph'
import { NotePreview } from '~/components/note-preview'
import { LinkButton } from '../button'

interface NotesSectionProps {
  notes: Array<NoteInfo>
}

export const NotesSection = ({ notes }: NotesSectionProps) => {
  if (notes.length === 0) return null

  return (
    <Section className="pb-20">
      <div className="flex gap-6 items-center justify-between lg:justify-start">
        <H1 className="mb-0">Blog</H1>
        <LinkButton href="/blog" small outline className="group transition-all">
          See more{' '}
          <span className="group-hover:translate-x-1 transition-transform">
            <ArrowForward />
          </span>
        </LinkButton>
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
        {notes.map((note) => (
          <NotePreview {...note} key={note.id} />
        ))}
      </div>
    </Section>
  )
}
