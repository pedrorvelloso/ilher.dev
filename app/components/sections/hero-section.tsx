import { Section } from '~/components/section'
import { H1 } from '~/components/heading'
import { Avatar } from '~/components/avatar'

function HeroSection() {
  return (
    <Section className="h-hero-sm lg:h-hero flex items-center justify-center flex-col">
      <Avatar src="/imgs/avatar.jpeg" alt="Pedro Reis" className="mb-4" />
      <div>
        <H1 className="leading-tight text-center">Full stacker developer</H1>
        <p className="text-gray-800 dark:text-blueGray-500 text-lg lg:text-xl text-center">
          Hey, I’m Pedro Reis. Software developer focused on delivering amazing
          experiences.
        </p>
      </div>
    </Section>
  )
}

export default HeroSection
