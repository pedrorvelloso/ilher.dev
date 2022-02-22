import clsx from 'clsx'

import { AnchorProps, Anchor } from '~/components/anchor'

const ButtonTooltip: React.FC = ({ children }) => (
  <div className="invisible transition-all delay-75 bg-opacity-80 text-sm group-hover:visible absolute left-1/2 right-auto -translate-x-1/2 -bottom-9 bg-neutral-900 text-white px-3 py-1 pointer-events-none text-md rounded-md scale-0 group-hover:scale-100 min-w-fit whitespace-nowrap">
    {children}
  </div>
)

interface ButtonContainerProps {
  as?: React.ElementType
  small?: boolean
  outline?: boolean
  active?: boolean
  className?: string
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({
  children,
  small = false,
  outline = false,
  active = false,
  as: Tag = 'button',
  className,
  ...rest
}) => (
  <Tag
    className={clsx(
      'rounded-xl relative group transition-colors w-fit flex items-center gap-x-2',
      {
        'dark:bg-gray-700 bg-gray-400': active && !outline,
        'dark:text-gray-300 text-gray-800': !active && !outline,
        'p-3': !small,
        'text-sm py-1 px-2': small,
        'hover:bg-accent': !outline,
        'dark:hover:text-darkerBlue hover:text-gray-300': !outline && !active,
        'border border-transparent hover:border-accent dark:text-gray-300 text-gray-800 hover:text-accent dark:hover:text-accent':
          outline,
        className,
      },
    )}
    {...rest}
  >
    {children}
  </Tag>
)

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  active?: boolean
  small?: boolean
  outline?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  label,
  children,
  ...buttonProps
}) => {
  return (
    <ButtonContainer {...buttonProps}>
      {children}
      {label && <ButtonTooltip>{label}</ButtonTooltip>}
    </ButtonContainer>
  )
}

interface LinkButtonProps
  extends AnchorProps,
    Pick<ButtonContainerProps, 'small' | 'outline' | 'className'> {
  label?: string
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  label,
  small,
  outline,
  className,
  ...anchorProps
}) => {
  return (
    <Anchor {...anchorProps} underline={false}>
      <ButtonContainer
        as="div"
        small={small}
        outline={outline}
        className={className}
      >
        {children}
        {label && <ButtonTooltip>{label}</ButtonTooltip>}
      </ButtonContainer>
    </Anchor>
  )
}
