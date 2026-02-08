import { User, Mail, Save, X } from "lucide-react";
import { useContext, useState } from "react";
import { ProfileContext } from "../../context/ProfileContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function EditProfile() {
  const {user, setUser} = useContext(ProfileContext);

  const [formData, setFormData] = useState(user);

  const {required, handleSubmit} = useForm();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    setUser(formData);
    
  };

  const handleCancel = () => {
    setFormData({
      firstName: "Alex",
      lastName: "Martin",
      email: "alex.martin@email.com",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        {/* En-tête */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Modifier mon profil</h1>
            <p className="text-emerald-100">
              Mettez à jour vos informations personnelles
            </p>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            <div className="space-y-6">
              {/* Prénom */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Nom */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  Nom
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-gray-700 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-emerald-600" />
                  Adresse email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre.email@exemple.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t-2 border-gray-100">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Annuler
              </button>
              <button
                type="submit"
                onClick={() => navigate("/Profil")}
                className="flex-1 px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white hover:from-emerald-700 hover:to-emerald-800 shadow-lg"
              >
                <Save className="w-5 h-5" />
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditProfile;