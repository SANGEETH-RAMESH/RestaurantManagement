import React, { useEffect, useState } from 'react';
import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/userAuthSlice';
import { getUserDetails } from '../../service/userService';

const UserHeader: React.FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = localStorage.getItem('userAccessToken');
  const refreshToken = localStorage.getItem('userRefreshToken');
  const isAuthenticated = !!(accessToken && refreshToken);

  const handleLogout = () => {
    localStorage.removeItem('userAccessToken');
    localStorage.removeItem('userRefreshToken');

    dispatch(logout({ isLoggedIn: false }));
    navigate('/login');
  };

  const handleNavigateProfile = () => {
    navigate('/profile');
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchUser = async () => {
      try {
        const response = await getUserDetails();
        console.log(response.data.message,"Response")
        setName(response?.data?.message?.name);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    fetchUser();
  }, [isAuthenticated]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-[100]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

       
          <button
            onClick={() => navigate('/')}
            className="text-xl font-bold bg-gradient-to-r from-[#31AFEF] to-[#2196F3] bg-clip-text text-transparent"
          >
            MyApp
          </button>

          <nav className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
           
                <button
                  onClick={handleNavigateProfile}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-full transition"
                >
                  <div className="w-8 h-8 rounded-full border-2 border-[#31AFEF] p-0.5">
                    <User className="w-full h-full text-gray-600" />
                  </div>

                
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {name || 'Loading...'}
                  </span>
                </button>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-red-100 rounded-full transition"
                  title="Logout"
                >
                  <LogOut className="w-6 h-6 text-red-600" />
                </button>
              </>
            ) : (
              <div className="relative group">
  <button className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
    Account
  </button>

  <div
    className="absolute right-0 top-full w-36 bg-white border rounded-lg shadow-md
    opacity-0 invisible
    group-hover:visible group-hover:opacity-100
    transition"
  >
    <div className="py-1">
      <button
        onClick={() => navigate('/login')}
        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
      >
        Login
      </button>

      <button
        onClick={() => navigate('/signup')}
        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
      >
        Register
      </button>
    </div>
  </div>
</div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
