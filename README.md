# Eventer

## Description

Eventer is an application that helps users discover, organize, and manage events happening in the city. Users can sign up, log in, and create a personalized backlog of city events, add comments, and interact with other users.

## User Stories

- **404:** As an anonymous/user, I can see a 404 page if I try to reach a page that does not exist, so I know it's my fault.
- **Signup:** As an anonymous user, I can sign up on the platform to start discovering and managing city events.
- **Login:** As a user, I can log in to the platform to start creating and managing my backlog of city events.
- **Logout:** As a user, I can log out from the platform so that no one else can modify my information.
- **Add Events:** As a user, I can add events.
- **Update Events:** As a user, I can edit events .
- **Delete Events:** As a user, I can delete events.

## To be added in the future

- Friends list
- Explore events by category
- Share events on social media

## Client / Frontend

### React (React App)

| Path               | Component                    | Permissions | Behavior                                                      |
| ------------------ | ---------------------------- | ----------- | ------------------------------------------------------------- |
| `/`                | SplashPage                   | Public      | Home page                                                     |
| `/signup`          | SignupPage                   | Anonymous   | Signup form, link to login, navigate to homepage after signup |
| `/login`           | LoginPage                    | Anonymous   | Login form, link to signup, navigate to homepage after login  |
| `/events/all`      | NavBar, EventList, FooterBar | User        | Shows all city events in the database                         |
| `/events/add/:id`  | EventInfo                    | User        | Add an event to the database                                  |
| `/events/:eventId` | EventDetails                 | User        | Show details of a specific event                              |

### Components

- LoginPage
- SignupPage
- NavBar
- EventList
- EventInfo
- EventDetails

### Services

- Auth Service

  - auth.login(user)
  - auth.signup(user)

- Event Service
  - event.detail(id)
  - event.add(id)
  - event.delete(id)
  - event.update(id)

## Server / Backend

### Models

**User Model**

{
username: {type: String, required: true, unique: true},
email: {type: String, required: true, unique: true},
hashedPassword: {type: String, required: true},
events: [{type: Schema.Types.ObjectId, ref: 'Event'}]
}
Event Model

{
title: {type: String, required: true},
category: {type: String, required: true},
date: {type: Date, required: true},
location: {type: String, required: true},
description: {type: String, required: true},
createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}
Comment Model

{
like: {type: Boolean},
description: {type: String, required: true},
createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
event: {type: Schema.Types.ObjectId, ref: 'Event', required: true},
}

API Endpoints (Backend Routes)
HTTP Method URL Request Body Success Status Error Status Description
GET /auth/profile Saved session 200 404 Check if the user is logged in and return the profile page
POST /auth/signup {username, email, password} 201 404 Checks if fields are not empty (422) and if the user does not exist (409), then create a user with an encrypted password, and store the user in the session
POST /auth/login {username, password} 200 401 Checks if fields are not empty (422), if the user exists (404), and if the password matches (404), then stores the user in the session
POST /auth/logout (empty) 204 400 Logs out the user
GET /events/all 400 Show all city events on backlog
GET /events/search Search for city events to be added
GET /events/:eventId Show details of a specific event
POST /events/add {title, category, date, location, description} 201 400 Add a new city event to the backlog
PUT /events/:eventId 200 400 Edit a city event
DELETE /events/:eventId 201 400 Delete a city event
GET /events/:eventId/comments 400 Show comments for a specific city event
POST /events/:eventId/comments {like, description} 201 400 Add a comment to a city event
PUT /comments/:commentId 200 400 Edit a comment
DELETE /comments/:commentId 204 400 Delete a comment

Links

Trello/Kanban
Link to your Trello board

Git
Client Repository Link
https://github.com/SJK-IronHack/M3_Project_Frontend
Server Repository Link
https://github.com/sitkujanos86/M3_Project_Backend
Deployed App Link

Slides
Slides Link
