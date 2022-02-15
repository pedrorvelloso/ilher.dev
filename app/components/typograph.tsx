import clsx from 'clsx'

interface HeadingProps {
  className?: string
  id?: string
}

const H1: React.FC<HeadingProps> = ({ className, id, children }) => {
  return (
    <h1
      id={id}
      className={clsx(
        'text-2xl lg:text-4xl text-gray-800 dark:text-gray-300 font-bold',
        className,
      )}
    >
      {children}
    </h1>
  )
}

const H2: React.FC<HeadingProps> = ({ className, id, children }) => {
  return (
    <h2
      id={id}
      className={clsx(className, 'text-gray-700 dark:text-gray-200 text-xl')}
    >
      {children}
    </h2>
  )
}

const H3: React.FC<HeadingProps> = ({ className, id, children }) => {
  return (
    <h3 id={id} className={clsx(className, 'text-lg text-gray-500')}>
      {children}
    </h3>
  )
}

interface ParagraphProps {
  className?: string
  isDescription?: boolean
}

export const Paragraph: React.FC<ParagraphProps> = ({
  className,
  isDescription = false,
  children,
}) => {
  return (
    <p
      className={clsx(className, 'text-lg mb-5 leading-relaxed', {
        // 'lg:text-xl': bigger,
        'text-gray-800 dark:text-gray-300': !isDescription,
        'text-gray-600': isDescription,
      })}
    >
      {children}
    </p>
  )
}

export { H1, H2, H3 }
