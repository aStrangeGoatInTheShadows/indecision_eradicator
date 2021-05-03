CREATE TABLE creator (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL, -- ERROR CHECK ON INPUT
  user_name VARCHAR(255) NOT NULL, 
  password VARCHAR(255) DEFAULT 'password',
  phone_number TEXT -- ERROR CHECK ON INPUT
);

INSERT INTO creator (email, user_name, password, phone_number)
VALUES 
('franklysexy@hotmale.com', "insecure_male", 'password', '604-310-1010'),
('deadbeatdad@shaw.ca', "loser_dad", 'password', '778-250-4410')