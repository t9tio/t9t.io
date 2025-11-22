'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'

export default function Navbar({ lang, dict }) {
    const router = useRouter()
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)

    const switchLanguage = (newLang) => {
        localStorage.setItem('lang', newLang)
        const newPath = pathname.replace(`/${lang}`, `/${newLang}`)
        router.push(newPath)
        setIsOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <nav className="fixed top-0 left-0 w-full  backdrop-blur-md border-b border-black/5 z-10">
            <div className="max-w-[1200px] w-full mx-auto px-8 py-2.5 flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <Link href={`/${lang}`} className="flex items-center no-underline">
                        <img src="/favicon.ico" alt="T9T Logo" className="w-8 h-8 rounded-md" />
                    </Link>
                    <div className="flex gap-6 items-center">
                        <Link href={`/${lang}#projects`} className="no-underline text-gray-500 text-sm font-medium transition-colors duration-200 hover:text-gray-900">
                            {dict.nav.projects}
                        </Link>
                        <Link href={`/blog/${lang}`} className="no-underline text-gray-500 text-sm font-medium transition-colors duration-200 hover:text-gray-900">
                            {dict.nav.blog}
                        </Link>
                    </div>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center justify-center w-8 h-8 rounded hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900 cursor-pointer"
                        aria-label="Select Language"
                    >
                        <svg fill="none" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-20">
                            <button
                                onClick={() => switchLanguage('en')}
                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer ${lang === 'en' ? 'text-accent font-medium' : 'text-gray-700'}`}
                            >
                                English
                            </button>
                            <button
                                onClick={() => switchLanguage('zh')}
                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer ${lang === 'zh' ? 'text-accent font-medium' : 'text-gray-700'}`}
                            >
                                中文
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}
