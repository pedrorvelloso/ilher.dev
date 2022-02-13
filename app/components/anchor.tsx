import { Link } from 'remix'
import clsx from 'clsx'

export interface AnchorProps {
  href: string
  className?: string
  underline?: boolean
  external?: boolean
  prefetch?: 'intent' | 'none' | 'render'
}

export const Anchor: React.FC<AnchorProps> = ({
  href,
  className,
  children,
  underline = true,
  external = false,
  prefetch,
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
      prefetch={prefetch}
    >
      {children}
    </Link>
  )
}
