const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  if (!email?.trim()) return "L'adresse email est requise.";
  if (!EMAIL_REGEX.test(email)) return "Format d'email invalide.";
  return null;
}

export function validatePassword(password) {
  if (!password) return 'Le mot de passe est requis.';
  if (password.length < 8) return 'Le mot de passe doit contenir au moins 8 caractères.';
  return null;
}

export function validateLoginForm(values) {
  return validateEmail(values.email) ?? validatePassword(values.password);
}

export function validateSignUpForm(values) {
  if (!values.first_name?.trim()) return 'Le prénom est requis.';
  if (!values.last_name?.trim())  return 'Le nom est requis.';
  const e = validateEmail(values.email);      if (e) return e;
  const p = validatePassword(values.password); if (p) return p;
  if (values.password !== values.password_confirmation) return 'Les mots de passe ne correspondent pas.';
  return null;
}

export function validateContactForm(values) {
  if (!values.name?.trim() || values.name.length < 2)    return 'Le nom doit contenir au moins 2 caractères.';
  const e = validateEmail(values.email);                  if (e) return e;
  if (!values.subject?.trim() || values.subject.length < 3) return 'Le sujet doit contenir au moins 3 caractères.';
  if (!values.message?.trim() || values.message.length < 10) return 'Le message doit contenir au moins 10 caractères.';
  if (values.message.length > 1000) return 'Le message ne peut pas dépasser 1000 caractères.';
  return null;
}
