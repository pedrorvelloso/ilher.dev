import type { LoaderFunction, LinksFunction } from 'remix'
import { json, useLoaderData } from 'remix'

import { AboutMeSection } from '~/components/sections/about-me-section'
import { HeroSection } from '~/components/sections/hero-section'
import { StackSection } from '~/components/sections/stack-section'
import { BlogSection } from '~/components/sections/blog-section'

import prismtyles from '~/styles/prism.css'

import { getHomePosts } from '~/server/mdx/mdx.server'
import { HomePost } from '~/types'

type IndexLoaderData = {
  posts: Array<HomePost>
}

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: prismtyles },
]

export const loader: LoaderFunction = async () => {
  const posts = await getHomePosts()

  return json<IndexLoaderData>({ posts })
}

const Index = () => {
  const data = useLoaderData<IndexLoaderData>()

  return (
    <>
      <HeroSection />
      <StackSection />
      <AboutMeSection />
      <BlogSection posts={data.posts} />
    </>
  )
}

export default Index
