import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import NoteCard from '../../components/Cards/NoteCard'
import { MdAdd } from 'react-icons/md'
import AddEditNotes from './AddEditNotes'
import Modal from 'react-modal'
import {
  getUserNotes,
  createNote,
  editNote,
  deleteNote,
  togglePinNote,
} from './noteServices';
import { toast } from 'react-toastify';
import { useEffect } from 'react'

const Home = () => {
      const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type : "add",
        data: null
    })
    const [notes, setNotes] = useState([]);
const [loading, setLoading] = useState(true);
const [searchQuery, setSearchQuery] = useState("");


useEffect(() => {
  loadNotes(searchQuery);
}, [searchQuery]);

const loadNotes = async (search = "") => {
  try {
    setLoading(true);
    const data = await getUserNotes(search ? { search } : {});
    setNotes(data);
  } catch (err) {
    console.error('Failed to load notes:', err);
    toast.error('Failed to load notes');
  } finally {
    setLoading(false);
  }
};


const handleAddOrEdit = async (formData, type, id = null) => {
  try {
    const note = type === 'edit'
      ? await editNote(id, formData)
      : await createNote(formData);

    toast.success(`Note ${type === 'edit' ? 'updated' : 'created'} successfully`);
    loadNotes();
    setOpenAddEditModal({ isShown: false, type: 'add', data: null });
  } catch (err) {
    console.error(err);
    toast.error('Failed to save note');
  }
};

const handleDelete = async (noteId) => {
  try {
    await deleteNote(noteId);
    toast.success('Note deleted');
    loadNotes();
  } catch (err) {
    console.error(err);
    toast.error('Failed to delete note');
  }
};

const handleTogglePin = async (noteId) => {
  try {
    await togglePinNote(noteId);
    loadNotes();
  } catch (err) {
    console.error(err);
    toast.error('Failed to update pin status');
  }
};
    
  return (
    <>
<Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    <div className='container mx-auto px-6'>
<div className='grid grid-cols-3 gap-4 mt-8'>
  {loading ? (
    <p>Loading notes...</p>
  ) : notes.length === 0 ? (
    <p>No notes found</p>
  ) : (
    notes.map((note) => (
      <NoteCard
        key={note._id}
        title={note.title}
        date={new Date(note.updatedAt).toLocaleDateString()}
        content={note.content}
        tags={note.tags}
        isPinned={note.isPinned}
        onEdit={() => setOpenAddEditModal({ isShown: true, type: 'edit', data: note })}
        onDelete={() => handleDelete(note._id)}
        onPinNote={() => handleTogglePin(note._id)}
      />
    ))
  )}
</div>
    </div>

    <button className='w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10' onClick={()=>{
      setOpenAddEditModal({isShown: true, type:"add", data: null})
    }}>
      <MdAdd className='text-[32px] text-white'/>
    </button>
    <Modal 
      isOpen = {openAddEditModal.isShown}
      onRequestClose= {()=>{}}
      style = {{
        overlay: { 
          backgroundColor: "rgba(0,0,0,0.2)"
        },
      }}
      contentLabel=''
      className="w-40% max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
    >

  <AddEditNotes
    type={openAddEditModal.type}
    noteData={openAddEditModal.data}
    onSubmit={handleAddOrEdit}
    onClose={() => setOpenAddEditModal({ isShown: false, type: 'add', data: null })}
  />
    </Modal>
    </>
  ) 
}

export default Home


