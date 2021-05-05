-- Please see AND UPDATE Notes/data_outline.md if changes are made here,  Thank you

DROP TABLE IF EXISTS polls CASCADE;
CREATE TABLE polls (
  id SERIAL PRIMARY KEY,
  creator_id INTEGER,
  title TEXT,
  description TEXT,
  admin_link VARCHAR(255) NOT NULL, -- access for admin privelages 
  survey_link VARCHAR(255) NOT NULL,  -- access for the serfs
  time_created TIMESTAMP NOT NULL,  
  time_closed TIMESTAMP  DEFAULT NULL, -- Null if survey open (FALSE BOOLEAN IF NO TIME)
  time_to_death TIMESTAMP DEFAULT NULL -- By default our surveys should never die because they are unicorn thunder
);

-- the choices available for all polls - ideally used linked to the poll we want
DROP TABLE IF EXISTS poll_choices;
CREATE TABLE poll_choices (
    id SERIAL PRIMARY KEY NOT NULL,         -- TODO MATT TODO MATT __ CHECK PROPER USAGE
    poll_id INTEGER REFERENCES polls(id), -- ON DELETE CASCADE,
    name TEXT, -- this is the name and descripter for this choice on the survey
    rating INTEGER DEFAULT 0 -- Please see Notes/data_outline.md for current deffinition
);

DROP TABLE IF EXISTS poll_unique_visits;
CREATE TABLE poll_unique_visits (
    id SERIAL PRIMARY KEY NOT NULL, -- TODO MATT TODO MATT ___ CHECK USAGE
    poll_id INTEGER REFERENCES polls(id), -- ON DELETE CASCADE,
    cookie_id TEXT, -- unique visits 
    phone_number TEXT
);