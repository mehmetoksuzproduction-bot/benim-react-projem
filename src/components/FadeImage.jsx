import { useState } from 'react'

// Fotoğraf yüklenince birden değil, yavaşça belirir.
export default function FadeImage({ className = '', ...props }) {
  const [loaded, setLoaded] = useState(false)
  const show = () => setLoaded(true)
  return <img {...props} className={`fade-image${loaded ? ' is-loaded' : ''} ${className}`.trim()} onLoad={show} onError={show} />
}
