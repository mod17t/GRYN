import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Leaf, Mail, Lock, Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword_confirmation, setShowPassword_confirmation] =
    useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formState.password !== formState.password_confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup", {
        method: "POST",
        headers: {
                "Accept": "application/json",
                "content-Type": "application/json" 
            },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const err = new Error("API error");
        err.status = response.status;
        throw err;
      }
      const data = await response.json();
      alert(data.message);
      navigate("/login");
    } catch (err) {
      if (err.status === 422) {
        setError("Email déjà utilisé ou données invalides");
      } else {
        setError("Une erreur est survenue, réessaie");
      }
    }
  };

  const handleChange = (e) => {
    const field = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [field.name]: field.value,
    }));
  };

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-15 h-15 mt-7 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">GRYN</h1>
          <p className="text-gray-600 text-center">Inscription</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nom
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
              <input
                id="name"
                type="text"
                name="name"
                placeholder="nom"
                value={formState.name}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="votre@email.com"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-11 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                <input
                  id="password_confirmation"
                  type={showPassword_confirmation ? "text" : "password"}
                  placeholder="••••••••"
                  name="password_confirmation"
                  value={formState.password_confirmation}
                  onChange={handleChange}
                  className="w-full pl-11 pr-11 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword_confirmation(!showPassword_confirmation)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  {showPassword_confirmation ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 cursor-pointer bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Créer un compte
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 px-4 text-sm text-gray-500">
                ou
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-sm mb-3">
              Vous avez déjà un compte ?
            </p>
            <button
              type="button"
              className="cursor-pointer pb-5 text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors hover:underline "
              onClick={() => navigate("/login")}
            >
              Connectez-vous !
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
