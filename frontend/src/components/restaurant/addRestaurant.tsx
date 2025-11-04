import {  useState } from 'react'
import { MapPin, Phone, Mail, Clock, Upload, Star } from 'lucide-react'
import { addRestuarant } from '../../service/userService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


interface RestaurantFormData {
  name: string;
  address: string;
  phone: number;
  email: string;
  hours: number;
  image: File | null;
  cuisine: string;
}

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<RestaurantFormData>({
    name: '',
    address: '',
    phone: 0,
    email: '',
    hours: 0,
    image: null,
    cuisine: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file, "fileeeee");

    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('heeyyyyy')
    e.preventDefault()
    try {
      console.log('hmmmmmmmm', formData)
      const data = new FormData();
      data.append("name", formData.name);
      data.append("address", formData.address);
      data.append("phone", String(formData.phone));
      data.append("email", formData.email);
      data.append("hours", String(formData.hours));
      data.append("cuisine", formData.cuisine);
      console.log(formData.image, 'Imagee')
      if (formData.image) {
        console.log('he')
        data.append("photos", formData.image);
      }
      const response = await addRestuarant(data);
      console.log(response.data.message)
      const hostelResponse = response.data.message;
      if (hostelResponse == 'Restaurant Created') {
        toast.success("Restaurant Created")
        navigate('/restaurant')
      }
    } catch (error) {
      const axiosError = error as any;
      if (axiosError.response) {
        const { message, errors } = axiosError.response.data;
        console.log(message)
        console.log(errors, 'OOi')
        if (errors) {
          setErrors(errors);
        }
      }
    }

  }


  const cuisineTypes = [
    'Italian', 'Chinese', 'American', 'Indian', 'French', 'Japanese',
    'Mexican', 'Thai', 'Mediterranean', 'Korean', 'Other'
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Add New Restaurant</h1>
            <p className="text-lg text-gray-600">Share your amazing dining experience with others</p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              
              <form onSubmit={(e) => submitForm(e)}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Restaurant Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter restaurant name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="mb-6">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="h-4 w-4 text-red-500 mr-2" />
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Enter full address including street, city, and postal code"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="h-4 w-4 text-green-500 mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="h-4 w-4 text-blue-500 mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="info@restaurant.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Clock className="h-4 w-4 text-purple-500 mr-2" />
                    Working Hours *
                  </label>
                  <input
                    type="text"
                    name="hours"
                    value={formData.hours}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="11:00 AM - 10:00 PM"
                  />
                  {errors.hours && <p className="text-red-500 text-sm mt-1">{errors.hours}</p>}
                </div>

                <div>
                  <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                    <Star className="h-4 w-4 text-yellow-400 mr-2" />
                    Cuisine Type *
                  </label>
                  <select
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select cuisine type</option>
                    {cuisineTypes.map((cuisine) => (
                      <option key={cuisine} value={cuisine}>
                        {cuisine}
                      </option>
                    ))}
                  </select>
                  {errors.cuisine && <p className="text-red-500 text-sm mt-1">{errors.cuisine}</p>}

                </div>
              </div>

              <div className="mb-8">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Upload className="h-4 w-4 text-indigo-500 mr-2" />
                  Upload Restaurant Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                {formData.image && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Image Preview:</p>
                    <div className="relative h-48 w-full rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={URL.createObjectURL(formData.image)}
                        alt="Restaurant preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
                <div className="flex space-x-4 pt-6 border-t border-gray-100">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
                  >
                    Add Restaurant
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="text-center mt-8">
            <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
              ← Back to Restaurant List
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRestaurant