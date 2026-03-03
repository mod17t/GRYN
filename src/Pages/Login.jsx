import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Leaf, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const err = new Error("API error");
        err.status = response.status;
        throw err;
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
        navigate(0)
      } else {
        setError(data.message || "Identifiants incorrects.");
      }
      
    } catch(err) {
       if (err.status === 401) {
         setError("Email ou mot de passe incorrect");
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
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-15 h-15 mt-7 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">GRYN</h1>
          <p className="text-gray-600 text-center">Connexion</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              Mot de passe oublié ?
            </Link>
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
            Se connecter
          </button>

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
              Vous n'avez pas encore de compte ?
            </p>
            <button
              type="button"
              className="cursor-pointer text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors hover:underline"
              onClick={() => navigate("/signup")}
            >
              Créer un compte !
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
