import type { LoaderFunction, LinksFunction } from 'remix'
import { json, useLoaderData } from 'remix'
import { HTML } from 'collected-notes'
import { IoLogoTwitter as TwitterIcon } from 'react-icons/io5'

import { getNote } from '~/server/collectedNotes.server'

import proseStyles from '~/styles/prose.css'
import highlightStyles from '~/styles/highlight.css'

import { getHeaders, Swr } from '~/utils/headers'
import { seoNoteMeta } from '~/utils/seo'
import { getDomainUrl } from '~/utils/misc'

import { Section } from '~/components/section'
import { ErrorPage } from '~/components/error'
import { NavigationButton } from '~/components/navigation-button'
import { LinkButton } from '~/components/button'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: proseStyles },
  { rel: 'stylesheet', href: highlightStyles },
]

export type BlogPostLoaderData = {
  body: HTML
  title: string
  headline: string
  path: string
  origin: string
}

export const headers = getHeaders

export const meta = seoNoteMeta

export const loader: LoaderFunction = async ({ params, request }) => {
  const origin = getDomainUrl(request)
  const note = await getNote(params.slug as string, origin)

  if (!note) throw new Response('Not Found', { status: 404 })

  return json<BlogPostLoaderData>(
    {
      body: note.body,
      title: note.title,
      headline: note.headline,
      path: note.path,
      origin,
    },
    {
      headers: {
        ...Swr,
      },
    },
  )
}

const BlogPost = () => {
  const { body, path, origin, title } = useLoaderData<BlogPostLoaderData>()

  const tweetMessage = `Read "${title}" by @ilher\n\n`

  return (
    <Section className="mt-20 mb-20">
      <div className="mb-5">
        <NavigationButton href="/blog" direction="backward">
          Back to blog posts
        </NavigationButton>
      </div>
      <article
        className="prose dark:prose-invert sm:prose-lg mx-auto prose-a:text-sky-500 prose-a:prose-h1:text-gray-800 dark:prose-a:prose-h1:text-gray-100 prose-a:no-underline prose-h1:text-lg prose-a:prose-h1:text-xl prose-a:prose-h1:font-bold prose-a:prose-h2:text-gray-800 dark:prose-a:prose-h2:text-gray-100 prose-h2:text-lg prose-a:prose-h2:text-xl prose-a:prose-h2:font-bold mb-12"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <LinkButton
        href={`https://twitter.com/intent/tweet?${new URLSearchParams({
          url: `${origin}/blog/${path}`,
          text: tweetMessage,
        })}`}
        external
        className="flex w-fit text-sky-500"
        target="_blank"
        rel="noreferrer noopener"
        small
      >
        <TwitterIcon /> Tweet this Post
      </LinkButton>
    </Section>
  )
}

export const CatchBoundary = () => {
  return <ErrorPage title="Page not found" description="Ooops" />
}

export default BlogPost
