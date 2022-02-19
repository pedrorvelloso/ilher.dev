import clsx from 'clsx'
import { FaMoon as MoonIcon, FaSun as SunIcon } from 'react-icons/fa'

import { useTheme } from '~/providers/theme-provider'

import { Anchor } from '~/components/anchor'
import { Section } from './section'

const ThemeChanger = () => {
  const { theme, changeTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() => {
        changeTheme(theme === 'dark' ? 'light' : 'dark')
      }}
      className="inline-flex items-center justify-center h-14 focus:outline-none overflow-hidden noscript-hidden"
    >
      <div className="relative w-8 h-8">
        <span
          className={clsx(
            'absolute inset-0 text-black dark:text-white transform transition duration-500 flex justify-center items-center',
            {
              'opacity-0': theme === 'light',
              'opacity-1': theme === 'dark',
            },
          )}
        >
          <MoonIcon size={28} />
        </span>
        <span
          className={clsx(
            'absolute inset-0 text-black dark:text-white transform transition duration-500 flex justify-center items-center',
            {
              'opacity-0': theme === 'dark',
              'opacity-1': theme === 'light',
            },
          )}
        >
          <SunIcon size={28} />
        </span>
      </div>
    </button>
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
        <div className="flex items-center">
          <ThemeChanger />
          <span className="hidden ml-6 lg:block">
            <Anchor
              external
              underline={false}
              href="mailto:pedro@ilher.dev"
              className="no-underline bg-accent text-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-all px-6 py-2 rounded-full text-md"
            >
              Let&apos;s chat
            </Anchor>
          </span>
        </div>
      </nav>
    </Section>
  )
}
