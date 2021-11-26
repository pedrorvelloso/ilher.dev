import clsx from 'clsx'

interface SectionProps {
  className?: string
  as?: React.ElementType
  featured?: boolean
}

export const Section: React.FC<SectionProps> = ({
  as: Tag = 'section',
  featured = false,
  className,
  children,
}) => {
  return (
    <Tag
      className={clsx(
        className,
        'mx-10vw lg:mx-auto max-w-screen-xl px-0 lg:px-12',
        { 'py-12': featured },
      )}
    >
      {children}
    </Tag>
  )
}
