import { Link } from 'remix'
import clsx from 'clsx'

export interface AnchorProps {
  href: string
  className?: string
  underline?: boolean
  external?: boolean
}

export const Anchor: React.FC<AnchorProps> = ({
  href,
  className,
  children,
  underline = true,
  external = false,
}) => {
  if (external)
    return (
      <a
        href={href}
        className={clsx(className, { 'hover:underline': underline })}
      >
        {children}
      </a>
    )

  return (
    <Link
      to={href}
      className={clsx(className, { 'hover:underline': underline })}
    >
      {children}
    </Link>
  )
}
