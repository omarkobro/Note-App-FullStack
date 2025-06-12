import { useEffect, useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";

const AddEditNotes = ({ noteData, type, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (noteData) {
      setTitle(noteData.title || '');
      setContent(noteData.content || '');
      setTags(noteData.tags || []);
    }
  }, [noteData]);

  const addNewNote = async () => {
    const formData = { title, content, tags };
    await onSubmit(formData, 'add');
  };

const editNote = async () => {
  const formData = {
    title,
    content,
    tags,
  };
  await onSubmit(formData, 'edit', noteData._id);
};

  const handleAddNote = () => {
    if (!title.trim()) {
      setError("Please provide a title for the note.");
      return;
    }

    setError(null);

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-red-500"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym at 7 AM"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="input-label">Content</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
        {type === 'edit' ? 'Update' : 'Add'}
      </button>
    </div>
  );
};

export default AddEditNotes;
