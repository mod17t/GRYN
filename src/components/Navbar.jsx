import React, { useState, useEffect } from 'react'
import Logo from '../assets/logo.png'
import { IoMenu, IoClose } from "react-icons/io5";
import { ArrowRight } from 'lucide-react';

function Navbar() {
    const navigation = [
        { name: 'Accueil', link: '/' },
        { name: 'Calculateur', link: '/calculateur'},
        { name: 'Challenges', link: '/challenges'},
        { name: 'Profil', link: '/Profil'},
        { name: 'À propos', link: '/about' },
    ]




    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])


    return (
        <>
            <div className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${
                scrolled 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white shadow-md'
            }`}>
                <header className='container mx-auto rounded-2xl'>
                    <nav 
                        aria-label='Global' 
                        className={`flex items-center justify-between transition-all duration-300 ${
                            scrolled 
                                ? 'p-2 sm:p-2 lg:px-6' 
                                : 'p-4 sm:p-3 lg:px-8'
                        }`}
                    >
                        <div className='flex lg:flex-1'>
                            <a href="/" className='-m-1.5 p-1.5 flex items-center'>
                                <img 
                                    src={Logo}
                                    alt="Gryn"
                                    className={`w-auto transition-all duration-300 ${
                                        scrolled 
                                            ? 'h-8 md:h-10' 
                                            : 'h-10 md:h-12'
                                    }`}
                                />
                                <span className='text-xl font-semibold text-black'>Gryn</span>
                            </a>
                        </div>

                        <div className='flex lg:hidden'>
                            <button
                                type='button'
                                className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                                onClick={() => setMobileMenuOpen(true)}
                                aria-expanded={mobileMenuOpen}
                                aria-controls='mobile-menu'
                            >
                                <span className='sr-only'>Open main menu</span>
                                <IoMenu className='h-6 w-6 hover:text-emerald-600' aria-hidden="true"/>
                            </button>
                        </div>

                        <div className='hidden lg:flex gap-x-10'>
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.link}
                                    className='group relative text-sm font-semibold text-gray-600 transition hover:text-green-700'
                                >
                                    {item.name}
                                    <span className='absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-green-700 transition-transform duration-300 group-hover:scale-x-100' />
                                </a>
                            ))}
                        </div>

                        <div className='hidden lg:flex ml-10 py-6'>
                            <a href="#"
                            className='flex items-center justify-center text-center group relative text-sm font-semibold text-gray-600 transition hover:text-red-700'
                            >
                                Log in 
                                <ArrowRight className='ml-2 w-4 h-4 mt-1' />
                                <span className='absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-red-700 transition-transform duration-300 group-hover:scale-x-100' />
                            </a>
                        </div>
                    </nav>
                </header>

                {/* Mobile menu panel */}
                {mobileMenuOpen && (
                    <div id='mobile-menu' className='lg:hidden'>
                        <div className='fixed inset-0 z-20 bg-black/30' onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
                        <div className='fixed top-0 right-0 z-30 w-full max-w-sm h-full bg-white shadow-lg'>
                            <div className='flex items-center justify-between p-4'>
                                <a href='/' className='flex items-center -m-1.5 p-1.5'>
                                    <img src={Logo} alt='Gryn' className='h-10 md:h-12 w-auto' />
                                    <span className='ml-2 text-lg font-semibold text-black'>Gryn</span>
                                </a>
                                <button
                                    type='button'
                                    aria-label='Close menu'
                                    className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700'
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <IoClose className='h-6 w-6' aria-hidden="true" />
                                </button>
                            </div>
                            <div className='px-4 pb-6'>
                                <nav className='space-y-1' aria-label='Mobile'>
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.link}
                                            className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50'
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Navbar