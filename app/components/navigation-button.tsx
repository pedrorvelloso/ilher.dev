import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import { Anchor } from '~/components/anchor'

interface NavigationButtonProps {
  direction: 'foward' | 'backward'
  href: string
}

export const NavigationButton: React.FC<NavigationButtonProps> = ({
  direction,
  href,
  children,
}) => {
  return (
    <Anchor
      href={href}
      underline={false}
      className="text-gray-600 dark:text-gray-400 group flex items-center gap-x-2 hover:text-accent dark:hover:text-accent border border-solid border-transparent rounded-full px-3 py-1 hover:border-accent transition-all"
    >
      {direction === 'backward' && (
        <div className="group-hover:-translate-x-2 transition-transform">
          <FaArrowLeft />
        </div>
      )}
      {children}
      {direction === 'foward' && (
        <div className="group-hover:translate-x-2 transition-transform">
          <FaArrowRight />
        </div>
      )}
    </Anchor>
  )
}

export default NavigationButton
