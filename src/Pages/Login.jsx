import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Leaf, Mail, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState("login");

  const handleSubmit = (e) => {
    e.preventDefault();
    {
      /* forgot-password.jsx (1 champ email) | reset-password.jsx (2 champs password et confirm_password) | change-password.jsx (2 champs password et confirm_password) */
    }

    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((response) => {
        console.log(response);
        response.json();
      })
      .then((data) => {
        if (data.plainTextToken) {
          localStorage.setItem("account_token", data.plainTextToken);
          navigate("/");
        }
      });
  };

  const handleChange = (e) => {
    let field = e.target;
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
            <Leaf className="w-6 h-6 text-white " />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">GRYN</h1>
          {mode === "login" ? (
            <p className="text-gray-600 text-center">
              Connectez-vous à votre compte
            </p>
          ) : (
            <p className="text-gray-600 text-center">Crée un compte</p>
          )}
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
                type="email" // "username="teddy@...&password=Xaerybfi"
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

          {mode === "sign up" && (
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-600" />
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
          )}
          {mode === "login" && (
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          )}

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full py-3 cursor-pointer bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
          >
            {mode === "login" ? (
              <span>Se connecter</span>
            ) : (
              <span>crée un compte</span>
            )}
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
            {mode === "login" ? (
              <span> Vous n'avez pas encore de compte ?</span>
            ) : (
              <span> Vous avez déjà un compte ?</span>
            )}
          </p>
          <button
            type="button"
            className="cursor-pointer text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors hover:underline"
            onClick={() => setMode(mode === "login" ? "sign up" : "login")}
          >
            {mode === "login" ? (
              <span> Crée un compte ?</span>
            ) : (
              <span> Connectez-vous !</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
