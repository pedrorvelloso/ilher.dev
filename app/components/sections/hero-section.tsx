import { Avatar } from '~/components/avatar'
import { Section } from '~/components/section'

export const HeroSection = () => {
  return (
    <Section className="h-hero-sm lg:h-hero flex items-center justify-center lg:justify-between flex-col-reverse lg:flex-row">
      <div className="max-w-lg text-center lg:text-left">
        <h1 className="text-2xl lg:text-4xl font-bold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-accent to-gray-800 dark:to-gray-200">
          Full stacker developer
        </h1>
        <p className="text-gray-800 dark:text-gray-300 text-lg lg:text-xl">
          Hey, I’m Pedro Reis. Software developer focused on delivering amazing
          experiences.
        </p>
      </div>
      <Avatar src="/imgs/avatar.jpeg" alt="Pedro Reis" className="mb-4" />
    </Section>
  )
}
