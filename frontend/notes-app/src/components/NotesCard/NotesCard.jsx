import React from 'react'
import moment from "moment"
import {MdOutlinePushPin} from 'react-icons/md'
import { MdCreate,MdDelete } from 'react-icons/md'

const NotesCard = ({title,date,content,tags,isPinned,onEdit, onDelete, onPinNote}) => {
  return (
    <div className='border rounded-xl border-gray-400 p-4 bg-gray-800 hover:shadow-xl transition-all ease-in-out'>
        <div className='flex items-center justify-between'>
            <div>
                <h6 className='text-sm font-medium text-white'>{title}</h6>
                <span className='text-xs text-slate-400'>{moment(date).format('Do MMM YYYY')}</span>
            </div>
            <MdOutlinePushPin className={`icon-btn ${isPinned ? 'text-primary': 'text-slate-300'} mb-3 `} onClick={onPinNote}/>

        </div>
        <p className='text-xs text-slate-200 mt-2'>{content?.slice(0,60)}</p>
        <div className='flex items-center justify-between mt-2'>
            <div className='text-xs text-gray-200'>
                {tags.map((item) => `#${item} `)}
            </div>
            <div className='flex items-center gap-2  p-2 ' >
                <MdCreate className='icon-btn hover:text-green-600' onClick={onEdit}/>
                <MdDelete className='icon-btn hover:text-red-600' onClick={onDelete}/>
            </div>
        </div>
    </div>
  )
}

export default NotesCard