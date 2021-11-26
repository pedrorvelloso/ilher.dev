import clsx from 'clsx'

interface AvatarProps {
  size?: 'xs' | 'sm' | 'lg' | 'responsive'
  src: string
  alt: string
  className?: string
}

export const Avatar = ({
  src,
  size = 'responsive',
  alt,
  className,
}: AvatarProps) => {
  return (
    <img
      src={src}
      width="226"
      height="226"
      alt={alt}
      className={clsx(
        'bg-gray-800 dark:bg-gray-200 rounded-full flex justify-center items-center relative overflow-hidden object-cover',
        {
          'avatar-sm lg:avatar-lg p-[2px] lg:p-1': size === 'responsive',
          'avatar-sm p-[2px]': size === 'sm',
          'avatar-lg p-1': size === 'lg',
          'avatar-xs p-[2px]': size === 'xs',
        },
        className,
      )}
    />
  )
}

export default Avatar
