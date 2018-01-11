import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

router.route('/notes').post(NoteController.addNote);
router.route('/notes/:noteId').delete(NoteController.deleteNote);
router.route('/notes').put(NoteController.updateNote);
router.route('/notes/move').put(NoteController.moveNote);

export default router;
