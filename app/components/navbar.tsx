import { useTransition } from 'remix'
import { useEffect, useState } from 'react'
import {
  IoMoon as MoonIcon,
  IoSunny as SunIcon,
  IoMail as MailIcon,
  IoBook as BookIcon,
  IoLogoGithub as GithubIcon,
  IoList as HamburgerIcon,
  IoClose as CloseIcon,
  IoHome as HomeIcon,
  IoLogoTwitter as TwitterLogo,
} from 'react-icons/io5'

import { useTheme } from '~/providers/theme-provider'

import { Anchor } from '~/components/anchor'
import { Section } from '~/components/section'
import { Button, LinkButton } from '~/components/button'
import { Drawer } from '~/components/drawer'

const ThemeChanger = () => {
  const { theme, changeTheme } = useTheme()

  return (
    <div className="bg-gray-300 dark:bg-gray-800 dark:bg-opacity-60 p-1 rounded-xl flex gap-1 noscript-hidden">
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

const DrawerMenu = () => {
  return (
    <div>
      <p className="pl-3 mt-5 text-gray-400 font-bold">Pedro Reis</p>
      <LinkButton href="/" className="text-left">
        <HomeIcon /> Home
      </LinkButton>
      <LinkButton href="/blog" className="text-left">
        <BookIcon /> Blog
      </LinkButton>
      <p className="pl-3 mt-5 text-gray-400 font-bold">Social</p>
      <LinkButton
        href="https://github.com/pedrorvelloso"
        className="text-left"
        external
      >
        <GithubIcon /> Github
      </LinkButton>
      <LinkButton
        href="https://twitter.com/ilher"
        className="text-left"
        external
      >
        <TwitterLogo /> Twitter
      </LinkButton>
      <LinkButton href="mailto:pedro@ilher.dev" className="text-left" external>
        <MailIcon /> Contact
      </LinkButton>
    </div>
  )
}

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const transition = useTransition()

  useEffect(() => {
    if (transition.state === 'loading') setIsDrawerOpen(false)
  }, [transition.state])

  return (
    <>
      <Section className="py-4 lg:py-12" as="div" extrapolate>
        <nav className="text-black dark:text-white flex justify-between items-center mx-auto">
          <Button
            className="flex lg:hidden w-fit"
            onClick={() => setIsDrawerOpen((p) => !p)}
          >
            <HamburgerIcon />
          </Button>
          <Anchor
            href="/"
            underline
            className="dark:text-white text-2xl lg:text-4xl font-bold hidden lg:block"
          >
            Pedro Reis
          </Anchor>
          <div className="flex items-center gap-3">
            <span className="hidden ml-6 lg:flex lg:gap-1">
              <LinkButton
                label="Contact"
                href="mailto:pedro@ilher.dev"
                external
              >
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
      <Drawer isOpen={isDrawerOpen}>
        <Button
          className="flex lg:hidden w-fit text-gray-300"
          onClick={() => setIsDrawerOpen((p) => !p)}
        >
          <CloseIcon />
        </Button>
        <DrawerMenu />
      </Drawer>
    </>
  )
}
