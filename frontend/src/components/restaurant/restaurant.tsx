import { useEffect, useState } from 'react'
import { MapPin, Phone, Mail, Clock, Edit3, Trash2 } from 'lucide-react'
import { deleteRestaurant, getRestaurant } from '../../service/userService'
import type { Restaurant } from '../../interface/restaurant'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import DeleteConfirmDialog from '../commonComponents/DeleteModela'

const Restaurants = () => {

  const convertTo12Hour = (hour: number): string => {
    const period: "AM" | "PM" = hour >= 12 ? "PM" : "AM";
    const formattedHour: number = hour % 12 || 12;
    return `${formattedHour}${period}`;
  };

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteRestaurantName, setDeleteRestaurantName] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await getRestaurant();
        console.log(response, 'SSssssssssssss')

        const restaurantData = response.data.message;
        setRestaurants(restaurantData)
        console.log(restaurantData, 'Reeeeeeee')
      } catch (error) {
        console.log(error)
      }
    }
    fetchRestaurant();
  }, [])


  const handleEdit = (id: string) => {
    console.log(id)
    navigate(`/editrestaurant/${id}`)
  }

  const handleConfirmDelete = async (id: string) => {
    console.log("Delete Id,", id)
    // const confirmDelete = window.confirm("Are you sure you want to delete this restaurant?");
    // if (!confirmDelete) return;
    try {
      const response = await deleteRestaurant(id);
      console.log(response.data.message, 'Response')
      const RestaurantResponse = response.data.message;
      if (RestaurantResponse == 'Restaurant Deleted') {
        const response = await getRestaurant();
        const RestaurantData = response.data.message;
        setRestaurants(RestaurantData);
        toast.success("Restaurant Deleted");
        setDeleteDialogOpen(false);
        setDeleteId(null);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteId(id);
    setDeleteRestaurantName(name);
    setDeleteDialogOpen(true);
  };

 
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Restaurants</h1>
              <p className="text-lg text-gray-600">Discover amazing dining experiences near you</p>
            </div>
            <button
              onClick={() => navigate('/addrestaurant')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Add Restaurant
            </button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={restaurant.image[0]}
                  alt={restaurant.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />

                <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {restaurant.cuisine}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{restaurant.name}</h3>
                <div className="flex items-start space-x-3 mb-3">
                  <MapPin className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 text-sm leading-relaxed">{restaurant.address}</p>
                </div>

                <div className="flex items-center space-x-3 mb-3">
                  <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <a
                    href={`tel:${restaurant.phone}`}
                    className="text-gray-600 text-sm hover:text-green-600 transition-colors"
                  >
                    {restaurant.phone}
                  </a>
                </div>

                <div className="flex items-center space-x-3 mb-3">
                  <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <a
                    href={`mailto:${restaurant.email}`}
                    className="text-gray-600 text-sm hover:text-blue-600 transition-colors truncate"
                  >
                    {restaurant.email}
                  </a>
                </div>

                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-5 w-5 text-purple-500 flex-shrink-0" />
                  <p className="text-gray-600 text-sm">
                    {`9AM - ${convertTo12Hour(9 + restaurant.hours)}`}
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(restaurant._id)}
                    className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-md min-w-[80px]"
                    title="Edit Restaurant"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(restaurant._id, restaurant.name)}
                    className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-md min-w-[80px]"
                    title="Delete Restaurant"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        restaurantName={deleteRestaurantName}
        onConfirm={() => deleteId && handleConfirmDelete(deleteId)}
        onCancel={() => {
          setDeleteDialogOpen(false);
          setDeleteId(null);
        }}
      />
    </div>
  )
}

export default Restaurants