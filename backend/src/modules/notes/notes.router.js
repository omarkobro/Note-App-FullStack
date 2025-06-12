// src/modules/notes/note.router.js
import { Router } from 'express';
import { validationMiddleware } from '../../middlewares/validation.middleware.js';
import { auth } from '../../middlewares/auth.middleware.js';
import { createNoteSchema, editNoteSchema } from './notes.validation.js';
import { createNote, deleteNote, editNote, getUserNotes, pinNote } from './notes.controller.js';
import expressAsyncHandler from 'express-async-handler';

const router = Router();

router.post(
  '/addNote',
  auth,
  validationMiddleware(createNoteSchema),
  expressAsyncHandler(createNote)
);

router.put(
  '/editNote/:noteId',
  auth,
  validationMiddleware(editNoteSchema),
  expressAsyncHandler(editNote)
);

router.get(
  '/getAllNotes',
  auth,
  expressAsyncHandler(getUserNotes)
);

router.patch(
  '/pinNote/:noteId',
  auth,
  expressAsyncHandler(pinNote)
);

router.delete(
  '/deleteNote/:noteId',
  auth,
  expressAsyncHandler(deleteNote)
);
export default router;
