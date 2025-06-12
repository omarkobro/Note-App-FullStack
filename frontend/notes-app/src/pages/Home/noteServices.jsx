import axiosInstance from "../../utils/helper";

export const getUserNotes = async (params = {}) => {
  const res = await axiosInstance.get(`/note/getAllNotes`, {
    params, 
  });
  return res.data.notes;
};
export const createNote = async (data) => {
  const res = await axiosInstance.post('/note/addNote', data);
  return res.data.note;
};

export const editNote = async (noteId, data) => {
  const res = await axiosInstance.put(`/note/editNote/${noteId}`, data);
  return res.data.note;
};

export const deleteNote = async (noteId) => {
  const res = await axiosInstance.delete(`/note/deleteNote/${noteId}`);
  return res.data.noteId;
};

export const togglePinNote = async (noteId) => {
  const res = await axiosInstance.patch(`/note/pinNote/${noteId}`);
  return res.data.note;
};


export const getUserProfile = async () => {
  const res = await axiosInstance.get('/user/profile'); 
  return res.data.user;
};