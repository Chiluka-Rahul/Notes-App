import React,{useState} from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const Password = ({value, onChange, placeholder}) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }
  return (
    <div className='flex items-center bg-transparent border-[1.5px] rounded px-5 mb-2'>
        <input
            value={value}
            onChange={onChange}
            type={isShowPassword ? "text" : "password"}
            placeholder={placeholder || "Password"}
            className='w-full text-sm text-white bg-transparent py-3 mr-3 rounded outline-none'
        />
        {isShowPassword ? (<FaRegEye 
            size={22}
            className="text-red-600 cursor-pointer"
            onClick = {() => toggleShowPassword()}
        />) : 
            (<FaRegEyeSlash 
                size={22}
                className="text-white cursor-pointer"
                onClick = {() => toggleShowPassword()}  
            />)
        }
    </div>
  )
}

export default Password