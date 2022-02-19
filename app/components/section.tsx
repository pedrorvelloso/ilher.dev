import clsx from 'clsx'

interface SectionProps {
  className?: string
  as?: React.ElementType
  featured?: boolean
  extrapolate?: boolean
}

export const Section: React.FC<SectionProps> = ({
  as: Tag = 'section',
  featured = false,
  className,
  children,
  extrapolate = false,
}) => {
  return (
    <Tag
      className={clsx(
        className,
        'mx-10vw lg:mx-auto max-w-screen-lg px-0 lg:px-12',
        {
          'py-12': featured,
          'max-w-screen-lg': !extrapolate,
          'max-w-screen-xl': extrapolate,
        },
      )}
    >
      {children}
    </Tag>
  )
}
