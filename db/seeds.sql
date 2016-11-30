DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS students CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR (255),
  password_digest VARCHAR(255)
);

-- INSERT INTO users (username, email, password) VALUES ('admin', 'admin@ga.co', 'password123'), ('ludoviko', 'doktoro@ga.co', 'revanto');
