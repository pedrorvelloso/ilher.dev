/* eslint-disable @typescript-eslint/no-empty-function */
import {
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
  cloneElement,
} from 'react'
import clsx from 'clsx'

const useSSRLayoutEffect =
  typeof window === 'undefined' ? () => {} : useLayoutEffect

interface ImageProps {
  src: string
  srcSet?: string
  sizes?: string
  blurDataUrl?: string
  className?: string
  outterClassName?: string
  alt: string
  title?: string
  objectFit?: 'cover' | 'fill'
  objectPosition?: 'center'
}

// ref: https://github.com/kentcdodds/kentcdodds.com/blob/main/app/components/blurrable-image.tsx

export const Image = ({
  src,
  srcSet,
  sizes,
  blurDataUrl,
  alt,
  title,
  objectFit,
  objectPosition,
  className,
  outterClassName,
}: ImageProps) => {
  const [visible, setVisible] = useState(false)
  const jsImgElRef = useRef<HTMLImageElement>(null)

  useSSRLayoutEffect(() => {
    if (jsImgElRef.current?.complete) setVisible(true)
  }, [])

  useEffect(() => {
    if (!jsImgElRef.current) return
    if (jsImgElRef.current.complete) return

    let current = true
    jsImgElRef.current.addEventListener('load', () => {
      if (!jsImgElRef.current || !current) return
      setTimeout(() => {
        setVisible(true)
      }, 0)
    })

    return () => {
      current = false
    }
  }, [])

  const img = (
    <img
      alt={alt}
      src={src}
      title={title}
      srcSet={srcSet}
      sizes={sizes}
      className={clsx(
        {
          'object-cover': objectFit === 'cover',
          'object-fill': objectFit === 'fill',
          'object-center': objectPosition === 'center',
        },
        className,
      )}
    />
  )

  const jsImgEl = cloneElement(img, {
    ref: jsImgElRef,
    className: clsx(img.props.className, 'transition-opacity', {
      'opacity-0': !visible,
    }),
  })

  return (
    <div className={outterClassName}>
      {blurDataUrl ? (
        <>
          <img
            key={blurDataUrl}
            src={blurDataUrl}
            className={img.props.className}
            alt={img.props.alt}
            title={img.props.title}
          />
          <div className={clsx(img.props.className, 'backdrop-blur-xl')} />
        </>
      ) : null}
      {jsImgEl}
      <noscript>{img}</noscript>
    </div>
  )
}
