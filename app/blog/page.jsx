'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function BlogRedirect() {
    const router = useRouter()

    useEffect(() => {
        const storedLang = localStorage.getItem('lang')
        const browserLang = navigator.language.startsWith('zh') ? 'zh' : 'en'
        const targetLang = storedLang || browserLang

        router.replace(`/blog/${targetLang}`)
    }, [router])

    return null
}
