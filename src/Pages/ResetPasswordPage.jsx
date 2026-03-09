import React, { useEffect, useState } from 'react'
import { Leaf, Mail, Lock, LoaderPinwheel } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();

    const [formState, setFormState] = useState(() => ({
        token: searchParams.get('token') || "",
        email: searchParams.get('email') || "",
        password: "",
        password_confirmation: ""
    }));
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) return;

        // ✅ Fix Bug 1 : URL correcte sans {token} littéral
        fetch("http://localhost:8000/api/reset-password/" + token, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok) {
                setError('Lien invalide ou expiré.');
                return;
            }
            return response.json();
        })
        .then(data => {
            if (!data) return;
            setFormState(prev => ({ ...prev, token: data.token, email: data.email }));
        })
        .catch(() => {
            setError('Erreur réseau. Vérifiez votre connexion.');
        });
    }, [searchParams]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formState.password) {
            setError("Le mot de passe est requis.");
            return;
        }

        if (formState.password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        if (formState.password !== formState.password_confirmation) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        setIsLoading(true);

        // ✅ Fix Bug 2 : vérification du statut HTTP plutôt que data.message
        fetch('http://localhost:8000/api/reset-password', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formState)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || "Une erreur s'est produite.");
                });
            }
            return response.json();
        })
        .then(() => {
            setIsSubmitted(true);
        })
        .catch(err => {
            setError(err.message || "Erreur serveur. Réessayez plus tard.");
        })
        .finally(() => {
            setIsLoading(false);
        });
    };

    return (
        <>
            <section className='min-h-screen mt-10 flex items-center justify-center bg-linear-to-br from-emerald-50 via-green-50 to-teal-50 px-4'>
                <div className='w-full max-w-md'>
                    <div className='flex flex-col items-center mb-8'>
                        <div className='w-15 h-15 mt-7 bg-linear-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg'>
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">GRYN</h1>
                        <p className='text-lg font-normal text-gray-800'>Réinitialiser votre mot de passe</p>
                    </div>

                    <div className='p-4 sm:p-6 space-y-4'>
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className='text-teal-700 text-sm sm:text-base font-medium mb-2 flex items-center gap-2'>
                                        <Mail size={16} />
                                        Adresse email
                                    </label>
                                    <div className='relative'>
                                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formState.email}
                                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                            placeholder='votre@exemple.com'
                                            required
                                            disabled={isLoading}
                                            className='w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors text-gray-700 placeholder:text-gray-400 text-base disabled:bg-gray-100 disabled:cursor-not-allowed'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className='text-teal-700 text-sm sm:text-base font-medium mb-2 flex items-center gap-2'>
                                        <Lock size={16} />
                                        Nouveau mot de passe
                                    </label>
                                    <div className='relative'>
                                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                                        <input
                                            type="password"
                                            name="password"
                                            id="password"
                                            value={formState.password}
                                            onChange={(e) => setFormState({ ...formState, password: e.target.value })}
                                            placeholder='8 caractères minimum'
                                            required
                                            disabled={isLoading}
                                            className='w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors text-gray-700 placeholder:text-gray-400 text-base disabled:bg-gray-100 disabled:cursor-not-allowed'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className='text-teal-700 text-sm sm:text-base font-medium mb-2 flex items-center gap-2'>
                                        <Lock size={16} />
                                        Confirmer le mot de passe
                                    </label>
                                    <div className='relative'>
                                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            id="password_confirmation"
                                            value={formState.password_confirmation}
                                            onChange={(e) => setFormState({ ...formState, password_confirmation: e.target.value })}
                                            placeholder='Confirmez votre mot de passe'
                                            required
                                            disabled={isLoading}
                                            className='w-full px-4 py-3 pl-11 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors text-gray-700 placeholder:text-gray-400 text-base disabled:bg-gray-100 disabled:cursor-not-allowed'
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 border-2 border-red-200 rounded-xl">
                                        <p className="text-sm text-red-600">{error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className='w-full bg-linear-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    {isLoading ? (
                                        <>
                                            <LoaderPinwheel className="animate-spin" size={20} />
                                            <span>Envoi en cours...</span>
                                        </>
                                    ) : (
                                        <span>Réinitialiser le mot de passe</span>
                                    )}
                                </button>

                                <p className="text-center text-sm text-gray-600">
                                    <Link to="/login" className="text-teal-600 font-semibold hover:text-teal-700">
                                        Retour à la connexion
                                    </Link>
                                </p>
                            </form>
                        ) : (
                            <div className="p-6 bg-emerald-50 border-2 border-emerald-200 rounded-xl text-center">
                                <p className="text-emerald-800 font-medium mb-2">Mot de passe réinitialisé !</p>
                                <p className="text-sm text-emerald-700 mb-4">Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>
                                <Link
                                    to="/login"
                                    className="inline-block bg-linear-to-r from-emerald-500 to-teal-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all"
                                >
                                    Aller à la connexion
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ResetPasswordPage;