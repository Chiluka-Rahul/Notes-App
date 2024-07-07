import React,{useState} from 'react'
import ProfileInfo from '../ProfileInfo/ProfileInfo'
import { useNavigate } from 'react-router-dom'
import { GrStatusGoodSmall } from "react-icons/gr";

const Navbar = ({userInfo}) => {

  const navigate = useNavigate()
  const onLogout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className='bg-gray-800 flex items-center justify-between py-5 drop-shadow'>
      <div className=' flex flex-row items-center bg-slate-300 border rounded-r-lg py-2 px-4'>
        <GrStatusGoodSmall className='mr-2 text-sm'/>
        <h2 className='text-lg font-medium text-black '>Notes</h2>
      </div>
        <ProfileInfo userInfo={userInfo} onLogout={onLogout}/>
    </div>
  )
}

export default Navbar