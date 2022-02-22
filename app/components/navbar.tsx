import {
  IoMoon as MoonIcon,
  IoSunny as SunIcon,
  IoMail as MailIcon,
  IoBook as BookIcon,
  IoLogoGithub as GithubIcon,
} from 'react-icons/io5'

import { useTheme } from '~/providers/theme-provider'

import { Anchor } from '~/components/anchor'
import { Section } from './section'
import { Button, LinkButton } from './button'

const ThemeChanger = () => {
  const { theme, changeTheme } = useTheme()

  return (
    <div className="bg-gray-300 dark:bg-gray-800 dark:bg-opacity-60 p-1 rounded-xl flex gap-1">
      <Button
        label="Dark Theme"
        onClick={() => changeTheme('dark')}
        active={theme === 'dark'}
      >
        <MoonIcon />
      </Button>
      <Button
        label="Light Theme"
        onClick={() => changeTheme('light')}
        active={theme === 'light'}
      >
        <SunIcon />
      </Button>
    </div>
  )
}

export const Navbar = () => {
  return (
    <Section className="py-4 lg:py-12" as="div" extrapolate>
      <nav className="text-black dark:text-white flex justify-between items-center mx-auto">
        <Anchor
          href="/"
          underline
          className="dark:text-white text-2xl lg:text-4xl font-bold"
        >
          Pedro Reis
        </Anchor>
        <div className="flex items-center gap-3">
          <span className="hidden ml-6 lg:flex lg:gap-1">
            <LinkButton label="Contact" href="mailto:pedro@ilher.dev" external>
              <MailIcon />
            </LinkButton>
            <LinkButton label="Blog" href="/blog">
              <BookIcon />
            </LinkButton>
            <LinkButton
              label="Github"
              href="https://github.com/pedrorvelloso"
              external
            >
              <GithubIcon />
            </LinkButton>
          </span>
          <ThemeChanger />
        </div>
      </nav>
    </Section>
  )
}
