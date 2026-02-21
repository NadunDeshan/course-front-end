import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard'
import AdminPage from '../pages/adminPage'
import HomePage from '../pages/homePage'
import TestPage from '../pages/test'
import LoginPage from '../pages/loginPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from '../pages/admin/registerPage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgetPassword from '../pages/admin/forget-password'
import UserSettings from '../pages/admin/settings'

function App() {

  return (
    <BrowserRouter>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
   <div className='w-full h-[100vh]'>
      <Toaster position="top-right"/>
    <Routes path="/">
      <Route path="/*" element={<HomePage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/forget-password" element={<ForgetPassword/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/admin/*" element={<AdminPage/>}/>
      <Route path="/settings" element={<UserSettings/>}/>
      <Route path="/test" element={<TestPage/>}/>
      
    </Routes>

   </div>
   </GoogleOAuthProvider>
    </BrowserRouter>
  )
}

export default App



 {/* <div className='h-[700px] w-[700px] border-[5px] relative flex justify-center items-center'>

      <div className='h-[100px] w-[300px] bg-yellow-600 flex flex-row justify-center items-center'>
        <button className='text-white bg-green-800 absolute bottom-0 right-0 p-2'>How can i Help you</button>
        </div>
        <div className='w-[300px] h-[300px] bg-pink-400 p-[40px] m-[10px]'>
          <div className='w-[50px] h-[50px] bg-amber-300 '>
          </div>
          <div className='w-[50px] h-[50px] bg-blue-300'>
          </div>

        </div>
    </div> */}

        {/* <div className='h-[100px] w-[100px] bg-green-600'>
        </div>
        <div className='h-[100px] w-[100px] absolute bottom-[0px] right-[0px] bg-red-600'>
        </div>
        <div className='h-[100px] w-[100px] bg-blue-600'>
        </div>
        <div className='h-[100px] w-[100px] fixed right-[10px] bottom-[10px] bg-pink-600'>
        </div>
        <div className='h-[100px] w-[100px] bg-gray-600'>
        </div> */}
      
      
    {/* <h1 className = "text-[#F87C63] text-5xl">Nadun Deshan</h1>
    <ProductCard name="Apple i pad" price="$499" image="https://www.apple.com/assets-www/en_WW/ipad/01_product_tile/large/ipad_air_81133a1a7_2x.jpg"/>
    <ProductCard name="Mac Book Pro" price="$1299" image="https://www.apple.com/v/macbook-air/x/images/overview/design/color/design_top_skyblue__eepkvlvjzcia_large_2x.jpg"/> */}
