import { NoteInfo } from '~/types'

import { Anchor } from '~/components/anchor'

export const NotePreview = ({ title, path, headline, createdAt }: NoteInfo) => {
  return (
    <div className="relative card h-full">
      <Anchor
        className="text-gray-800 dark:text-gray-300 flex flex-col z-10 relative h-full"
        href={`/blog/${path}`}
        underline={false}
      >
        <span className="text-gray-800 dark:text-gray-100 font-bold text-lg">
          {title}
        </span>
        <span className="mt-3 leading-tight text-gray-700 dark:text-gray-400">
          {headline}
        </span>
        <span className="text-xs mt-auto pt-2 text-gray-700 dark:text-gray-400">
          {createdAt}
        </span>
      </Anchor>
    </div>
  )
}
