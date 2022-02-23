import { Link } from 'remix'
import clsx from 'clsx'

export interface AnchorProps {
  href: string
  className?: string
  underline?: boolean
  external?: boolean
  prefetch?: 'intent' | 'none' | 'render'
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
}

export const Anchor: React.FC<AnchorProps> = ({
  href,
  className,
  children,
  underline = true,
  external = false,
  target,
  rel,
  prefetch,
}) => {
  if (external)
    return (
      <a
        href={href}
        className={clsx(className, { 'hover:underline': underline })}
        target={target}
        rel={rel}
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
