Data outline goes here

<!--  DEPCRECATED -->

<!-- START POLLS TABLES -->

Polls 

id - pk
title - poll title - text
description - poll - text
admin_link - URL for admin to login and see poll
survey_link - URL to send to people to vote
time_created - timestamp - madatory
time_closed - timestamp - (if null, poll can be voted on)
time_to_death timestamp - Default NULL (asume open ended)

poll_choices - TABLE 
DESCRIPTION : this will be the choices available on a poll
pk - key, serial default
fk poll_id - links to polls table
title - text - A choice to vote on
rating - the sum of votes for a singular choice ***** FUNCTIONALITY  ************ if 10 options and user says this is their first choice then `rating += 10` if user says its their least favorite `rating +=1`

poll_unique_visits
id : pk - serial id
poll_id : FK - polls
cookie_id : leave a cookie when someone votes. leave the id here.

<!-- END POLLS -->

users - table
pk - id - users id default serial NOT NULL
email - VARCHAR - users email address NOT NULL
password - VARCHAR - password which is password by default for everyone
phone_number - text - this will store a users phone number as a string. This will need to tested for valid input on entry (ie, only except phone numbers valid in our area, we don't support out of area users.)

