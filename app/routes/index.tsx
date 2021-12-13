import type { LoaderFunction, LinksFunction } from 'remix'
import { json, useLoaderData } from 'remix'

import { AboutMeSection } from '~/components/sections/about-me-section'
import { HeroSection } from '~/components/sections/hero-section'
import { StackSection } from '~/components/sections/stack-section'

import indexStyles from '~/styles/routes/index.css'
import prismtyles from '~/styles/prism.css'

import { redisCache } from '~/utils/redis.server'

type IndexLoaderData = {
  stack: {
    frontendStack: string
    backendStack: string
    infraStack: string
  }
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: indexStyles },
  { rel: 'stylesheet', href: prismtyles },
]

export const loader: LoaderFunction = async () => {
  await redisCache.keys('*')

  return json({})
}

const Index = () => {
  const data = useLoaderData<IndexLoaderData>()

  return (
    <>
      <HeroSection />
      <StackSection />
      <AboutMeSection />
    </>
  )
}

export default Index
