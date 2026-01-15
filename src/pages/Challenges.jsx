import React, { useState } from 'react';
import { ArrowRight, TrendingDown, Calendar, Users } from 'lucide-react';

function Challenges() {
    const [activeTab, setActiveTab] = useState('actifs');

    const challengesActifs = [
        {
            id: 1,
            titre: "30 jours sans voiture",
            description: "Utilisez uniquement les transports en commun, le vélo ou la marche pendant 30 jours.",
            participants: 1247,
            duree: "30 jours",
            reduction: "150 kg CO₂",
            difficulte: "Moyen"
        },
        {
            id: 2,
            titre: "Semaine végétarienne",
            description: "Adoptez une alimentation 100% végétarienne pendant 7 jours.",
            participants: 2891,
            duree: "7 jours",
            reduction: "45 kg CO₂",
            difficulte: "Facile"
        },
        {
            id: 3,
            titre: "Zéro déchet plastique",
            description: "Évitez tout emballage plastique à usage unique pendant un mois.",
            participants: 856,
            duree: "30 jours",
            reduction: "80 kg CO₂",
            difficulte: "Difficile"
        }
    ];

    const challengesTermines = [
        {
            id: 4,
            titre: "Économie d'énergie",
            description: "Réduisez votre consommation d'électricité de 20%.",
            participants: 3421,
            duree: "Terminé",
            reduction: "200 kg CO₂ économisés",
            difficulte: "Moyen"
        }
    ];

    return (
        <>
            <section className='bg-white text-emerald-700 px-8 py-1 mt-20'>
                <div className='mx-auto max-w-7xl flex flex-col-reverse items-center gap-8 md:flex-row md:items-center'>
                    <div className='w-full md:w-1/2 space-y-6'>
                        <span className='inline-flex items-center rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700'>
                            Passez à l'action
                        </span>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-normal text-gray-900 leading-tight">
                            Relevez des <span className="text-green-600">défis écologiques</span>
                        </h1>
                        <p className='text-gray-600 text-base sm:text-lg'>
                            Rejoignez notre communauté et participez à des challenges pour réduire votre impact environnemental tout en gagnant des récompenses.
                        </p>
                        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
                            <button 
                                aria-label="Voir les challenges" 
                                className='w-full sm:w-auto rounded-lg bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2'
                            >
                                Voir les challenges <ArrowRight className='h-5 w-5' />
                            </button>
                        </div>
                    </div>

                    <div className='relative w-full md:w-1/2'>
                        <img 
                            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&auto=format&fit=crop" 
                            alt="Personnes participant à des défis écologiques" 
                            className='w-full h-64 sm:h-80 md:h-auto rounded-3xl object-cover shadow-lg'
                        />
                        <div className='absolute left-4 bottom-4 flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-xl md:left-8 md:bottom-8'>
                            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600'>
                                <Users className='h-5 w-5' />
                            </div>
                            <div>
                                <p className='text-sm text-gray-500'>Participants actifs</p>
                                <p className='text-base sm:text-lg font-semibold text-gray-900'>+5000 membres</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='bg-gray-50 px-8 py-16'>
                <div className='mx-auto max-w-7xl'>
                    <div className='flex gap-4 mb-8 border-b border-gray-200'>
                        <button
                            onClick={() => setActiveTab('actifs')}
                            className={`pb-4 px-4 font-semibold transition ${
                                activeTab === 'actifs'
                                    ? 'text-green-600 border-b-2 border-green-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Challenges actifs
                        </button>
                        <button
                            onClick={() => setActiveTab('termines')}
                            className={`pb-4 px-4 font-semibold transition ${
                                activeTab === 'termines'
                                    ? 'text-green-600 border-b-2 border-green-600'
                                    : 'text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Mes challenges terminés
                        </button>
                    </div>
                    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                        {(activeTab === 'actifs' ? challengesActifs : challengesTermines).map((challenge) => (
                            <div 
                                key={challenge.id} 
                                className='bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition'
                            >
                                <div className='flex items-start justify-between mb-4'>
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                                        challenge.difficulte === 'Facile' 
                                            ? 'bg-green-100 text-green-700' 
                                            : challenge.difficulte === 'Moyen'
                                            ? 'bg-yellow-100 text-yellow-700'
                                            : 'bg-red-100 text-red-700'
                                    }`}>
                                        {challenge.difficulte}
                                    </span>
                                </div>

                                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                                    {challenge.titre}
                                </h3>
                                <p className='text-gray-600 text-sm mb-4'>
                                    {challenge.description}
                                </p>

                                <div className='space-y-2 mb-4'>
                                    <div className='flex items-center gap-2 text-sm text-gray-500'>
                                        <Calendar className='h-4 w-4' />
                                        <span>{challenge.duree}</span>
                                    </div>
                                    <div className='flex items-center gap-2 text-sm text-gray-500'>
                                        <Users className='h-4 w-4' />
                                        <span>{challenge.participants} participants</span>
                                    </div>
                                    <div className='flex items-center gap-2 text-sm text-green-600 font-semibold'>
                                        <TrendingDown className='h-4 w-4' />
                                        <span>{challenge.reduction}</span>
                                    </div>
                                </div>

                                <button className='w-full rounded-lg bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700 transition'>
                                    {activeTab === 'actifs' ? 'Rejoindre le challenge' : 'Voir les détails'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className='bg-white px-8 py-16'>
                <div className='mx-auto max-w-7xl'>
                    <h2 className='text-3xl font-semibold text-gray-900 text-center mb-12'>
                        Impact collectif de notre communauté
                    </h2>
                    <div className='grid gap-8 md:grid-cols-3'>
                        <div className='text-center'>
                            <div className='inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4'>
                                <Users className='h-8 w-8' />
                            </div>
                            <p className='text-4xl font-bold text-gray-900 mb-2'>5,247</p>
                            <p className='text-gray-600'>Participants actifs</p>
                        </div>
                        <div className='text-center'>
                            <div className='inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4'>
                                <TrendingDown className='h-8 w-8' />
                            </div>
                            <p className='text-4xl font-bold text-gray-900 mb-2'>1,2M kg</p>
                            <p className='text-gray-600'>CO₂ économisé</p>
                        </div>
                        <div className='text-center'>
                            <div className='inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-4'>
                                <Calendar className='h-8 w-8' />
                            </div>
                            <p className='text-4xl font-bold text-gray-900 mb-2'>47</p>
                            <p className='text-gray-600'>Challenges complétés</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Challenges;