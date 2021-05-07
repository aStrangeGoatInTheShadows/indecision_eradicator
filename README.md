# TOP SECRET UNICORN THUNDER PROJECT
This project creates poll with a user specified max number of participants with custom poll options. The creator is emailed two links:
- Admin link: To view results of the poll
- Submission link: To share with their friends to vote with

Users may drag and drop the options and place them in order of most preferable to least preferable (top to bottom). Once they're happy with their rankings, they can submit their vote!

As users submit their votes on the poll, the creator is informed via email that a vote has been completed. Once everyone has voted, the creator receives a final 'Poll has been completed' email containing the final results.
## Getting Started
1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
5. Visit `http://localhost:8080/`
   
## Notable Features
- PostgreSQL DB (hosted on ElephantSQL)
- Nodemailer for emailing
- RESTful endpoints
- Express server
- jQuery Drag and Drop
- Ejs templates
- CSS animations (speedy unicorn!)
- Max voters on polls option

## Screenshots
[Voter Count](##img of 2/3 voters page)

## Dependencies
- "body-parser": "^1.19.0"
- "chalk": "^2.4.2"
- "cookie-session": "^1.4.0"
- "dotenv": "^2.0.0"
- "ejs": "^2.6.2"
- "express": "^4.17.1"
- "morgan": "^1.9.1"
- "nodemailer": "^6.6.0"
- "pg": "^8.5.0"
- "pg-native": "^3.0.0"
- "readable-stream": "^2.3.6"
- "twilio": "^3.61.0"

## ERD
https://lucid.app/lucidchart/invitations/accept/inv_27bd99d1-6576-4328-b53e-453dee3ad853?viewport_loc=-257%2C-81%2C3012%2C1499%2C0_0
[ERD](##img of ERD)


## Design
https://www.figma.com/file/jDiTFxigBPke9LADpOzxW9/team-unicorn-thunder?node-id=0%3A1
[Figma](##img of Figma)

## Resources
- https://www.twilio.com/
- https://jqueryui.com/sortable/
- Landing Page background animation inspired by Manuel Pinto : https://manuel.pinto.dev/
- https://www.w3schools.com/

## Maintainers
- Matt Macdonald
- Alvin Ng
- David Martinez
