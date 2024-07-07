import React,{useState} from 'react'
import Navbar from '../../components/Navbar/Navbar'
import {Link, useNavigate} from 'react-router-dom'
import Password from '../../components/Password/Password'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter the password");
      return;
    }
    setError("")

    try{
      // API call to login
      const response = await axiosInstance.post("/login",{
        email:email,
        password:password,
      })

      if(response.data && response.data.accessToken){
        localStorage.setItem("accessToken",response.data.accessToken);
        navigate('/dashboard')
      }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("Invalid email or password");
      }

    }
  }

  return (
    <>
      <Navbar />
      <div className= 'flex items-center justify-center mt-20'>
        <div className='flex flex-row'>
          <div className='w-100 border md:rounded-l-2xl border-r-white flex flex-col items-center justify-center bg-gray-700 px-7 py-10'>
            <h1 className='text-3xl font-medium text-white'>Welcome Back User!!</h1>
            <p className='text-sm text-center mt-4 text-gray-400'>
                Not registered yet?{" "}
                <Link to="/signup" className='font-medium text-primary underline'>
                  Create an Account
                </Link>
            </p>
          </div>
          <div className='w-96 border rounded-r-2xl border-l-white bg-gray-700 px-7 py-10'>
            <form onSubmit={handleLogin}>
              <h4 className='text-2xl mb-7 text-blue-50'>Login</h4>
              <input 
                type='text' 
                placeholder='Email' 
                className='input-box mt-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Password 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
              <button type='submit' className='btn-primary mt-5'>
                Login
              </button>
            </form>
          </div>

        </div>
      </div>
      <div className='md:hidden sm:block'>
          <p>Hello</p>
      </div>
    </>
  )
}

export default Login