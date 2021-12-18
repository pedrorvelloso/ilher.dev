import { json, LoaderFunction, useLoaderData } from 'remix'

import { Image } from '~/components/image'
import { PostPreview } from '~/components/post-preview'
import { Section } from '~/components/section'
import { NavigationButton } from '~/components/navigation-button'

import { HomePost } from '~/types'

import { formatDate } from '~/utils/dates'
import { getImageProps } from '~/utils/imageBuilder'
import { getLatestPosts } from '~/utils/mdx.server'

export const loader: LoaderFunction = async () => {
  const posts = await getLatestPosts()

  return json<Array<HomePost>>(posts)
}

const Blog = () => {
  const posts = useLoaderData<Array<HomePost>>()

  return (
    <>
      <Section as="div" className="flex">
        <NavigationButton href="/" direction="backward">
          Back to home page
        </NavigationButton>
      </Section>
      <Section
        as="main"
        className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {posts.map((post) => (
          <PostPreview
            key={post.url}
            description={`${formatDate(post.date)} - ${post.readTime}`}
            title={post.title}
            url={post.url}
            image={
              <Image
                {...getImageProps({
                  id: post.bannerId,
                  widths: [280, 560, 840, 1100, 1300, 1650],
                  sizes: [
                    '(max-width:639px) 80vw',
                    '(min-width:640px) and (max-width:1023px) 40vw',
                    '(min-width:1024px) and (max-width:1620px) 25vw',
                    '420px',
                  ],
                  transformations: {
                    resize: {
                      type: 'fill',
                      aspectRatio: '3:4',
                    },
                  },
                })}
                alt={post.bannerAlt}
                title={post.bannerCredit}
                blurDataUrl={post.blurImage}
                className="rounded-lg"
                objectFit="cover"
                objectPosition="center"
                outterClassName="aspect-h-4 aspect-w-3"
              />
            }
          />
        ))}
      </Section>
    </>
  )
}

export default Blog
