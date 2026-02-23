
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, Send, Lightbulb, LoaderPinwheel, BadgeCheck, BellRing } from 'lucide-react';

const ForgotPasswordPage = () => {
    const [formState, setFormState] = useState({
        email: ""
    });
    const [error, setError] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        if(!formState.email) {
            setError('Veuillez saisir votre adresse e-mail.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(formState.email)) {
            setError(`S'il vous plaît, mettez une adresse email valide`);
            return;
        }
        
        setIsLoading(true);
        
        fetch('http://localhost:8000/api/forgot-password', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setIsSubmitted(true);
        })
        .catch(error => {
            setError(error.message || `Une erreur s'est produite`);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }
    
    return (
        <>
            <section className='min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12'>
                <div className='w-full max-w-md md:max-w-lg mx-auto'>
                    <div className='mb-11'/>
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                        {/* Header avec gradient */}
                        <div className="bg-linear-to-br from-emerald-500 via-teal-500 to-emerald-600 p-6 sm:p-8 relative overflow-hidden">
                            {/* Cercles décoratifs */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/30 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/20 rounded-full translate-y-1/2 -translate-x-1/2" />
                            {/* Icon avec badge */}
                            <div className="relative inline-block mb-6">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <Mail size={36} className="text-white" />
                                </div>
                            </div>
                            {/* Titre */}
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4">Reinitialiser votre mot de passe</h2>
                            {/* Description */}
                            <p className="text-sm sm:text-base text-white">
                                Pas de souci ! Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                            </p>
                        </div>
                        {/* Formulaire */}
                        <div className='p-4 sm:p-6 space-y-4'>
                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit}>
                                    <div className='mb-6'>
                                        <label 
                                            className='text-teal-700 text-sm sm:text-base font-medium mb-2 flex items-center gap-2'
                                        >
                                            <Mail size={16} />
                                            Adresse email
                                        </label>
                                        <div className='relative'>
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                            <input 
                                                type="email"
                                                name='email'
                                                onChange={(e) => setFormState({...formState, email: e.target.value})}
                                                value={formState.email}
                                                id="email" 
                                                placeholder='votre@exemple.com'
                                                required
                                                disabled={isLoading}
                                                className='w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors text-gray-700 placeholder:text-gray-400 text-base disabled:bg-gray-100 disabled:cursor-not-allowed'
                                            />
                                        </div>
                                        
                                        {error && (
                                            <div className="mt-2 p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                                                <p className="text-sm text-red-600">{error}</p>
                                            </div>
                                        )}
                                        
                                        <div className='bg-blue-50 border-2 border-blue-100 rounded-xl p-4 mb-6 mt-4'>
                                            <div className='flex gap-3'>
                                                <Lightbulb size={16} className='text-amber-500 shrink-0 mt-0.5' />
                                                <div>
                                                    <h3 className='text-sm font-semibold text-blue-900 mb-1'>
                                                        Conseil pratique
                                                    </h3>
                                                    <p className='text-sm text-blue-800 leading-relaxed'>
                                                        Vérifiez également votre dossier spam si vous ne
                                                        recevez pas l'email dans les 5 minutes.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Submit button */}
                                        <button 
                                            type="submit"
                                            disabled={isLoading}
                                            onClick={handleSubmit}
                                            className='w-full bg-linear-to-r from-emerald-500 to-teal-600 text-white py-3 sm:py-4 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed'
                                        >
                                            {isLoading ? (
                                                <>
                                                    <LoaderPinwheel className="animate-spin" size={20} />
                                                    <span className='font-medium'>Envoi en cours...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send size={20} />
                                                    <span className='font-medium'>Envoyer le lien de réinitialisation</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                    <div className="text-center mt-6">
                                        <p className="text-sm text-gray-600">
                                            Vous vous souvenez de votre mot de passe ?{' '}
                                            <Link to="/login" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors">
                                                Retour à la connexion
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            ) : (
                                <div className='text-center py-8'>
                                    <div className='relative inline-block mb-6'>
                                        <div className='w-24 h-24 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center'>
                                            <BadgeCheck size={48} className="text-white" />
                                        </div>
                                        <div className='absolute inset-0 bg-green-400/30 rounded-full -z-10 blur-xl'/>
                                    </div>
                                    <div className='mt-4'>
                                        <h3 className='text-2xl font-bold text-gray-800 mb-3'>
                                            Email envoyé avec succès !
                                        </h3>
                                        <p className='text-sm text-gray-600 mb-2'>
                                            Nous avons envoyé un lien de réinitialisation à
                                        </p>
                                        <p className='text-emerald-600 font-semibold mb-8 text-lg'>
                                            {formState.email}
                                        </p>
                                    </div>
                                    <div className='space-y-4 mb-8'>
                                        <div className='bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 text-left'>
                                            <div className='flex items-start gap-3'>
                                                <div className='w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0'>
                                                    <Mail size={16} className="text-emerald-600" />
                                                </div>
                                                <div>
                                                    <p className='text-sm font-medium text-emerald-900 mb-1'>
                                                        Veuillez consulter votre boite mail
                                                    </p>
                                                    <p className='text-sm text-emerald-700'>
                                                        Cliquez sur le lien dans l'email pour réinitialiser votre mot de passe.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='bg-amber-50 border-2 border-amber-200 rounded-xl p-4 text-left'>
                                            <div className='flex items-start gap-3'>
                                                <div className='w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0'>
                                                    <BellRing size={16} className="text-amber-600" />
                                                </div>
                                                <div>
                                                    <p className='text-sm font-medium text-amber-900 mb-1'>
                                                        Validité limitée
                                                    </p>
                                                    <p className='text-sm text-amber-700'>
                                                        Le lien est valide pendant <strong>1 heure</strong> pour des raisons de sécurité.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        to='/login'
                                        className='inline-flex items-center justify-center gap-2 bg-linear-to-r from-emerald-500 to-teal-600 text-white py-3 px-8 rounded-xl font-semibold text-sm sm:text-base hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                                    >
                                        <ArrowLeft size={20} />
                                        <span className='font-medium'>Retour à la connexion</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default ForgotPasswordPage