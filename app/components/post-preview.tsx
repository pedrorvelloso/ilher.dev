import { Anchor } from './anchor'

interface PostPreviewProps {
  image: JSX.Element &
    React.ReactElement<React.ImgHTMLAttributes<HTMLImageElement>>
  title: string
  description: string
  url: string
}

export const PostPreview = ({
  image,
  title,
  description,
  url,
}: PostPreviewProps) => {
  return (
    <Anchor
      href={`/blog${url}`}
      underline={false}
      className="group relative"
      prefetch="intent"
    >
      <div className="w-full transition-all rounded-lg group-hover:opacity-50">
        {image}
      </div>
      <div className="text-gray-600 dark:text-blueGray-500 mt-4 text-xl">
        {description}
      </div>
      <div className="text-2xl font-medium md:text-3xl text-gray-800 dark:text-white ">
        {title}
      </div>
    </Anchor>
  )
}
