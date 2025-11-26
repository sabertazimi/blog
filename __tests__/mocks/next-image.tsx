import { vi } from 'vitest'

const MockImage = vi.fn(
  ({
    src,
    alt,
    fill,
    priority,
    unoptimized,
    ...props
  }: {
    src: string | { src: string }
    alt: string
    fill?: boolean
    priority?: boolean
    unoptimized?: boolean
    [key: string]: unknown
  }) => {
    // eslint-disable-next-line next/no-img-element -- mock image for testing
    return <img src={typeof src === 'string' ? src : src.src} alt={alt} {...props} />
  },
)

vi.mock('next/image', () => ({
  default: MockImage,
}))

export { MockImage }
