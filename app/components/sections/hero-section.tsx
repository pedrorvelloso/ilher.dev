import { H1 } from '~/components/typograph'
import { Avatar } from '~/components/avatar'

export const HeroSection = () => {
  return (
    <section className="lg:mx-auto max-w-screen-xl px-0 lg:px-12 mx-10vw h-hero-sm lg:h-hero flex items-center justify-center flex-col">
      <Avatar src="/imgs/avatar.jpeg" alt="Pedro Reis" className="mb-4" />
      <div>
        <H1 className="leading-tight text-center mb-4">
          Full stacker developer
        </H1>
        <p className="text-gray-800 dark:text-blueGray-500 text-lg lg:text-xl text-center">
          Hey, I’m Pedro Reis. Software developer focused on delivering amazing
          experiences.
        </p>
      </div>
    </section>
  )
}
