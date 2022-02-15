import type { LoaderFunction, LinksFunction } from 'remix'
import { json, useLoaderData } from 'remix'

import { cn, sitePath } from '~/server/collectedNotes/index.server'

import proseStyles from '~/styles/prose.css'
import highlightStyles from '~/styles/highlight.css'

import { Swr } from '~/utils/headers'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: proseStyles },
  { rel: 'stylesheet', href: highlightStyles },
]

export const loader: LoaderFunction = async ({ params }) => {
  const note = await cn.body(sitePath, params.slug as string)

  if (Object.keys(note).length === 0)
    throw new Response('Not Found', { status: 404 })

  const { body, note: n } = note

  return json(
    { body, title: n.title },
    {
      headers: {
        ...Swr,
      },
    },
  )
}

const BlogPostHTML = () => {
  const { body } = useLoaderData()

  return (
    <section className="space-y-4 px-5vw">
      <article
        className="prose dark:prose-invert sm:prose-lg mx-auto prose-a:text-sky-500 prose-a:prose-h1:text-gray-800 dark:prose-a:prose-h1:text-gray-100 prose-a:no-underline"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </section>
  )
}

export default BlogPostHTML
