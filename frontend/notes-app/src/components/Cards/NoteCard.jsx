import React from 'react'
import {MdOutlinePushPin} from "react-icons/md"
import {MdCreate, MdDelete} from "react-icons/md"

const NoteCard = (
{    title,
    date,
    content,
    tags,
    isPinned,
    onEdit,
    onDelete,
    onPinNote
}
) => {
return (
  <div className="border rounded-xl p-4 bg-white hover:shadow-xl transition-all ease-in-out duration-200 flex flex-col gap-2">
    {/* Header */}
    <div className="flex items-start justify-between">
      <div>
        <h6 className="text-base font-semibold text-slate-800">{title}</h6>
        <span className="text-xs text-slate-500">{date}</span>
      </div>
      <button onClick={onPinNote} className="p-1 rounded-full hover:bg-slate-100 transition">
        <MdOutlinePushPin
          className={`text-xl ${isPinned ? 'text-primary' : 'text-slate-300'}`}
        />
      </button>
    </div>

    {/* Content Preview */}
    <p className="text-sm text-slate-600 mt-1 line-clamp-3">{content?.slice(0, 100)}</p>

    {/* Tags */}
    <div className="flex flex-wrap gap-2 mt-2">
      {tags?.map((tag, idx) => (
        <span
          key={idx}
          className="text-xs bg-slate-200 text-slate-600 px-2 py-1 rounded-full"
        >
          #{tag}
        </span>
      ))}
    </div>

    {/* Actions */}
    <div className="flex items-center justify-end gap-3 mt-3">
      <button onClick={onEdit} className="p-1 rounded-full hover:bg-green-100 transition">
        <MdCreate className="text-green-600 text-lg" />
      </button>
      <button onClick={onDelete} className="p-1 rounded-full hover:bg-red-100 transition">
        <MdDelete className="text-red-600 text-lg" />
      </button>
    </div>
  </div>
)
}

export default NoteCard