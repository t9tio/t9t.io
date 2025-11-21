'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Home() {
    const typedWordRef = useRef(null)
    const cursorRef = useRef(null)

    useEffect(() => {
        const words = ['transparent', 't9t', 'transparent']
        let wordIndex = 0
        let isDeleting = false
        let charIndex = 0
        let timeoutId

        function type() {
            const fullWord = words[wordIndex]

            if (isDeleting) {
                charIndex--
            } else {
                charIndex++
            }

            if (typedWordRef.current) {
                typedWordRef.current.textContent = fullWord.substring(0, charIndex)
            }

            let typeSpeed = 100

            if (isDeleting) {
                typeSpeed = 50
            }

            if (!isDeleting && charIndex === fullWord.length) {
                // If it's the last word, stop
                if (wordIndex === words.length - 1) {
                    if (cursorRef.current) {
                        cursorRef.current.style.display = 'none'
                    }
                    return
                }
                typeSpeed = 2000
                isDeleting = true
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false
                wordIndex++
                typeSpeed = 500
            }

            timeoutId = setTimeout(type, typeSpeed)
        }

        timeoutId = setTimeout(type, 1000)

        return () => clearTimeout(timeoutId)
    }, [])

    return (
        <>
            <nav className="fixed top-0 left-0 w-full bg-white border-b border-black/10 z-10">
                <div className="max-w-[1200px] w-full mx-auto px-8 py-2.5 flex justify-between items-center">
                    <Link href="/" className="flex items-center no-underline">
                        <img src="/favicon.ico" alt="T9T Logo" className="w-8 h-8 rounded-md" />
                    </Link>
                    <div className="flex gap-6">
                        <a href="mailto:tim@t9t.io" className="no-underline text-gray-500 text-sm font-medium transition-colors duration-200 hover:text-gray-900">
                            Contact
                        </a>
                        <a href="https://blog.t9t.io" className="no-underline text-gray-500 text-sm font-medium transition-colors duration-200 hover:text-gray-900">
                            Blog
                        </a>
                    </div>
                </div>
            </nav>

            <div className="max-w-[1200px] w-full mx-auto px-8 pb-16 pt-40">
                <header className="text-center mb-32 relative block">
                    <div>
                        <h1 className="text-[3.5rem] font-bold mb-6 tracking-[-0.03em] leading-[1.1] text-gray-900 whitespace-nowrap max-md:whitespace-normal max-md:text-[2.5rem]">
                            We build <span className="font-mono text-accent relative" ref={typedWordRef}></span>
                            <span className="inline-block w-0.5 h-[1em] bg-accent ml-1 align-middle animate-blink" ref={cursorRef}></span> startups.
                        </h1>
                        <p className="font-mono text-base text-gray-500 mt-8 opacity-90">Transparent from idea -&gt; product -&gt; monetization</p>
                        <div className="flex gap-4 items-center mt-8 justify-center">
                            <a href="https://blog.t9t.io" className="px-5 py-2.5 bg-transparent text-gray-900 no-underline border border-gray-200 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer font-sans hover:bg-gray-50 hover:border-gray-500 hover:-translate-y-px">
                                Blog
                            </a>
                            <a href="#" className="px-5 py-2.5 bg-gray-900 text-white no-underline border border-gray-900 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer font-sans hover:bg-black hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:-translate-y-px">
                                Join Community
                            </a>
                        </div>
                    </div>
                </header>

                <section className="mb-40 opacity-0 translate-y-5 animate-fade-up [animation-delay:0.2s]">
                    <h2 className="text-2xl font-semibold mb-12 tracking-[-0.02em] text-gray-900 flex items-center gap-4 after:content-[''] after:h-px after:flex-1 after:bg-gray-200">Principles</h2>
                    <ul className="list-none grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
                        <li className="bg-white border border-gray-200 p-8 rounded-xl transition-all duration-300 ease-out hover:border-accent hover:bg-gray-50">
                            <div className="font-mono text-base font-semibold text-gray-900 mb-3">01. Novel</div>
                            <div className="text-sm text-gray-500">Bring something new to the world</div>
                        </li>
                        <li className="bg-white border border-gray-200 p-8 rounded-xl transition-all duration-300 ease-out hover:border-accent hover:bg-gray-50">
                            <div className="font-mono text-base font-semibold text-gray-900 mb-3">02. Personal</div>
                            <div className="text-sm text-gray-500">Solve my own problem first</div>
                        </li>
                        <li className="bg-white border border-gray-200 p-8 rounded-xl transition-all duration-300 ease-out hover:border-accent hover:bg-gray-50">
                            <div className="font-mono text-base font-semibold text-gray-900 mb-3">03. Simple</div>
                            <div className="text-sm text-gray-500">Focus on one problem</div>
                        </li>
                        <li className="bg-white border border-gray-200 p-8 rounded-xl transition-all duration-300 ease-out hover:border-accent hover:bg-gray-50">
                            <div className="font-mono text-base font-semibold text-gray-900 mb-3">04. Monetizable</div>
                            <div className="text-sm text-gray-500">People can pay for value</div>
                        </li>
                        <li className="bg-white border border-gray-200 p-8 rounded-xl transition-all duration-300 ease-out hover:border-accent hover:bg-gray-50">
                            <div className="font-mono text-base font-semibold text-gray-900 mb-3">05. Open-source</div>
                            <div className="text-sm text-gray-500">Build together with users</div>
                        </li>
                        <li className="bg-white border border-gray-200 p-8 rounded-xl transition-all duration-300 ease-out hover:border-accent hover:bg-gray-50">
                            <div className="font-mono text-base font-semibold text-gray-900 mb-3">06. Sustainable</div>
                            <div className="text-sm text-gray-500">Low maintenance by design</div>
                        </li>
                    </ul>
                </section>

                <section className="mb-40 opacity-0 translate-y-5 animate-fade-up [animation-delay:0.4s]">
                    <h2 className="text-2xl font-semibold mb-12 tracking-[-0.02em] text-gray-900 flex items-center gap-4 after:content-[''] after:h-px after:flex-1 after:bg-gray-200">Projects</h2>
                    <ul className="list-none grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8">
                        <li className="bg-white border border-gray-200 rounded-2xl transition-all duration-300 cubic-[0.2,0.8,0.2,1] overflow-hidden relative hover:border-accent hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08)]">
                            <a href="https://star-history.com" target="_blank" rel="noopener noreferrer" className="no-underline text-inherit block p-10 h-full">
                                <div className="text-xl font-semibold mb-2 text-gray-900 tracking-[-0.01em]">Star History</div>
                                <div className="font-mono text-xs text-accent mb-6 opacity-90">star-history.com</div>
                                <div className="text-[0.95rem] text-gray-500 leading-relaxed">
                                    Track GitHub project stars over time with beautiful charts
                                </div>
                            </a>
                        </li>
                        <li className="bg-white border border-gray-200 rounded-2xl transition-all duration-300 cubic-[0.2,0.8,0.2,1] overflow-hidden relative hover:border-accent hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08)]">
                            <a href="https://puzi.io" target="_blank" rel="noopener noreferrer" className="no-underline text-inherit block p-10 h-full">
                                <div className="text-xl font-semibold mb-2 text-gray-900 tracking-[-0.01em]">Puzi</div>
                                <div className="font-mono text-xs text-accent mb-6 opacity-90">puzi.io</div>
                                <div className="text-[0.95rem] text-gray-500 leading-relaxed">A simple puzzle game to challenge your mind</div>
                            </a>
                        </li>
                        <li className="bg-white border border-gray-200 rounded-2xl transition-all duration-300 cubic-[0.2,0.8,0.2,1] overflow-hidden relative hover:border-accent hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08)]">
                            <a href="https://bambot.org" target="_blank" rel="noopener noreferrer" className="no-underline text-inherit block p-10 h-full">
                                <div className="text-xl font-semibold mb-2 text-gray-900 tracking-[-0.01em]">BamBot</div>
                                <div className="font-mono text-xs text-accent mb-6 opacity-90">bambot.org</div>
                                <div className="text-[0.95rem] text-gray-500 leading-relaxed">
                                    Open-source robot arm for learning and experimentation
                                </div>
                            </a>
                        </li>
                        <li className="bg-white border border-gray-200 rounded-2xl transition-all duration-300 cubic-[0.2,0.8,0.2,1] overflow-hidden relative hover:border-accent hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08)]">
                            <a href="https://openprompt.co" target="_blank" rel="noopener noreferrer" className="no-underline text-inherit block p-10 h-full">
                                <div className="text-xl font-semibold mb-2 text-gray-900 tracking-[-0.01em]">OpenPrompt</div>
                                <div className="font-mono text-xs text-accent mb-6 opacity-90">openprompt.co</div>
                                <div className="text-[0.95rem] text-gray-500 leading-relaxed">
                                    Share and discover AI prompts from the community
                                </div>
                            </a>
                        </li>
                    </ul>
                </section>

                <section className="mb-40 opacity-0 translate-y-5 animate-fade-up [animation-delay:0.6s]">
                    <h2 className="text-2xl font-semibold mb-12 tracking-[-0.02em] text-gray-900 flex items-center gap-4 after:content-[''] after:h-px after:flex-1 after:bg-gray-200">Partnerships</h2>
                    <ul className="list-none grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8">
                        <li className="bg-white border border-gray-200 rounded-2xl transition-all duration-300 cubic-[0.2,0.8,0.2,1] overflow-hidden relative hover:border-accent hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08)]">
                            <a href="https://example-partner1.com" target="_blank" rel="noopener noreferrer" className="no-underline text-inherit block p-10 h-full">
                                <div className="text-xl font-semibold mb-2 text-gray-900 tracking-[-0.01em]">Partner Name 1</div>
                                <div className="font-mono text-xs text-accent mb-6 opacity-90">example-partner1.com</div>
                                <div className="text-[0.95rem] text-gray-500 leading-relaxed">
                                    Brief description of the partnership and collaboration
                                </div>
                            </a>
                        </li>
                        <li className="bg-white border border-gray-200 rounded-2xl transition-all duration-300 cubic-[0.2,0.8,0.2,1] overflow-hidden relative hover:border-accent hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.08)]">
                            <a href="https://example-partner2.com" target="_blank" rel="noopener noreferrer" className="no-underline text-inherit block p-10 h-full">
                                <div className="text-xl font-semibold mb-2 text-gray-900 tracking-[-0.01em]">Partner Name 2</div>
                                <div className="font-mono text-xs text-accent mb-6 opacity-90">example-partner2.com</div>
                                <div className="text-[0.95rem] text-gray-500 leading-relaxed">
                                    Brief description of the partnership and collaboration
                                </div>
                            </a>
                        </li>
                    </ul>
                </section>

                <footer className="mt-32 py-16 text-center border-t border-gray-200">
                    <a href="https://github.com/timqian" target="_blank" rel="noopener noreferrer" className="text-gray-500 no-underline font-mono text-sm transition-colors duration-200 hover:text-gray-900">
                        @timqian
                    </a>
                </footer>
            </div>
        </>
    )
}
