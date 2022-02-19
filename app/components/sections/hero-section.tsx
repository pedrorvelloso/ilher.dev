import { motion, useReducedMotion } from 'framer-motion'

import { Avatar } from '~/components/avatar'
import { Section } from '~/components/section'

export const HeroSection = () => {
  const shouldUseReducedMotion = useReducedMotion()

  const childVariants = {
    initial: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <Section className="h-hero-sm lg:h-hero flex items-center justify-center lg:justify-between flex-col-reverse lg:flex-row">
      <motion.div
        className="max-w-lg text-center lg:text-left"
        initial="initial"
        animate="visible"
        variants={{
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, duration: 0.5 },
          },
          initial: { opacity: 0 },
        }}
      >
        <motion.h1
          variants={childVariants}
          className="text-2xl lg:text-4xl font-bold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-t from-accent to-accentDarker"
        >
          Full stacker developer
        </motion.h1>
        <motion.p
          variants={childVariants}
          className="text-gray-800 dark:text-gray-300 text-lg lg:text-xl w-80"
        >
          Hey, I&apos;m Pedro Reis. Software developer focused on delivering
          amazing experiences.
        </motion.p>
      </motion.div>
      <motion.div
        initial="initial"
        animate="visible"
        variants={{
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4 },
          },
          initial: {
            opacity: 0,
            scale: shouldUseReducedMotion ? 1 : 1.5,
          },
        }}
      >
        <Avatar src="/imgs/avatar.jpeg" alt="Pedro Reis" className="mb-4" />
      </motion.div>
    </Section>
  )
}
