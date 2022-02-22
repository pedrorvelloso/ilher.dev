import clsx from 'clsx'

import { PolymorphicComponentProps } from '~/helpers'

import { AnchorProps, Anchor } from '~/components/anchor'

const ButtonTooltip: React.FC = ({ children }) => (
  <span className="invisible transition-all delay-75 bg-opacity-80 text-sm group-hover:visible absolute left-1/2 right-auto -translate-x-1/2 -bottom-9 bg-neutral-900 text-white px-3 py-1 pointer-events-none text-md rounded-md scale-0 group-hover:scale-100 min-w-fit whitespace-nowrap">
    {children}
  </span>
)

interface ButtonContainerOwnProps {
  small?: boolean
  outline?: boolean
  active?: boolean
  className?: string
}
type ButtonContainerProps<C extends React.ElementType> =
  PolymorphicComponentProps<C, ButtonContainerOwnProps>

const ButtonContainer = <C extends React.ElementType = 'button'>({
  children,
  small = false,
  outline = false,
  active = false,
  as,
  className,
  ...rest
}: ButtonContainerProps<C>) => {
  const Tag = as || 'button'
  return (
    <Tag
      className={clsx(
        'rounded-xl relative group transition-colors w-fit',
        {
          'dark:bg-gray-700 bg-gray-400': active && !outline,
          'dark:text-gray-300 text-gray-800': !active && !outline,
          'p-3': !small,
          'text-sm py-1 px-2': small,
          'hover:bg-accent': !outline,
          'dark:hover:text-darkerBlue hover:text-gray-300': !outline && !active,
          'border border-transparent hover:border-accent dark:text-gray-300 text-gray-800 hover:text-accent dark:hover:text-accent':
            outline,
        },
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonContainerOwnProps {
  label?: string
}

export const Button: React.FC<ButtonProps> = ({
  label,
  children,
  type = 'button',
  ...buttonProps
}) => {
  return (
    <ButtonContainer {...buttonProps} type={type}>
      {children}
      {label && <ButtonTooltip>{label}</ButtonTooltip>}
    </ButtonContainer>
  )
}

interface LinkButtonProps
  extends Omit<AnchorProps, 'underline'>,
    ButtonContainerOwnProps {
  label?: string
}

export const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  label,
  small,
  outline,
  active,
  className,
  ...anchorProps
}) => {
  return (
    <Anchor {...anchorProps} underline={false}>
      <ButtonContainer
        as="div"
        small={small}
        outline={outline}
        active={active}
        className={clsx(className, 'flex items-center gap-x-2')}
      >
        {children}
        {label && <ButtonTooltip>{label}</ButtonTooltip>}
      </ButtonContainer>
    </Anchor>
  )
}
