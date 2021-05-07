## PRESENTATION THOUGHTS

### Flow:

**Show main page**

 ***David***: Our group decided to pick Option 4, the Decision Maker project. Through process of elimination we narrowed it down to decision maker , smart-to-do, and resource wall. Ultimately, we couldn't come to a decision and through "damn, i wish we had a decision maker".

 ***Alvin***: During our planning phase we decided to use Lucidcharts for our ERD and Figma for our design markup and here's the fruits of our labour **Show ERD and Figma pages** 
 During implementation phase we found ourselves referring back this over and over again.

 [Figma Link](https://www.figma.com/file/jDiTFxigBPke9LADpOzxW9/team-unicorn-thunder?node-id=0%3A1)

 [ERD Link](https://lucid.app/lucidchart/invitations/accept/inv_27bd99d1-6576-4328-b53e-453dee3ad853?viewport_loc=-257%2C-81%2C3012%2C1499%2C0_0)

***Alvin***: Here's the stack and some of the technologies we used for the project
https://docs.google.com/document/d/11Rrm7CQUH7VImj8jCjkL_ZtLQpZ0ERM9DmSxNS2W1Lo/edit

We split the work up in a vertical fashion. Matt setup the DB and the queries,as well as integration with email and sms, David handled the setup for the frontend, while I setup the backendof the project. We also wanted to shout out Peer programing as it was consistently used to troubleshoot errors.

 ***David***: Let's walk through the steps of creating a poll, voting, and viewing the results....

 **1. Click create poll**
 Here are the fields for a user to create a poll. We've restricted the forms to require a Title and an email. 

 We're hungry, so let's title this poll, 'LUNCH'

 For now we will just have 3 users voting on this poll, Alvin, Matt, and I. But this could be however many you want.

(alvinoalvintest@gmail.com)
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


<!-- OPTIONAL -->
**Extra**
We also had a server setup with the project for anyone to view and use, but unfortunately there were some hardware issues and it crashed. Maybe in the future we will get that back up and running for you all to use!

**Hardships**  
- **Git conflicts / merges**
- Syntax typos (missing single '.' in a string)
- Overwriting variables inside promises
- Hardware issues
- Different active working schedules
