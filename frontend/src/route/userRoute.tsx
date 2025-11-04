import { Route, Routes } from 'react-router-dom';
import UserRestaurant from '../pages/userRestaurantPage';
import UserLoginPage from '../pages/userLoginPage';
import UserSignupPage from '../pages/userSignupPage';
import UserSignUpOtpPage from '../pages/userSignUpOtpPage';
import UserAddRestaurantPage from '../pages/userAddRestuarantPage'
import UserEditRestuarantPage from '../pages/userEditRestaurantPage';
import UserLandingPage from '../pages/userLandingPage';
import PublicRoute from '../routeProtector/loginProtector';
import ProtectedRoute from '../routeProtector/ProtectiveCheck';
import Testerrr from '../components/user/test';

const userRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/restaurant' element={<UserRestaurant/>}/>
        <Route path='/' element={<UserLandingPage/>} />
        <Route path='/test' element={<Testerrr/>}/>
        <Route path='/login' element={<PublicRoute><UserLoginPage/></PublicRoute>}  />
        <Route path='/signup' element={<PublicRoute><UserSignupPage/></PublicRoute>} />
        <Route path='/signupotp' element={<PublicRoute><UserSignUpOtpPage/></PublicRoute>}/>
        <Route path='/addrestaurant' element={<ProtectedRoute><UserAddRestaurantPage/></ProtectedRoute>}/>
        <Route path='/editrestaurant/:id' element={<ProtectedRoute><UserEditRestuarantPage/></ProtectedRoute>}/>
      </Routes>
    </div>
  )
}

export default userRoute
