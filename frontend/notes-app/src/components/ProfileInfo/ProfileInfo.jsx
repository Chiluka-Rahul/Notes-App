import React from 'react'
import { HiLogout } from "react-icons/hi";
import { initials } from '../../utils/helper'

const ProfileInfo = ({userInfo, onLogout}) => {
  return (
    userInfo && (
    <div className='flex items-center gap-3 pr-5'>
        <div className='w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100'>{initials(userInfo?.fullName)}</div>
        <div>
            <p className='text-white'>{userInfo?.fullName}</p>
            <div className='flex flex -row justify-center items-center gap-2'>
              <button className='text-sm text-red-500' onClick={onLogout}>
                  Logout
              </button>
              <HiLogout className="text-red-500 cursor-pointer" onClick={onLogout} />
            </div>
        </div>
    </div>
    )
  )
}

export default ProfileInfo