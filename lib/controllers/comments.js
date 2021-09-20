import { Router } from 'express';
import Comment from '../models/comment.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const comment = await Comment.insert(req.body);
      res.send(comment);
    } catch (err) {
      next (err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const comments = await Comment.getAll();
      res.send(comments);
    } catch (err) {
      next (err);
    }
  })
;
