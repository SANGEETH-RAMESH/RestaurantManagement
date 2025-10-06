import React, { useEffect, useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { logout } from '../../redux/userAuthSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


export const UserHeader: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [name, setName] = useState('');
  // const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout({
      isLoggedIn :false
    }))
    navigate('/login');
  };

  const handleNavigateHome = () => {
    console.log('Navigating to home...');
    // navigate('/');
  };

  const handleNavigateProfile = () => {
    console.log('Navigating to');
    // navigate('/profile');
  };

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await getUserDetails();
        // setUserId(response?.data.data._id);
        // setName(response?.data?.data.name);
        
        setName('Sangeeth Ramesh');
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={handleNavigateHome}
              className="flex items-center gap-x-2 text-xl font-bold bg-gradient-to-r from-[#31AFEF] to-[#2196F3] bg-clip-text text-transparent"
            >
              {/* <img src={`${imageUrl}/${logo}`} alt="Logo" className="h-16 w-16" /> */}
            </button>

            <nav className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleNavigateProfile}
                className="relative flex items-center space-x-3 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors duration-200 group"
              >
                <div className="w-8 h-8 rounded-full border-2 border-[#31AFEF] p-0.5">
                  <User className="w-full h-full text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{name || 'Loading...'}</span>
                
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2
                   bg-gray-800 text-white text-xs px-2 py-1 rounded
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Profile
                </span>
              </button>

              <button
                onClick={handleLogout}
                className="relative p-2 hover:bg-red-100 rounded-full transition-colors duration-200 group"
              >
                <LogOut className="w-6 h-6 text-red-600" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2
                   bg-gray-800 text-white text-xs px-2 py-1 rounded
                   opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  Logout
                </span>
              </button>
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-x-0 top-16 bg-white shadow-lg md:hidden z-[9998]">
          <div className="px-4 py-2 space-y-1">
            <button
              onClick={() => {
                handleNavigateProfile();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <User className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">Profile ({name || 'Loading...'})</span>
            </button>

            <button
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <div className="text-sm font-medium">Logout</div>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserHeader;