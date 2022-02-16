import type { LoaderFunction, LinksFunction } from 'remix'
import { json, useLoaderData } from 'remix'
import { HTML } from 'collected-notes'

import { getNote } from '~/server/collectedNotes.server'

import proseStyles from '~/styles/prose.css'
import highlightStyles from '~/styles/highlight.css'

import { getHeaders, Swr } from '~/utils/headers'

import { Section } from '~/components/section'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: proseStyles },
  { rel: 'stylesheet', href: highlightStyles },
]

type BlogPostLoaderData = {
  body: HTML
}

export const headers = getHeaders

export const loader: LoaderFunction = async ({ params }) => {
  const note = await getNote(params.slug as string)

  if (!note) throw new Response('Not Found', { status: 404 })

  return json<BlogPostLoaderData>(
    { body: note.body },
    {
      headers: {
        ...Swr,
      },
    },
  )
}

const BlogPost = () => {
  const { body } = useLoaderData<BlogPostLoaderData>()

  return (
    <Section className="mt-20 mb-20">
      <article
        className="prose dark:prose-invert sm:prose-lg mx-auto prose-a:text-sky-500 prose-a:prose-h1:text-gray-800 dark:prose-a:prose-h1:text-gray-100 prose-a:no-underline prose-h1:text-lg prose-a:prose-h1:text-xl prose-a:prose-h1:font-bold"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </Section>
  )
}

export const CatchBoundary = () => {
  return <div>oops</div>
}

export default BlogPost
