import UserRoute from './route/userRoute'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <ToastContainer
        position="top-center"   
        autoClose={3000}        
        hideProgressBar={false} 
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <Routes>
        <Route path='/*' element={<UserRoute />} />
      </Routes>
    </>
  )
}

export default App
