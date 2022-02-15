import { NoteInfo } from '~/types'

import { Section } from '~/components/section'
import { H1 } from '~/components/typograph'
import { NavigationButton } from '~/components/navigation-button'
import { Anchor } from '../anchor'

interface NotesSectionProps {
  notes: Array<NoteInfo>
}

export const NotesSection = ({ notes }: NotesSectionProps) => {
  return (
    <Section className="pb-12">
      <div className="flex gap-6 items-center justify-between lg:justify-start">
        <H1 className="mb-0">Notes</H1>
        <NavigationButton href="/blog" direction="foward">
          See more
        </NavigationButton>
      </div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
        {notes.map((note) => (
          <div className="relative card h-full" key={note.id}>
            <Anchor
              className="text-gray-800 dark:text-gray-300 flex flex-col z-10 relative h-full"
              href={`/blog/${note.path}`}
              underline={false}
            >
              <span className="text-gray-800 dark:text-gray-100 font-bold text-lg">
                {note.title}
              </span>
              <span className="mt-3 leading-tight">{note.headline}</span>
              <span className="text-xs mt-auto pt-2">{note.createdAt}</span>
            </Anchor>
          </div>
        ))}
      </div>
    </Section>
  )
}
