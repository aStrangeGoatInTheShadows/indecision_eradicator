
INSERT INTO polls (creator_id, title, description, admin_link, survey_link, time_created, time_to_death)
VALUES 
(1,'should i quit my job', 'where we should go', 'www.lifehouselab.ca', 'a fake link', CURRENT_TIMESTAMP , null),
(1,'where to eat', 'where we should eat', 'www.sdf.ca', 'www.google.ca/potatofortress', CURRENT_TIMESTAMP , null),
(1,'what are do', 'what should we do', '10.0.0.1', 'www.sdflkjslkdf.ca/sdfsdf', CURRENT_TIMESTAMP , null),
(1,'does frank suck', 'frank is an idiot', 'www.ALWEESFRESH.ca', 'www.arstechnica.ca/potatofortress', CURRENT_TIMESTAMP , null),
(1,'what school i go to', 'where we should eat', 'www.spudexpress.ca', 'www.ghdghdfgh.ca/potatosdfsdfsdffortress', CURRENT_TIMESTAMP , null),
(1,'what should we name your baby', 'BABY NAMES', 'www.google.ca', 'www.fgddfg.ca/potatofortress', CURRENT_TIMESTAMP , null),
(1,'ARE WE EVEN FRIENDS?!?!?!', 'where we should eat', 'www.ALSXFDGIK.ca', 'www.godfgdfgdfggogle.ca/potdfsdfsdfatofortress', CURRENT_TIMESTAMP , null),
(1,'Why I dumped my ex', 'the description is in the title dork', 'www.ALSXFDGIK.ca', 'www.godfgdfgdfggogle.ca/potdfsdfsdfatofortress', CURRENT_TIMESTAMP , null);

INSERT INTO poll_choices (poll_id, name)
VALUES 
(8, 'too smart'), 
(8, 'too dumb'), 
(8, 'too tall'), 
(8, 'too short'), 
(8, 'too themselves'), 
(8, 'not themselves enough'), 
(8, 'too unhealthy'), 
(8, 'too health'), 
(8, 'too loquacious'), 
(8, 'too terse'); 


INSERT INTO poll_choices (poll_id, name)
VALUES 
(6, 'ted'), 
(6, 'teddy'), 
(6, 'fred'), 
(6, 'freddy'), 
(6, 'apple'), 
(6, 'jelly bean'), 
(6, 'georgie'), 
(6, 'jamie'), 
(6, 'michael'), 
(6, 'sarah'); 