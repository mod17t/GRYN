import { Calculator, TrendingDown, Trophy } from "lucide-react";

function Fonctionnalites() {
    return (
        <>
            {/* spacer for fixed navbar */}

            

            <main className='bg-white pt-6 md:pt-12'>
                <section className='rounded-2xl flex items-center justify-center flex-col text-center px-6 py-12 mx-auto max-w-7xl'>
                    <h1 className='text-black font-normal text-xl lg:text-lg'>
                        Nos fonctionnalités principales
                    </h1>
                    <p className='text-gray-500 font-normal lg:text-base mt-4 max-w-2xl'>
                        Des outils simples et efficaces pour vous aider à comprendre et réduire votre impact environnemental
                    </p>
                </section>

                <section className='mx-auto max-w-7xl grid grid-cols-1 gap-6 md:grid-cols-3 px-6 pb-16'>
                    <article className='rounded-2xl border border-gray-200 bg-white p-6 md:p-8 hover:shadow-lg shadow-green-500/50 transition'>
                        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600'>
                            <Calculator className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <h2 className='mt-6 text-lg font-semibold text-gray-900'>Calculateur d'empreinte carbone</h2>
                        <p className='mt-4 text-gray-500'>
                            Calculez facilement votre empreinte carbone grâce à notre outil convivial et précis.
                        </p>
                    </article>

                    <article className='rounded-2xl border border-gray-200 bg-white p-6 md:p-8 hover:shadow-lg shadow-blue-500/50 transition'>
                        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600'>
                            <TrendingDown className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <h2 className='mt-6 text-lg font-semibold text-gray-900'>Suivi personnalisé</h2>
                        <p className='mt-4 text-gray-500'>
                            Suivez l'évolution de vos émissions au fil du temps et visualisez vos progrès.
                        </p>
                    </article>
                    
                    <article className='rounded-2xl border border-gray-200 bg-white p-6 md:p-8 hover:shadow-lg shadow-yellow-500/50 transition'>
                        <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-yellow-600'>
                            <Trophy className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <h2 className='mt-6 text-lg font-semibold text-gray-900'>Challenges écologiques</h2>
                        <p className='mt-4 text-gray-500'>
                            Relevez des défis et gagnez des badges pour vos efforts écologiques.
                        </p>
                    </article>
                </section>
            </main>
        </>
    )
}

export default Fonctionnalites
