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
    const { rows } = await pool.query(`
    INSERT INTO Comments (name, comment, email, date)
    VALUES ($1, $2, $3, $4) 
    RETURNING *
    `,
    [ name, comment, email, date ]);
    return new Comment(rows[0]);
  };

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT *
    FROM comments
    `);
    return rows.map((row) => new Comment(row));
  }

}
