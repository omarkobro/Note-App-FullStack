// src/modules/notes/note.controller.js
import Note from '../../../DB/models/note.model.js';
import { AppError } from '../../utils/appErr.js';

export const createNote = async (req, res, next) => {
  const { title, content, tags, isPinned } = req.body;

  const note = await Note.create({
    title,
    content,
    tags,
    isPinned,
    userId: req.authUser._id, 
  });

  return res.status(201).json({
    message: 'Note created successfully',
    note,
  });
};

// Edit Note 
export const editNote = async (req, res, next) => {
  const { noteId } = req.params;
  const { title, content, tags, isPinned } = req.body;

  const note = await Note.findById(noteId);

  if (!note) {
    return next(new AppError('Note not found', 404));
  }

  if (note.userId.toString() !== req.authUser._id.toString()) {
    return next(new AppError('Unauthorized to edit this note', 403));
  }

  note.title = title ?? note.title;
  note.content = content ?? note.content;
  note.tags = tags ?? note.tags;
  note.isPinned = isPinned ?? note.isPinned;

  await note.save();

  return res.status(200).json({
    message: 'Note updated successfully',
    note,
  });
};

//===================== Get User's Notes =======================
export const getUserNotes = async (req, res, next) => {
  const userId = req.authUser._id;
  const {
    search = '',
    isPinned,
    sortBy = 'updatedAt',
    order = 'desc',
    tag,
  } = req.query;

  const filter = { userId };

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } },
    ];
  }

  if (typeof isPinned !== 'undefined') {
    filter.isPinned = isPinned === 'true';
  }

  if (tag) {
    filter.tags = tag;
  }

  const sort = {
    isPinned: -1,
    [sortBy]: order === 'asc' ? 1 : -1,
  };

  const notes = await Note.find(filter).sort(sort);

  return res.status(200).json({
    message: 'Filtered notes retrieved successfully',
    count: notes.length,
    notes,
  });
};

// ================ pin Note ======================
export const pinNote = async (req, res, next) => {
  const userId = req.authUser._id;
  const { noteId } = req.params;

  const note = await Note.findOne({ _id: noteId, userId });

  if (!note) {
    return next(new AppError('Note not found or access denied', 404));
  }

  note.isPinned = !note.isPinned;
  await note.save();

  return res.status(200).json({
    message: `Note has been ${note.isPinned ? 'pinned' : 'unpinned'} successfully`,
    note,
  });
};

//============== delete note api ===============
export const deleteNote = async (req, res, next) => {
  const userId = req.authUser._id;
  const { noteId } = req.params;

  const note = await Note.findOneAndDelete({ _id: noteId, userId });

  if (!note) {
    return next(new AppError('Note not found or access denied', 404));
  }

  return res.status(200).json({
    message: 'Note deleted successfully',
    noteId: note._id,
  });
};