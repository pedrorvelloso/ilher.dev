import { useMemo } from 'react'

import type { LoaderFunction, LinksFunction, MetaFunction } from 'remix'
import { useLoaderData, json } from 'remix'
import { getMDXComponent } from 'mdx-bundler/client'
import parseRange from 'parse-numeric-range'

import prismStyles from '~/styles/prism.css'

import { getPost } from '~/server/mdx/mdx.server'

import { imageProps } from '~/utils/imageBuilder'
import { formatDate } from '~/utils/dates'
import { toSlug } from '~/utils/misc'

import { SyntaxHighlighter } from '~/components/syntax-highlighter'
import { Image } from '~/components/image'
import { H1, H2, Paragraph } from '~/components/typograph'
import { Section } from '~/components/section'
import { NavigationButton } from '~/components/navigation-button'
import { PostAnchor } from '~/components/post-anchor'
import { Anchor } from '~/components/anchor'

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: prismStyles },
]

export const meta: MetaFunction = ({ data }) => ({
  title: data.frontmatter.title,
  description: data.frontmatter.description,
})

export const loader: LoaderFunction = async ({ params }) => {
  const result = await getPost(params.slug as string)

  if (!result) throw json({ message: 'post not found' }, { status: 404 })

  const { code, frontmatter } = result

  return json({ code, frontmatter })
}

const components = {
  code: (props) => {
    const match = /language-(\w+)/.exec(props.className || '')

    if (match) {
      const lines = props.lines ? parseRange(props.lines) : undefined

      return (
        <SyntaxHighlighter
          language={match[1]}
          data-filename={props.filename}
          data-language={match[1]}
          lines={lines}
          className={props.className}
        >
          {String(props.children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      )
    }

    return <code {...props} />
  },
  pre: (props) => {
    const match = /language-(\w+)/.exec(props.children.props.className || '')
    if (typeof props.children !== 'string' && match) {
      return props.children
    }

    return <pre {...props} />
  },
  h1: (props) => (
    <PostAnchor goTo={toSlug(props.children)}>{props.children}</PostAnchor>
  ),
  h2: (props) => (
    <PostAnchor goTo={toSlug(props.children)} as="h2">
      {props.children}
    </PostAnchor>
  ),
  a: (props) => <Anchor className="text-accent" {...props} external />,
}

type BlogPostLoaderData = {
  code: string
  frontmatter: {
    title: string
    description: string
    language: string
    date: string
    bannerId: string
    bannerAlt: string
    bannerCredit: string
    blurImage: string
    readTime: string
  }
}

const BlogPost = () => {
  const data = useLoaderData<BlogPostLoaderData>()
  const Component = useMemo(() => getMDXComponent(data.code), [data.code])

  return (
    <>
      <Section as="div" className="flex">
        <NavigationButton href="/blog" direction="backward">
          Back to posts
        </NavigationButton>
      </Section>
      <section className="lg:max-w-screen-xl lg:mx-auto lg:px-12 py-12">
        <div className="lg:px-12 mx-10vw lg:mx-0 mb-16">
          <H1 className="mb-4">{data.frontmatter.title}</H1>
          <Image
            {...imageProps({
              id: data.frontmatter.bannerId,
              transformations: { resize: { width: 1600 } },
            })}
            alt={data.frontmatter.bannerAlt}
            title={data.frontmatter.bannerCredit}
            blurDataUrl={data.frontmatter.blurImage}
            className="rounded-lg"
            objectFit="cover"
            objectPosition="center"
            outterClassName="aspect-h-4 aspect-w-3 md:aspect-w-16 md:aspect-h-8 mb-4"
          />
          <H2>{data.frontmatter.description}</H2>
          <Paragraph bigger={false}>
            {formatDate(data.frontmatter.date)} -{' '}
            <span className="mr-2">{data.frontmatter.readTime}</span>
            {data.frontmatter.language}
          </Paragraph>
        </div>
        <article className="post">
          <Component components={components} />
        </article>
      </section>
    </>
  )
}

export const CatchBoundary = () => {
  // const caught = useCatch()

  return <h1>oops</h1>
}

export default BlogPost
