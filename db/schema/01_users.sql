-- Drop and recreate Users table (Example)


CREATE TABLE creator (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL, -- ERROR CHECK ON INPUT
  user_name VARCHAR(255) NOT NULL, 
  password VARCHAR(255) DEFAULT 'password',
  phone_number TEXT -- ERROR CHECK ON INPUT
);
