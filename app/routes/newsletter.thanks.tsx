import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { Avatar } from '~/components/avatar'
import { Section } from '~/components/section'
import { H1, Paragraph } from '~/components/typograph'
import { NavigationButton } from '~/components/navigation-button'

const minMax = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min)

const Explosion: React.FC = ({ children }) => (
  <motion.span
    animate={{
      y: [
        -Math.ceil(Math.random() * 40),
        -Math.ceil(Math.random() * 500),
        Math.ceil(Math.random() * 500),
      ],
      x: minMax(100, 350) * (Math.round(Math.random()) ? 1 : -1),
      opacity: 0,
      transition: { duration: 1.5 },
    }}
    exit={{ opacity: 0 }}
    className="absolute z-10 scale-50"
  >
    {children}
  </motion.span>
)

const NewsletterThanks = () => {
  const arrayValue = Array.from({ length: 10 }, (_, i) => i + 1)
  const [isRaining, setIsRaining] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsRaining(false), 1800)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className="h-screen overflow-hidden relative">
      <Section className="h-full flex flex-col justify-center items-center">
        <AnimatePresence>
          {isRaining && (
            <>
              {arrayValue.map((v) => (
                <Explosion key={v}>🎉</Explosion>
              ))}
              {arrayValue.map((v) => (
                <Explosion key={v}>🎈</Explosion>
              ))}
            </>
          )}
        </AnimatePresence>
        <Avatar
          src="/imgs/avatar.jpeg"
          alt="Pedro avatar"
          size="sm"
          className="mb-5"
        />
        <H1 colorScheme="primary">Success</H1>
        <Paragraph className="text-center">
          You&apos;re officially subscribed to my newsletter!
        </Paragraph>
        <NavigationButton href="/" direction="backward">
          Back to website
        </NavigationButton>
      </Section>
    </div>
  )
}

export default NewsletterThanks
