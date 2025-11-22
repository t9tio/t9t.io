'use client'

import Link from 'next/link'
import Navbar from './navbar'
import GitHubButton from 'react-github-btn'
import { dictionary } from '../lib/dictionary'

export default function HomeContent({ lang }) {
    const dict = dictionary[lang]

    const formatPartners = (text) => {
        if (!text) return null
        return text.split(/(@[\w]+)/g).map((part, i) => {
            if (part.startsWith('@')) {
                const handle = part.substring(1)
                return (
                    <a
                        key={i}
                        href={`https://x.com/${handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 hover:text-accent transition-colors no-underline"
                    >
                        {part}
                    </a>
                )
            }
            return part
        })
    }

    return (
        <>
            <Navbar lang={lang} dict={dict} />

            <div className="max-w-[1200px] w-full mx-auto px-8 pb-16 pt-40">
                <header className="text-center mb-32 relative block">
                    <div>
                        <h1 className="text-[3.2rem] font-bold mb-6 tracking-[-0.03em] leading-[1.1] text-gray-900 whitespace-nowrap max-md:whitespace-normal max-md:text-[2.5rem]">
                            <span className="font-mono text-accent">{dict.hero.prefix}</span><span className="font-mono">{dict.hero.suffix}</span>
                        </h1>
                        <p className="font-mono text-base text-gray-500 mt-8 opacity-90">{dict.hero.tagline}</p>
                        <div className="flex gap-4 items-center mt-8 justify-center">
                            <Link href={`/blog/${lang}`} className="px-5 py-2.5 bg-transparent text-gray-900 no-underline border border-gray-200 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer font-sans hover:bg-gray-50 hover:border-gray-500 hover:-translate-y-px">
                                {dict.nav.blog}
                            </Link>
                            <a href="#" className="px-5 py-2.5 bg-gray-900 text-white no-underline border border-gray-900 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer font-sans hover:bg-black hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-px">
                                {dict.hero.join}
                            </a>
                        </div>
                    </div>
                </header>

                <section className="mb-40 opacity-0 translate-y-5 animate-fade-up [animation-delay:0.2s]">
                    <h2 className="text-2xl font-semibold mb-12 tracking-[-0.02em] text-gray-900 flex items-center gap-4 after:content-[''] after:h-px after:flex-1 after:bg-gray-200">{dict.principles.title}</h2>
                    <ul className="list-none grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                        {dict.principles.items.map((item, index) => (
                            <li key={index} className="bg-white border border-gray-200 p-8 rounded-xl transition-all duration-300 ease-out hover:border-accent hover:bg-gray-50">
                                <div className="font-mono text-base font-semibold text-gray-900 mb-3">{item.title}</div>
                                <div className="text-sm text-gray-500">{item.desc}</div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section id="projects" className="mb-40 opacity-0 translate-y-5 animate-fade-up [animation-delay:0.4s] scroll-mt-24">
                    <h2 className="text-2xl font-semibold mb-12 tracking-[-0.02em] text-gray-900 flex items-center gap-4 after:content-[''] after:h-px after:flex-1 after:bg-gray-200">{dict.projects.title}</h2>
                    <ul className="list-none grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8">
                        {dict.projects.items.map((item, index) => (
                            <li key={index} className="bg-white border border-gray-200 rounded-2xl transition-all duration-300 cubic-[0.2,0.8,0.2,1] overflow-hidden relative hover:border-accent hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08)]">
                                <div className="p-8 h-full">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-gray-900 tracking-[-0.01em] hover:text-accent transition-colors no-underline block mb-1">
                                                {item.name}
                                            </a>
                                            
                                        </div>
                                        {item.repo && (
                                            <div className="flex-shrink-0">
                                                <GitHubButton
                                                    href={`https://github.com/${item.repo}`}
                                                    data-color-scheme="no-preference: light; light: light; dark: dark;"
                                                    data-size="large"
                                                    data-show-count="true"
                                                    aria-label={`Star ${item.repo} on GitHub`}
                                                >
                                                    Star
                                                </GitHubButton>
                                            </div>
                                        )}
                                    </div>
                                    <div className="font-mono text-xs text-accent opacity-90 mb-4">{item.url}</div>
                                    <div className="text-[0.95rem] text-gray-500 leading-relaxed mt-auto">
                                        {item.desc}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mb-40 opacity-0 translate-y-5 animate-fade-up [animation-delay:0.6s]">
                    <h2 className="text-2xl font-semibold mb-12 tracking-[-0.02em] text-gray-900 flex items-center gap-4 after:content-[''] after:h-px after:flex-1 after:bg-gray-200">{dict.partnerships.title}</h2>

                    <div className="mb-12">
                        <a href="mailto:timqian@t9t.io" className="text-lg text-gray-900 hover:text-accent transition-colors no-underline font-medium">
                            {dict.partnerships.contact.desc} <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>

                    <ul className="list-none border-l border-gray-200 ml-3 space-y-12">
                        {dict.partnerships.items.map((item, index) => (
                            <li key={index} className="group relative pl-8">
                                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-white"></div>
                                <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-start">
                                    <div className="font-mono text-sm text-gray-400 flex-shrink-0 w-16 pt-1">{item.time}</div>

                                    <div className="flex-grow min-w-0">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xl font-semibold text-gray-900 tracking-[-0.01em] hover:text-accent transition-colors no-underline">
                                                {item.name}
                                            </a>
                                            {item.repo && (
                                                <div className="flex-shrink-0 scale-90 origin-left opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <GitHubButton
                                                        href={`https://github.com/${item.repo}`}
                                                        data-color-scheme="no-preference: light; light: light; dark: dark;"
                                                        data-size="large"
                                                        data-show-count="true"
                                                        aria-label={`Star ${item.repo} on GitHub`}
                                                    >
                                                        Star
                                                    </GitHubButton>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-[0.95rem] text-gray-600 mb-3 leading-relaxed">{item.desc}</div>
                                        <div className="font-mono text-xs text-gray-400">
                                            with <span className="text-gray-500">{formatPartners(item.partners)}</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                <footer className="mt-32 py-16 text-center border-t border-gray-200">
                    <a href="https://github.com/timqian" target="_blank" rel="noopener noreferrer" className="text-gray-500 no-underline font-mono text-sm transition-colors duration-200 hover:text-gray-900">
                        by @timqian
                    </a>
                </footer>
            </div>
        </>
    )
}
