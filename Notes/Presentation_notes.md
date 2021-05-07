## PRESENTATION THOUGHTS

### Flow:

**Show main page**

 ***David***: Our group decided to pick Option 4, the Decision Maker project. We decided upon this mainly through process of elimination. We narrowed it down to this decision maker , smart-to-do, and resource wall. Ultimately, since none of us could come to a decision, we thought, 'hey, if we had a decision maker, this would be easier!'.

 ***Alvin***: We started planning with Lucidcharts for our ERD and Figma for our design markup. **Show ERD and Figma pages** During implementation we found ourselves referring back to these 2 resources over and over again. Showing just how valuable planning really is.

 [Figma Link](https://www.figma.com/file/jDiTFxigBPke9LADpOzxW9/team-unicorn-thunder?node-id=0%3A1)

 [ERD Link](https://lucid.app/lucidchart/invitations/accept/inv_27bd99d1-6576-4328-b53e-453dee3ad853?viewport_loc=-257%2C-81%2C3012%2C1499%2C0_0)

**Alvin**: For the backend of our project we used Express and JavaScript. And for the frontend we used ejs templates, CSS, and jQuery. For our database we used PostgreSQL, hosted on ElephantSQL. For emailing we used NodeMailer API. We also setup Twilio for SMS messaging, but did not fully test it yet.

 **David**: Let's walk through the steps of creating a poll, voting, and viewing the results....

 **1. Click create poll**
 Here are the fields for a user to create a poll. We've restricted the forms to require a Title and an email. 

 We're hungry, so let's title this poll, 'LUNCH'

 For now we will just have 3 users voting on this poll, Alvin, Matt, and I. But this could be however many you want.

 **2. Click create poll options**
 Here we can set whatever we'd like for poll options. Since we're hungry, Let's put in some lunch options.
 How about Option 1: McDonald's, and Option 2: Dairy Queen. Sounds great.
 
 **3. Create the Poll**
 Once the poll is created, the creator is sent an email with 2 links. One for reviewing the results of the poll, and the other for sharing with your friends to vote. 
 **Show email received**

 **4. Go vote, show results, etc**
 - Show user voting, drag and drop from most preferred to least / top to bottom
 - Go through voting steps
 - Show creator receive email, etc.
 - Show error page (type random stuff in url)
 - Show too many voters poll is closed page

Each time a friend votes on your poll, you receive an email with a link to the current results. Once everyone has voted the creator receives an Poll closure email, letting you know that your poll has been completed. 
> completed meaning, if 3 voters specified, 3 voters have voted 

**Closure**
That's as far as we got with the project so far. In the future we could add additional feature such as:
  - SMS messaging
  - Timed poll closures
  - Poll suggestions? ()
  - Horizontal bar chart for results (keeping the ordered list as well)

Thanks for listening!

**Extra**
We also had a server setup with the project for anyone to view and use, but unfortunately there were some hardware issues and it crashed. Maybe in the future we will get that back up and running for you all to use!
