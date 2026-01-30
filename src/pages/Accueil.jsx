import React, { useState, useEffect } from 'react'
import { Leaf } from 'lucide-react';
import { AiOutlineArrowRight } from "react-icons/ai";
import { FiTrendingDown } from "react-icons/fi";
import Heroimage from '../assets/hero-image.jpg'
import Fonctionnalites from '../components/UI/Fonctionnalites.jsx';
import Marche from '../components/UI/Marche.jsx';
import Categorie from '../components/UI/Categorie.jsx';
import Difference from '../components/UI/difference.jsx';

function Hero() {
    const [msg, setMsg] = useState("");

    useEffect(() => {
        fetch('http://localhost:8000/api/test')
            .then(response => response.json())
            .then(data => {
                setMsg(data.message);
            })
    }, []);

    return (    
        <>
        <section className='bg-white text-emerald-700 px-8 py-1 pt-30 md:pt-20'>
            <div className='mx-auto max-w-7xl flex flex-col-reverse items-center gap-8 md:flex-row md:items-center'>
                <div className='w-full md:w-1/2 space-y-6 -mb-8'>
                    {msg && (
                        
                        <>
                            
                            <span className='inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700 sm:mt-30'>
                                <Leaf className=' h-4 w-4 text-green-600 mr-2' />
                                {msg}
                            </span>
                        </>
                    )}
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-normal text-gray-900 leading-tight">
                        Suivez et réduisez votre <span className="text-green-600">empreinte carbone</span>
                    </h1>

                    <p className='text-gray-600 text-base sm:text-lg'>
                        Calculez vos émissions de CO₂, suivez votre progression et relevez des défis écologiques pour contribuer à un monde plus vert.
                    </p>

                    <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                        <button aria-label="Commencer le calcul" className='w-full sm:w-auto rounded-lg bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2'>
                            Commencer le calcul <AiOutlineArrowRight className='h-5 w-5' />
                        </button>
                        <button aria-label="En savoir plus" className='w-full sm:w-auto rounded-lg border border-green-600 px-6 py-3 text-green-600 font-semibold hover:bg-green-50 transition'>
                            En savoir plus
                        </button>
                    </div>
                </div>

                <div className='relative w-full md:w-1/2 md:mt-30'>
                    <img 
                        src={Heroimage} 
                        alt="Personnes plantant des arbres pour réduire les émissions" 
                        className='w-full h-64 sm:h-80 md:h-auto rounded-3xl object-cover shadow-lg'
                    />

                    <div className='absolute left-4 bottom-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl md:left-8 md:bottom-8'>
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600'>
                            <FiTrendingDown className='h-5 w-5' />
                        </div>
                        <div>
                            <p className='text-sm text-gray-500'>Réduction moyenne d'émissions</p>
                            <p className='text-base sm:text-lg font-semibold text-gray-900'>25% par utilisateur</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <Fonctionnalites />

        <Marche />
        
        <Categorie />

        <Difference/>
        </>
    )
}

export default Hero
