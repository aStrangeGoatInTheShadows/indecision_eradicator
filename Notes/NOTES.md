Google Maps Api can be scary


Decision maker

User Stories

4 People on a friday who can't decide what to do because someone only drinks wine and someone else is a beer snob and needs iPa

A STUDENT, I want to decide what to do with my free 30 minutes so that I'm entertained and don't spend money
As a follower student, I want an opinion in the matter, but i'd like some options cause i don't have time to think independantly

As a Worker Drone, I want to make a poll so that i don't have to user mental energy thinking.
I need to eat food

A worker drone

A person who retired (somehow)
As a person whoes 35 and has a million dollars, I am stupid and don't know how to invest, i would like to make a poll so random strangers can tell me how to invest

As a creator can create a poll with multiple choices
As a creator i want to be able to limit the amount of submission to my poll - NOT MVP
As a creator, I want to share a Poll linked to my email.
As a creator, i want to receive the submissions and the admin link - via email
As a create. i want to see the results of my poll, 
As a creator, I would like to know when the right amount of results have been received (email notification or txt notification) * NOT MVP
AS a creator, each time a submission is received, i'd like a notification (which includes the administrative link and a link to the results)
As a creator i would liek the results to be ranked using the Borda Count method: https://en.wikipedia.org/wiki/Borda_count because shut up thats why

Make minumum as small as possible and choose which of these stories will dictate the MVP

As a User, I want to see poll choices, (as user i should receive a link to a poll)
As a User, I would like to be able to add a choice to the poll (STRETCH, Would be nice) check requirements
As a User, i would like to be able to choose and unique identifying name that will make people laugh or offend them
As a User, I would like to be able to rank choices.
As a user, I would like a know when the survey has been completed. (STRETCH)

If everyone votes or creator gets impatient and closes or it is timeboxed and the end is reached.
As a creator i would like to be able to time box my survey
As a creator i would like to be able to cut off the survey early at my convience
as a creator i would like the be 

As a friend, i want to recieve a submission. 

Survey
Limit of 10



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Option 4: Decision Maker
A web app that helps groups of friends to vote on a preferred choice (using ranked voting), for example: "What movie should we see next Friday?".

Requirements:
a user can create a poll with multiple choices
each choice can have a title and optional description
the creator must enter an email
when a poll is finished being created, the user is given two links: an administrative link (which lets them access the results) and a submission link (which the user sends to their friends)
the links are also sent to the creator via email (using mailgun)
when a user visits the submission link, they enter their name if required and see a list of the choices for that poll
the user can rank the choices (by drag and drop, or some other method) and then submits the poll
each time a submission is received, the creator is notified with an email (which includes the administrative link and a link to the results)
the results are ranked using the Borda Count method: https://en.wikipedia.org/wiki/Borda_count
note: this app does not follow the typical user authentication process: voters don't need to register or log in and the only way to access the polls or see the results is via links