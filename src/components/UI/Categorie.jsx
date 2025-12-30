import React from 'react'
import { Car, Leaf, BatteryCharging, ShoppingBag} from 'lucide-react';
import { Description } from '@headlessui/react';

function Categorie() {

    const Categories = [
        {
            icon: Car,
            title: "Transport",
            Description: "Voiture, train, avion",
            color : "blue"
        },

        {
            icon: Leaf,
            title: "Alimentation",
            Description: "Régime alimentaire",
            color : "green"
        },

        {
            icon: BatteryCharging,
            title: "Énergie",
            Description: "Électricité, chauffage",
            color : "yellow"
        },

        {
            icon: ShoppingBag,
            title: "Consommation",
            Description: "Achats, déchets",
            color : "purple"
        }
    ];

    const ColorClasses = {
        blue: {
            bg: "bg-blue-100",
            icon: "bg-blue-400"
        },
        green: {
            bg: "bg-green-100",
            icon: "bg-green-400"
        },
        yellow: {
            bg: "bg-yellow-100",
            icon: "bg-yellow-400"
        },
        purple: {
            bg: "bg-purple-100",
            icon: "bg-purple-400"
        }
    }



    return (
        <>
            {/* spacer for fixed navbar */}

            <div className='h-13 md:h-3' aria-label='True'/>

            <main className='bg-white'>
                <section className='rounded-2xl flex items-center justify-center flex-col text-center px-6 py-12 mx-auto max-w-7xl'>
                    <h1 className='text-black font-normal text-xl lg:text-lg'>
                        Catégories Suivies
                    </h1>
                    <p className='text-gray-500 font-normal lg:text-base mt-4 max-w-2xl'>
                        Analysez votre impact dans les quatre domaines principaux de votre vie quotidienne
                    </p>
                </section>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
                        {Categories.map((category, index) => (
                            <div 
                                key={index}
                                className={`bg-linear-to-br ${ColorClasses[category.color].bg} rounded-3xl p-8 flex flex-col items-center justify-center text-center hover:shadow-lg transition-shadow duration-200`}
                            >
                                <div className={`w-24 h-24 ${ColorClasses[category.color].icon} rounded-3xl flex items-center justify-center mb-6`}>
                                    <category.icon className="w-12 h-12 text-white" strokeWidth={2} />
                                </div>
                                
                                <h3 className="text-gray-900 text-xl font-semibold mb-2">
                                    {category.title}
                                </h3>
                                
                                <p className="text-gray-600 text-base">
                                    {category.Description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>


            </main>
        </>
    )
}

export default Categorie
