import { useState } from 'react';

/**
 * Hook générique de gestion de formulaire.
 *
 * @param {object} initialValues  - Valeurs initiales du formulaire
 * @param {function} validateFn   - Fonction de validation (retourne un message d'erreur ou null)
 * @param {function} onSubmit     - Callback async appelé avec les valeurs si la validation passe
 */
export default function useFormState(initialValues, validateFn, onSubmit) {
  const [values,     setValues]     = useState(initialValues);
  const [error,      setError]      = useState('');
  const [isLoading,  setIsLoading]  = useState(false);
  const [isSuccess,  setIsSuccess]  = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const setValue = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (validateFn) {
      const validationError = validateFn(values);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setIsLoading(true);

    try {
      await onSubmit(values);
      setIsSuccess(true);
    } catch (err) {
      setError(err.message || 'Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setError('');
    setIsSuccess(false);
  };

  return {
    values,
    error,
    isLoading,
    isSuccess,
    handleChange,
    handleSubmit,
    setValue,
    reset,
  };
}
