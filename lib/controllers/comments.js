import { Router } from 'express';
import Comment from '../models/comment';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const comment = await Comment.createComment(req.body);
      res.send(comment);
    } catch (err) {
      next (err);
    }
  })
;
