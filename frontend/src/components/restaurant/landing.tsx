import { UtensilsCrossed, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome to Foodie Hub
            </h1>
            <p className="text-lg text-gray-600">
              Manage your restaurants with ease
            </p>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl px-6">
          {/* Add Restaurant */}
          <button
            onClick={() => navigate("/addrestaurant")}
            className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-10"
          >
            <div className="bg-green-100 p-6 rounded-full mb-6">
              <UtensilsCrossed className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Add Restaurant
            </h2>
            <p className="text-gray-600 text-sm">
              Create a new restaurant and add details easily
            </p>
          </button>

          {/* View Restaurants */}
          <button
            onClick={() => navigate("/restaurant")}
            className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-10"
          >
            <div className="bg-blue-100 p-6 rounded-full mb-6">
              <Eye className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              View Restaurants
            </h2>
            <p className="text-gray-600 text-sm">
              Explore and manage the list of restaurants
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
