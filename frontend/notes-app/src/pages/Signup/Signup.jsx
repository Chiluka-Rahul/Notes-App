import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Password from '../../components/Password/Password'
import Navbar from '../../components/Navbar/Navbar'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()
    if(!name){
      setError("Please enter your name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }
    if(!password){
      setError("Please enter a password");
      return;
    }
    setError("")

    try{
      // API call to login
      const response = await axiosInstance.post("/create-account",{
        fullName:name,
        email:email,
        password:password,
      })

      if(response.data && response.data.error){
        setError(response.data.message)
        return 
      }

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
      <div className='flex items-center justify-center mt-20'>
        <div className='md:flex md:flex-row sm:flex sm:flex-col'>
          <div className='w-96 border rounded-l-2xl border-r-white bg-gray-700 px-7 py-10'>
            <form onSubmit={handleSignUp}>
              <h4 className='text-2xl mb-7 text-blue-50'>SignUp</h4>
              <input 
                type='text' 
                placeholder='Name' 
                className='input-box'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input 
                type='text' 
                placeholder='Email' 
                className='input-box'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Password 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
              <button type='submit' className='btn-primary mt-5'>
                Create Account
              </button>
              
            </form>
          </div>
          <div className='w-100 border rounded-r-2xl border-r-white flex flex-col items-center justify-center bg-gray-700 px-7 py-10'>
              <h1 className='text-3xl font-medium text-white'>Welcome to Website</h1>
              <p className='text-sm text-center mt-4 text-gray-400'>
                  Already have a account?{" "}
                  <Link to="/" className='font-medium text-primary underline'>
                    Login
                  </Link>
              </p>
          </div>
        </div>
      </div>      
    </>
  )
}

export default Signup