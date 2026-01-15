import React from 'react'
import { ArrowRight } from 'lucide-react';

function Difference() {
    return (
        <>
            <div className='h-13 md:h-18 bg-emerald-700' aria-label='spacer'/>

            <main className='bg-emerald-700 pt-18'>
                <section className='rounded-2xl flex items-center justify-center flex-col text-center px-6 py-12 mx-auto max-w-7xl'>
                    <h1 className='text-white font-normal text-xl lg:text-lg'>
                        Prêt à faire la différence ?
                    </h1>

                    <p className='text-gray-300 font-normal lg:text-lg mt-4 max-w-2xl'>
                        Rejoignez des milliers de personnes qui agissent pour réduire leur empreinte carbone
                    </p>

                    <div className='mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center'>
                        <button
                            aria-label='Calculer mon empreinte carbone'
                            className='w-full sm:w-auto rounded-lg bg-white px-6 py-3 text-emerald-600 font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2'
                        >
                            Calculer mon empreinte carbone <ArrowRight className='h-6 w-6' />
                        </button>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Difference
