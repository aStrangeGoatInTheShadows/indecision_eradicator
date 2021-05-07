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
### Landing Page
![Landing Page](https://github.com/aStrangeGoatInTheShadows/indecision_eradicator/blob/master/Docs/Landing%20Page.png)

### Poll Options
![Poll Options](https://github.com/aStrangeGoatInTheShadows/indecision_eradicator/blob/master/Docs/Create%20poll%20options.png)

### Poll Created
![Poll Created](https://github.com/aStrangeGoatInTheShadows/indecision_eradicator/blob/master/Docs/poll%20created%20with%20links.png)

### User Voting
![User Voting](https://github.com/aStrangeGoatInTheShadows/indecision_eradicator/blob/master/Docs/user%20voting.png)

### Voter Count
![Voter Count](https://github.com/aStrangeGoatInTheShadows/indecision_eradicator/blob/master/Docs/1%20of%203%20voters%20voted.png)

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
[ERD](https://github.com/aStrangeGoatInTheShadows/indecision_eradicator/blob/master/Docs/ERD.png)


## Design
https://www.figma.com/file/jDiTFxigBPke9LADpOzxW9/team-unicorn-thunder?node-id=0%3A1
[Figma](https://github.com/aStrangeGoatInTheShadows/indecision_eradicator/blob/master/Docs/Figma.png)

## Resources
- https://www.twilio.com/
- https://jqueryui.com/sortable/
- Landing Page background animation inspired by Manuel Pinto : https://manuel.pinto.dev/
- https://www.w3schools.com/

## Maintainers
- Matt Macdonald
- Alvin Ng
- David Martinez
