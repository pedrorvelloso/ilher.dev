import { PostPreview } from '~/components/post-preview'
import { H1 } from '~/components/typograph'
import { Section } from '~/components/section'
import { NavigationButton } from '~/components/navigation-button'
import { Image } from '~/components/image'

import { formatDate } from '~/utils/dates'
import { HomePost } from '~/types'
import { getImageProps } from '~/utils/imageBuilder'

interface BlogSectionProps {
  posts: Array<HomePost>
}

export const BlogSection = ({ posts }: BlogSectionProps) => {
  return (
    <Section className="pb-12">
      <div className="flex gap-6 items-center justify-between lg:justify-start">
        <H1 className="mb-0">Blog</H1>
        <NavigationButton href="/blog" direction="foward">
          See more
        </NavigationButton>
      </div>
      <div className="space-y-12 sm:space-y-0 lg:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:grid lg:grid-cols-3 lg:gap-x-6 mt-6">
        {posts.map((post) => (
          <PostPreview
            key={post.title}
            url={post.url}
            title={post.title}
            description={`${formatDate(post.date)} - ${post.readTime}`}
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
      </div>
    </Section>
  )
}
