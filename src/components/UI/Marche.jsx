import { Calculator, TrendingDown, Trophy} from 'lucide-react';
import React from 'react'

function Marche() {

    const Steps = [
        {
            number: 1,
            icon: Calculator,
            title : "Calculez vos émissions",
            description: "Entrez vos données de transport, alimentation, énergie et consommation",
            color: "emerald"
        },
        {
            number: 2,
            icon: TrendingDown,
            title : "Analysez vos résultats",
            description: "Visualisez votre empreinte carbone avec des graphiques détaillés",
            color: "emerald"
        },
        {
            number: 3,
            icon: Trophy,
            title : "Relevez des défis",
            description: "Participez à des challenges pour réduire votre impact",
            color: "emerald"
        }
    ];


    return (
        <>
            {/* spacer for fixed navbar */}

            <div className='h-13 md:h-3 bg-white' aria-label='True'/>

            <main className='bg-white'>
                <section>
                    <div className='rounded-2xl flex items-center justify-center flex-col text-center px-6 py-12 mx-auto max-w-7xl'>
                        <h1 className='text-black font-normal text-xl  lg:text-lg'>
                            Comment ça marche ?
                        </h1>
                        <p className='text-gray-500 font-normal lg:text-base mt-4 max-w-2xl'>
                            Trois étapes simples pour commencer votre voyage vers un mode de vie plus durable
                        </p>
                    </div>
                </section>

                <div className="p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Steps.map((step, index) => (
                            <div key={step.number} className="relative">
                            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                                <div className="flex items-start gap-4 mb-4">
                                <div className="shrink-0 w-14 h-14 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xl font-semibold">
                                    {step.number}
                                </div>
                                <div className="shrink-0 w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center">
                                    <step.icon className="w-6 h-6 text-emerald-600" strokeWidth={2} />
                                </div>
                                </div>
                                
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                {step.title}
                                </h3>
                                
                                <p className="text-gray-600 leading-relaxed">
                                {step.description}
                                </p>
                            </div>
                            
                            {index < Steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-linear-to-r from-emerald-200 to-transparent" />
                            )}
                            </div>
                        ))}
                        </div>
                    </div>
                </div>



            </main>
        </>
    )
}

export default Marche
