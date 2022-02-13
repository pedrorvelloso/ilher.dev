import type { LoaderFunction, LinksFunction } from 'remix'
import { json, useLoaderData } from 'remix'

import { getLatestNotes } from '~/server/mdx/mdx.server'
import { getHeaders } from '~/utils/headers'
import { HomePost } from '~/types'

import { AboutMeSection } from '~/components/sections/about-me-section'
import { HeroSection } from '~/components/sections/hero-section'
import { StackSection } from '~/components/sections/stack-section'
import { BlogSection } from '~/components/sections/blog-section'

import prismtyles from '~/styles/prism.css'

type IndexLoaderData = {
  notes: Array<HomePost>
}

const SECOND_PER_YEAR = 3.154e7

export const headers = getHeaders

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: prismtyles },
]

export const loader: LoaderFunction = async () => {
  const notes = await getLatestNotes()

  return json<IndexLoaderData>(
    { notes: notes.splice(0, 3) },
    {
      headers: {
        'Cache-Control': `public, stale-while-revalidate=${SECOND_PER_YEAR}, s-maxage=1`,
        Vary: 'Cookie',
      },
    },
  )
}

const Index = () => {
  const data = useLoaderData<IndexLoaderData>()

  return (
    <>
      <HeroSection />
      <StackSection />
      <AboutMeSection />
      <BlogSection posts={data.notes} />
    </>
  )
}

export default Index
