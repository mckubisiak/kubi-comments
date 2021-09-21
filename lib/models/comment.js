import pool from '../utils/pool.js';

export default class Comment {
  id;
  name;
  comment;
  email;
  date;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.comment = row.comment;
    this.email = row.email;
    this.date = row.date;
  }

  static async insert({ name, comment, email, date }) {
    const { rows } = await pool.query(
      `INSERT INTO Comments (name, comment, email, date)
      VALUES ($1, $2, $3, $4) 
      RETURNING *
      `,
      [name, comment, email, date]
    );
    return new Comment(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT *
    FROM comments
    `);
    return rows.map((row) => new Comment(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * 
      FROM comments 
      WHERE id=$1`,
      [id]
    );
    return new Comment(rows[0]);
  }

  static async updateById(id, { name, comment, email, date }) {
    const currentComment = await Comment.getById(id);
    const newName = name ?? currentComment.name;
    const newComment = comment ?? currentComment.comment;
    const newEmail = email ?? currentComment.email;
    const newDate = date ?? currentComment.date;

    const { rows } = await pool.query(
      `UPDATE comments 
      SET name=$1, comment=$2, email=$3, date=$4 
      WHERE id=$5 
      RETURNING *`,
      [newName, newComment, newEmail, newDate, id]
    );
    return new Comment(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM comments
      WHERE id=$1
      RETURNING *`,
      [id]
    );
    return new Comment(rows[0]);
  }

}
