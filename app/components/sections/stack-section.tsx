import { motion } from 'framer-motion'

import { CodeWindow } from '~/components/code-window'
import { Section } from '~/components/section'
import { backendStack, frontendStack, infraStack } from '~/utils/stack'

export const StackSection = () => {
  const childVariants = {
    initial: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="bg-accent">
      <Section className="py-8 mx-0 lg:mx-auto" extrapolate>
        <motion.div
          initial="initial"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, duration: 0.5 },
            },
            initial: { opacity: 0 },
          }}
          className="grid grid-cols-1 gap-y-4 gap-x-4 xl:gap-x-8 lg:grid-cols-3 justify-items-center w-full"
        >
          <motion.div className="w-full" variants={childVariants}>
            <CodeWindow title="frontend.json" code={frontendStack} />
          </motion.div>
          <motion.div className="w-full" variants={childVariants}>
            <CodeWindow title="backend.json" code={backendStack} />
          </motion.div>
          <motion.div className="w-full" variants={childVariants}>
            <CodeWindow title="infra.json" code={infraStack} />
          </motion.div>
        </motion.div>
      </Section>
    </div>
  )
}
