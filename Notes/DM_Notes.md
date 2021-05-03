## FUNCTIONALITY:

TOBE FORMATTED - with love from matt
poll_unique_vists will be our table to track poll usage
when a user visits a website, throw down a cookie with a unique id
such as "hahaomgitsfridayandimindecisiveroflmaowtf"
<!--  When a user goes to a poll, if they alread went, show them the pretty 
NEED THIS MANY MORE VOTES or time.... and a unicorn farting rainbows (stretch)-->


PRESENTATION THOUGHTS

Watch some ted talks and apple announcements. Pick up the general vocal pattern and speach pace.
Then throw in some unicorn thunder jam in there. I was thinking some jazz hands.

1. Create a poll with multiple options
  - Each poll has title, description, and options
    - Each option has a title and description

2. When creating a poll, must enter a valid email (use mailgun to send)
  - When poll is created, email sent to address containing 2 links
    - Link 1: admin link (to access results)
    - Link 2: submission link (share with others to vote)

3. When a user clicks SUBMISSION link, they enter a name
  - Once name is entered, show poll with options
  - User can rank (DRAG or CLICK to order or OTHER) options
  - User can submit their options

4. Upon User submission, creator of poll is notified with the admin link (to access results)
  - Results are ranked using the Borda Count method (https://en.wikipedia.org/wiki/Borda_count)
    - STRETCH: If tie -> Implement coin flip (api to some cool graphic coin flipper? Could be simple function otherwise)

## SQL TABLES:
1. polls (user creates poll, gives a title, gives a description(?), provides options)
  - id
  - creator_id
  - title
  - description
  - options_id (?)
2. options (user creates options, gives title, gives description, OTHER users rate/rank)
  - id
  - title
  - description
  - borda_count? (alias; rating)
3. emails (user provides email upon poll creation, ) 
  - id
  - email
  - poll?

example?
  email 
  id  | email               |   poll
  -------------------------------------------------
  1   |hi@gmail.com         |  Pick Restaurant
  2   |bob@gmail.com        |  Board-game
  3   |sally@gmail.com      |  Color of dress
  4   |Grandma@gmail.com    |  Heavy Metal playlist
