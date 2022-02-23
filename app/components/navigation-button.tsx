import clsx from 'clsx'
import {
  IoArrowForward as ArrowForward,
  IoArrowBack as ArrowBackward,
} from 'react-icons/io5'

import { LinkButton } from '~/components/button'

interface NavigationButtonProps {
  direction: 'forward' | 'backward'
  href: string
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  href,
  children,
}) => {
  return (
    <LinkButton
      href={href}
      small
      outline
      anchorClassName="flex w-fit"
      className={clsx('group transition-all', {
        'flex-row-reverse': direction === 'backward',
      })}
    >
      {children}
      <span
        className={clsx(' transition-transform', {
          'group-hover:-translate-x-1': direction === 'backward',
          'group-hover:translate-x-1': direction === 'forward',
        })}
      >
        {direction === 'forward' && <ArrowForward />}
        {direction === 'backward' && <ArrowBackward />}
      </span>
    </LinkButton>
  )
}
