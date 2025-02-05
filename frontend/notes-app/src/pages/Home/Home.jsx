import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NotesCard from '../../components/NotesCard/NotesCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import Toast from '../../components/ToastMessage/Toast'
import EmptyCart from '../../components/EmptyCart/EmptyCart'

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown:false,
    type:"add",
    data : null,
  })

  const [showToastMsg, setShowToastMsg] = useState({
    isShown:false,
    message:"",
    type:"add",
  })

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([])
  const navigate = useNavigate()

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({isShown: true, type:"edit", data:noteDetails})
  }

  const showToastMessage = (message, type) => {
    setShowToastMsg({isShown:true, message, type })
  }

  const handleCloseToast = () => {
    setShowToastMsg({isShown:false, message:""})
  }

  const handleCloseModal = () => {
    setOpenAddEditModal({ isShown: false, type: "add", data: null });
  };

  const getUserInfo = async() => {
    try{
      const response = await axiosInstance.get("/get-user");
      console.log(response)
      if (response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch(error) {
      console.log(error)
      if (error.response.status === 401){
        localStorage.clear();
        navigate("/");
      }
    }
  }

  const getAllNotes = async() => {
    try{
      const response = await axiosInstance.get("./get-all-notes");

      if (response.data && response.data.notes){
        setAllNotes(response.data.notes)
      }
    }catch(error){
      console.log("An unexpected error occurred. Please try again");
    }
  }

  const deleteNote = async(data) => {
    const noteId = data._id
    try{
        const response = await axiosInstance.delete('/delete-note/' + noteId)  
        
        if (response.data && !response.data.error){
            showToastMessage("Note Delete Successfully","delete")
            getAllNotes()
        }
    }catch(error){
        if(error.response && error.response.data && error.response.data.message){
            console.log("An expected error occurred")
        }
    }
}
  const updateIsPinned = async(noteData) => {
    const noteId = noteData._id
    try{
        const response = await axiosInstance.put('/update-note-pinned/' + noteId,{
            "isPinned": !noteId.isPinned,
        })  
        
        if (response.data && response.data.note){
            showToastMessage("Note Updated Successfully")
            getAllNotes()
        }
    }catch(error){
        console.log(error)
    }
  }

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);
  
  return (
    <>
      <Navbar userInfo={userInfo}/>
      <div className='container mx-auto'>
        {allNotes.length > 0 ?(<div className='grid grid-cols-4 gap-4 mt-10 ml-7'>
          {allNotes.map((item,index) => (
            <NotesCard 
              key={item._id}
              title={item.title}
              date={item.createdOn}
              content={item.content}
              tags = {item.tags}
              isPinned={item.isPinned}
              onEdit={() => handleEdit(item)}
              onPinNote={() => updateIsPinned(item)}
              onDelete={() => deleteNote(item)}
            />
          ))}
        </div>):(<EmptyCart />)}
      </div>
      
      <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10'
        onClick={() => {
          setOpenAddEditModal({isShown:true,type:"add",data:null})
        }}
      >
        <MdAdd className="text-[32px] text-white"/>
      </button>
      
      <Modal 
        isOpen = {openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)"
          }
        }}
        contentLabel=''
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll">

        <AddEditNotes 
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={handleCloseModal} 
          getAllNotes = {getAllNotes}
          showToastMessage = {showToastMessage}
        />
      </Modal>

      <Toast 
        isShown = {showToastMsg.isShown}
        message = {showToastMsg.message}
        type = {showToastMsg.type}
        onClose = {handleCloseToast}
      />

    </>
  )
}

export default Home