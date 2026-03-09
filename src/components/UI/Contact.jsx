import { Check, Clock, Leaf, Mail, MapPin, User, LoaderPinwheel, MoveLeft   } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from "react-router-dom";


const Contact = () => {

    const [formState, setFormState] = useState({ 
        name: '', 
        email: '',
        subject: '',
        message: '' 
    });
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [touched, setTouched] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        setTouched(prev => ({ ...prev, [e.target.name]: true }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
    
        if (!formState.name) {
            setError("Le nom est requis.");
            return;
        }
        if (formState.name.length < 2) {
            setError("Le nom doit contenir au moins 2 caractères.");
            return;
        }
        if (!formState.email) {
            setError("L'email est requis");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
            setError("Format d'email invalide");
            return;
        }
        if (!formState.subject) {
            setError("Le sujet est requis");
            return;
        }
        if (formState.subject.length < 3) {
            setError("Le sujet doit contenir au moins 3 caractères");
            return;
        }
        if (!formState.message) {
            setError("Le message est requis.");
            return;
        }
        if (formState.message.length < 10) {
            setError("Le message doit contenir au moins 10 caractères");
            return;
        }
        if (formState.message.length > 1000) {
            setError("Le message ne peut pas dépasser 1000 caractères");
            return;
        }
    
        setIsLoading(true);
    
        fetch('http://localhost:8000/api/contact', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    throw new Error(data?.message || "Une erreur s'est produite");
                }
                return data;
            });
        })
        .then(data => {
            console.log(data);
            setIsSubmitted(true);
        })
        .catch(err => {
            setError(err.message || "Une erreur s'est produite");
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    if (isSubmitted) {
        return (
            <section className='min-h-screen bg-linear-to-br from-gray-50 via-emerald-50/30 to-gray-50 py-12'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl'>
                    <div className='text-center py-20'>
                        <div className='inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4 shadow-lg shadow-emerald-500/30'>
                            <Check className='w-8 h-8 text-white'/>
                        </div>
                        <h2 className='text-emerald-900 mb-3'>Message envoyé !</h2>
                        <p className='text-gray-600'>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>

                        <div className='mt-5'>
                            <Link
                                to="/login"
                                className='inline-flex items-center gap-2 text-white/80 bg-emerald-500 hover:bg-emerald-900 rounded-full mb-4 shadow-lg shadow-emerald-500/30 py-2 px-5'
                            >
                                <MoveLeft  size={20} /> Retour à la connexion
                            </Link>
                        </div>

                    </div>

                    
                </div>
            </section>
        );
    }

    return (
        <>
            <section className='min-h-screen bg-linear-to-br from-gray-50 via-emerald-50/30 to-gray-50 py-12'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl'>
                    <div className='text-center mb-12'>
                        <div className='inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-full mb-4 shadow-lg shadow-emerald-500/30'>
                            <Mail className='w-8 h-8 text-white'/>
                        </div>
                        <h1 className="text-emerald-900 mb-3">Contactez-nous</h1>
                        <p className='text-gray-600 max-w-2xl mx-auto'>
                            Une question, une suggestion ou besoin d'aide ? Notre équipe est là pour vous accompagner
                            dans votre démarche écologique.
                        </p>
                    </div>

                    <div className='grid lg:grid-cols-2 gap-8'>
                        <div className='space-y-6'>
                            <div className='bg-white rounded-2xl shadow-lg p-8 border-2 border-emerald-100'>
                                <h3 className='text-emerald-900 mb-6'>Informations de contact</h3>

                                <div className='space-y-4'>
                                    <div className='flex items-start gap-4 p-4 bg-linear-to-br from-emerald-50 to-emerald-100/50 rounded-xl'>
                                        <div className='w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0'>
                                            <Mail size={20} className='text-white'/>
                                        </div>
                                        <div>
                                            <p className="text-sm text-emerald-900 mb-1">Email</p>
                                            <a href="mailto:no-replygri@gryn.com" className='text-emerald-900 hover:text-emerald-700'>
                                                no-replygri@gryn.com
                                            </a>
                                        </div>
                                    </div>

                                    <div className='flex items-start gap-4 p-4 bg-linear-to-br from-emerald-50 to-emerald-100/50 rounded-xl'>
                                        <div className='w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0'>
                                            <MapPin size={20} className='text-white'/>
                                        </div>
                                        <div>
                                            <p className='text-sm text-emerald-900 mb-1'>Adresse</p>
                                            <p className="text-gray-600 text-sm">
                                                7 Rue Jean-Marie Leclair, 69009 Lyon
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex items-start gap-4 p-4 bg-linear-to-br from-emerald-50 to-emerald-100/50 rounded-xl'>
                                        <div className='w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0'>
                                            <Clock size={20} className='text-white'/>
                                        </div>
                                        <div>
                                            <p className='text-sm text-emerald-900 mb-1'>Horaires</p>
                                            <p className='text-gray-600 text-sm'>
                                                Lun - Ven : 9h00 - 18h00<br />
                                                Sam : 10h00 - 16h00
                                            </p>
                                        </div>                                   
                                    </div>  
                                </div>
                            </div>

                            <div className='bg-linear-to-br from-emerald-600 to-emerald-700 rounded-2xl shadow-lg p-8 text-white relative overflow-hidden'>
                                <div className='absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16'></div>

                                <div className='relative'>
                                    <div className='w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4'>
                                        <Leaf size={20} className='text-white'/>
                                    </div>
                                    <h4 className='text-gray-100 mb-1'>Le saviez-vous ?</h4>
                                    <p className='text-gray-300 max-w-2xl mx-auto'>
                                        En répondant par email plutôt que par courrier, vous économisez environ 6g de CO₂ par message !
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white rounded-2xl shadow-xl p-8 border-2 border-emerald-100 h-fit'>
                            <h3 className="text-emerald-900 mb-6">Envoyez-nous un message</h3>

                            {error && (
                                <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm'>
                                    {error}
                                </div>
                            )}

                            <form className='space-y-6' onSubmit={handleSubmit}>
                                <div className='grid md:grid-cols-2 gap-6'>
                                    <div>
                                        <label className='text-sm mb-2 text-gray-700 flex items-center gap-2'>
                                            <User size={16} className="text-emerald-600" />
                                            Nom complet <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={formState.name}
                                            disabled={isLoading}
                                            placeholder='Votre nom'
                                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                                        />
                                    </div>

                                    <div>
                                        <label className='text-sm mb-2 text-gray-700 flex items-center gap-2'>
                                            <Mail size={16} className="text-emerald-600" />
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={formState.email}
                                            disabled={isLoading}
                                            placeholder='Votre email'
                                            className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className='text-sm mb-2 text-gray-700 flex items-center gap-2'>
                                        Sujet <span className="text-red-500">*</span>
                                    </label>
                                    <input 
                                        type="text" 
                                        name="subject" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={formState.subject}
                                        disabled={isLoading}
                                        placeholder='Sujet de votre message'
                                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all'
                                    />
                                </div>

                                <div>
                                    <label className='text-sm mb-2 text-gray-700 flex items-center gap-2'>
                                        Message <span className="text-red-500">*</span>
                                    </label>
                                    <textarea 
                                        name="message" 
                                        rows={5}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={formState.message}
                                        disabled={isLoading}
                                        placeholder='Votre message...'
                                        className='w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none'
                                    />
                                    <p className='text-xs text-gray-400 mt-1 text-right'>
                                        {formState.message.length}/1000
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className='w-full bg-linear-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    {isLoading ? (
                                        <>
                                            <LoaderPinwheel  className="animate-spin" size={20} />
                                            <span>Envoi en cours...</span>
                                        </>
                                    ) : (
                                        <span>Envoyer un message</span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact
