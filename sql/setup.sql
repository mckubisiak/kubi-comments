DROP TABLE IF EXISTS comments;

  CREATE TABLE comments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    comment TEXT NOT NULL,
    date DATE,
    email TEXT
  );

