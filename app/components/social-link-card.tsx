import { IconType } from 'react-icons'
import clsx from 'clsx'

import { Anchor, AnchorProps } from '~/components/anchor'

type InheritFromAnchorProps = Omit<Omit<AnchorProps, 'children'>, 'underline'>

export interface SocialLinkCardProps extends InheritFromAnchorProps {
  icon: IconType
  title: string
  social: 'twitter' | 'github' | 'instagram' | 'linkedin' | 'twitch' | 'email'
  asFootnote?: boolean
}

export const SocialLinkCard = ({
  icon: Icon,
  title,
  href,
  className,
  social,
  asFootnote = false,
}: SocialLinkCardProps) => {
  return (
    <Anchor
      href={href}
      external
      className={clsx(
        className,
        {
          'bg-twitter-transparent hover:bg-twitter-brand text-twitter-brand hover:text-white':
            social === 'twitter',
          'bg-github-transparent hover:bg-github-brand text-gray-800 dark:text-gray-400 dark:hover:text-white hover:text-white':
            social === 'github',
          'bg-twitch-transparent hover:bg-twitch-brand text-twitch-brand hover:text-white':
            social === 'twitch',
          'bg-linkedin-transparent hover:bg-linkedin-brand text-linkedin-brand hover:text-white':
            social === 'linkedin',
          'bg-gray-700 hover:bg-gray-600 text-gray-800 hover:text-white':
            social === 'email',
        },
        'flex flex-col items-center justify-between group rounded-lg transition-colors duration-200',
        'hover:scale-110 transition-transform hover:shadow-md',
        {
          'w-auto h-auto lg:w-36 lg:h-36 p-8': !asFootnote,
          'p-4': asFootnote,
        },
      )}
      underline={false}
    >
      <Icon
        className={clsx('transition-colors', {
          'text-twitter-brand group-hover:text-white': social === 'twitter',
          'text-gray-700 dark:text-gray-500 group-hover:text-white':
            social === 'github',
          'text-linkedin-brand group-hover:text-white': social === 'linkedin',
          'text-twitch-brand group-hover:text-white': social === 'twitch',
          'text-gray-800 group-hover:text-gray-200': social === 'email',
          'text-lg lg:text-2xl': asFootnote,
          'text-[32px]': !asFootnote,
        })}
      />
      {!asFootnote && <p className="mt-5 text-lg font-bold">{title}</p>}
    </Anchor>
  )
}
