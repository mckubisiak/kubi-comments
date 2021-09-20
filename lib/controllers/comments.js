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
;
