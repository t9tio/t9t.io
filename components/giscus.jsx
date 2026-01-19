'use client'

import { useEffect, useRef } from 'react'

export default function Giscus({ lang = 'zh-CN' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 't9tio/t9t.io')
    script.setAttribute('data-repo-id', 'MDEwOlJlcG9zaXRvcnkxNjg4NDI4NDM=')
    script.setAttribute('data-category', 'Announcements')
    script.setAttribute('data-category-id', 'DIC_kwDOChBWW84C1Izq')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'light')
    script.setAttribute('data-lang', lang === 'zh' ? 'zh-CN' : 'en')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    ref.current.appendChild(script)
  }, [lang])

  return <div ref={ref} className="mt-10" />
}
