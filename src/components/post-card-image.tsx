'use client'

import Image from 'next/image'
import { useState } from 'react'

interface PostCardImageProps {
  src: string
  alt: string
}

function PostCardImage({ src, alt }: PostCardImageProps) {
  const [error, setError] = useState(false)

  if (error) {
    return null
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-300 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => setError(true)}
    />
  )
}

export default PostCardImage
