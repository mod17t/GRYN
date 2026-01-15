import React from 'react'
import { Icon, Leaf} from 'lucide-react'
import { Twitter, Mail, Github} from 'lucide-react';

import Logo from './../../assets/logo.png'

export default function Footer() {

    const Navigation = [
        {name: "Accueil", Link: '/'},
        {name: "Calculateur", Link: '/calculateur'},
        {name: "Challenges", Link: '/challenges'},
        {name: "Profil", Link: '/profil'}
    ];

    const Ressources = [
            { name: 'À propos', link: '/àpropos' },
            { name: 'Documentation', link: '/docs' },
            { name: 'FAQ', link: '/faq' },
            { name: 'Contact', link: '/contact' },

    ];

    const SocialLinks = [
        {name: "X", icons:Twitter, Link: "/" },
        {name: "GitHub", icons:Github, Link: "/" },
        {name: "Email", icons:Mail, Link: "/" },
    ] 


    return (
        <>
            <footer className='bg-slate-900 text-gray-400'>
                <section className='mx-auto max-w-7xl px-6 sm:px-10 lg:px-20 py-12 md:py-16'>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
                        <div className='space-y-4'>
                            <div className='flex items-center'>
                                <img 
                                src={Logo} 
                                alt="Logo"
                                className='h-10 md:h-12 w-auto'
                                />
                                <span className='text-xl font-semibold text-white'>Gryn</span>
                            </div>
                            <p className='text-sm leading-relaxed'>
                                Suivez et réduisez votre empreinte carbone pour un avenir plus durable.
                            </p>

                            <div className='flex items-center text-emerald-400'>
                                <Leaf className='w-5 h-5 mr-2'/>
                                <p className='text-base font-medium'>
                                    Agir pour la planète
                                </p>
                            </div>
                        </div>


                        {/* Navigation */}
                        <div>
                            <h4 className='text-white font-semibold mb-4'>
                                Navigation
                            </h4>

                            <ul className='space-y-2'>
                                {Navigation.map((item) => (
                                    <li key={item.name}>
                                        <a 
                                        href={item.Link}
                                        className='text-sm hover:text-emerald-400 transition-colors duration-200'
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* Ressources*/}

                        <div>
                            <h4 className='text-white font-semibold mb-4'>
                                Ressources
                            </h4>

                            <ul className='space-y-2'>
                                {Ressources.map((item) =>(
                                    <li key={item.name}>
                                        <a 
                                        href={item.link}
                                        className='text-sm hover:text-emerald-400 transition-colors duration-200'
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        {/* SocialLinks */}

                        <div>
                            <h4 className='text-white font-semibold mb-4'>Suivez-nous</h4>
                            <div className='flex space-x-4'>
                                {SocialLinks.map((social) => {
                                    const Icon = social.icons;
                                    return (
                                        <a 
                                        key={social.name}
                                        href={social.Link}
                                        aria-label={social.name}
                                        className='w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-500 transition-colors duration-200 group'
                                        >
                                            <Icon className='text-white'/>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className='mt-12 pt-8 border-t border-slate-800'>
                        <p className='text-sm text-gray-40000 flex items-center text-center justify-center gap-2 flex-wrap'>
                            © 2026 Gryn. Tous droits réservés. Agissons ensemble pour la planète 
                            <span className='text-xl'>🌍</span>
                        </p>
                    </div>
                </section>
            </footer>
        </>
    )
}
