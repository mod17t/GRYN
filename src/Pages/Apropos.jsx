import React from 'react'
import { Target, Eye, Heart, Users, Leaf, Globe } from 'lucide-react';
import ProposImage from '../assets/proposImage.png'
export default function Apropos() {

 

  const valuer = [
    {
      icon : Leaf,
      title : "Écologie",
      description: "Nous plaçons la protection de l'environnement au cœur de toutes nos décisions"
    },

    {
      icon: Users,
      title: "Accessibilité",
      description: "Des outils simples et gratuits pour rendre l'action écologique accessible à tous"
    },

    {
      icon: Heart,
      title: "Engagement",
      description: "Nous nous engageons pour un avenir durable et encourageons chacun à agir"
    },

    {
      icon: Eye,
      title: "Impact globale",
      description: "Chaque action individuelle contribue à un changement collectif significatif"
    }
  ]

  const stats = [
    {numbers : "50K +", description : "Utilisateurs actifs"},
    {numbers : "2M +", description : "Tonnes de CO₂ réduites"},
    {numbers : "100K +", description : "Challenges relevés"},
    {numbers : "15K +", description : "Badges obtenus"},
  ];


  const team = [
    {
      name : "Teddy M'FOUO",
      image: Users,
      role: "Responsable de la page Accueil et À propos",
      description: ""
    },

    {
      name: "Luca PISSELI",
      image: Users,
      role: "Responsable de la page challenges",
      description: ""
    },

    {
      name: "Lucas OKINDA",
      image: Users,
      role: "Responsable de la page caluculateur",
      description: ""
    },
    {
      name: "Modibo Toure",
      image: Users,
      role: "Responsable de la page profil et connexion",
      description: ""
    }
  ]

  return (
    <>
      <div className="min-h-screen bg-white">
      {/* Hero */}
        <section className="bg-linear-to-br from-emerald-50 via-white to-blue-50 py-16 md:py-24 md:pt-40 pt-30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full mb-6">
                <Leaf className="w-4 h-4" />
                <span className="text-sm">Notre histoire</span>
              </div>
              <h1 className="mb-6">À propos GRYN</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Nous sommes une équipe passionnée qui croit fermement que chaque individu peut contribuer
                à la lutte contre le changement climatique. Notre mission est de rendre le suivi et la
                réduction de l'empreinte carbone accessible, ludique et efficace.
              </p>
            </div>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
              <div className="aspect-video">
                <img
                  src={ProposImage}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>


        {/* Notre mission */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-linear-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8">
                <div className="w-14 h-14 bg-emerald-600 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="mb-4">Notre mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  Donner à chacun les moyens de comprendre, mesurer et réduire son empreinte carbone
                  grâce à des outils numériques simples et efficaces. Nous voulons transformer la prise
                  de conscience écologique en actions concrètes et mesurables.
                </p>
              </div>

              <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h2 className="mb-4">Notre vision</h2>
                <p className="text-gray-700 leading-relaxed">
                  Un monde où chaque citoyen est conscient de son impact environnemental et dispose des
                  outils pour agir. Nous imaginons une communauté mondiale engagée, où les petites
                  actions quotidiennes créent un impact significatif sur le climat.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Valeurs */}
        <section className='py-16 md:py-24 bg-gray-50'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl'>
            <div className='text-center mb-12'>
              <h2 className='mb-4'>Nos valeurs</h2>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                Les principales qui guident notre action quotidien
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {valuer.map((value, index) => {
                const Icon = value.icon;

                return (
                  <div key={index} className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
                )
              })}
            </div>
          </div>
        </section>


        {/* Chiffres*/}
        <section className='py-16 md:py-24 bg-linear-to-br from-emerald-600 to-emerald-700 text-white'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl'>
            <div className='text-center mb-12'>
              <h2 className='text-white mb-4'>Notre impact en chiffres</h2>
              <p className='text-emerald-100 max-w-2xl mx-auto'>
                Ensemble, nous faisons la diffrence
              </p>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {stats.map((stat, index) => (
                <div 
                key={index}
                className='text-center'
                >
                  <p className='text-4xl md:text-5xl mb-2'>{stat.numbers}</p>
                  <p className='text-emerald-100'>{stat.description}</p>

                </div>
              ))}
            </div>
          </div>
        </section>



        {/* Partenaires */}
        <section className='py-16 md:py-24 bg-white'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl'>
            <div className='text-center mb-12'>
              <h2 className='mb-4'>Partenaires</h2>
              <p className='text-gray-600 max-w-2xl mx-auto'>
                Des passionnés engagés pour un avenir durable
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden
                            hover:border-emerald-200 hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-linear-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                    <Users className="w-24 h-24 text-emerald-600" />
                  </div>

                  <div className="p-6 text-center">
                    <p className="mb-1 font-medium text-gray-900">
                      {member.name}
                    </p>
                    <p className="text-emerald-600 mb-3 text-sm">
                      {member.role}
                    </p>
                    {member.description && (
                      <p className="text-sm text-gray-600">
                        {member.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Methodology */}

        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="mb-4">Notre méthodologie</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Des calculs basés sur des données scientifiques reconnues
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center shrink-0 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="mb-2">Facteurs d'émission certifiés</h4>
                    <p className="text-gray-600">
                      Nous utilisons les facteurs d'émission de la Base Carbone® de l'ADEME et du GIEC,
                      régulièrement mis à jour pour garantir la précision de nos calculs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center shrink-0 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="mb-2">Approche holistique</h4>
                    <p className="text-gray-600">
                      Notre calculateur prend en compte l'ensemble des postes d'émissions : transport,
                      alimentation, logement, consommation et services publics.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center shrink-0 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="mb-2">Transparence totale</h4>
                    <p className="text-gray-600">
                      Chaque résultat est accompagné d'explications détaillées et de recommandations
                      personnalisées basées sur vos habitudes de vie.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center shrink-0 mt-1">
                    4
                  </div>
                  <div>
                    <h4 className="mb-2">Amélioration continue</h4>
                    <p className="text-gray-600">
                      Nos algorithmes sont constamment affinés grâce aux retours des utilisateurs et aux
                      dernières recherches scientifiques.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}

        <section className="py-16 md:py-24 bg-white">
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center'>
            <h2 className='mb-6'>Rejoignez le mouvement</h2>
            <p className='text-lg text-gray-600 mb-8'>
              Ensemble, construisons un avenir plus durable. Chaque action compte, 
              commencez dès aujourd'hui à suivre et réduire votre empreinte carbone.
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <a 
            href="/calculateur"
            className='inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors'
            >
              Commencer maintenant
            </a>

            <a 
            href="#"
            className='="inline-flex text-center items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-emerald-600 hover:text-emerald-600 transition-colors'
            >
              Nous contacter
            </a>
          </div>
        </section>
        
      </div>
    </>
  )
}
