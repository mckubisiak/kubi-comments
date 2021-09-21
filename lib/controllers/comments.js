import { Router } from 'express';
import Comment from '../models/comment.js';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const comment = await Comment.insert(req.body);
      res.send(comment);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const comments = await Comment.getAll();
      res.send(comments);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const comments = await Comment.getById(id);
      res.send(comments);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, comment, email, date } = req.body;
      const updatedComment = await Comment.updateById(id, {
        name,
        comment,
        email,
        date,
      });
      res.send(updatedComment);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const comment = await Comment.deleteById(id);
      res.send({ message: `${comment.name} has retracted their comment` });
    } catch (err) {
      next(err);
    }
  });
