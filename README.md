# Project Title

Poetry

## Overview

Poetry is a safe place where you can publish your own poems and share them with the world.

### Problem

Everybody needs a supportive space where they can share their poetry and personal reflections, fostering a sense of community and belonging. It allows for emotional expression and connection, offering comfort and understanding in a safe environment. The platform inspires others and promotes mental well-being because people can share any thoughts, pain and happiness. It empowers individuals to share their thoughts and appreciate diverse forms of expression.

### User Profile

- Poetry souls:
  - publishing a new own poem
  - editing an exisiting poem
  - deleting an exisiting poem
  - liking/unliking somedody's poem
  - viewing all poems
  - viewing the details of some poem and finding the poems of this author

### Features

- As a user, I want to be able to view all the poems
- As a user, I want to be able to find details of the poem
- As a user, I want to be able to see the history if the website

- As a user, I want to be able to create an account to manage my poems
- As a user, I want to be able to login to my account to manage my poems

- As a logged in user, I want to view my account details
- As a logged in user, I want to edit my account details
- As a logged in user, I want to publish a poem
- As a logged in user, I want to edit an existing poem
- As a logged in user, I want to delete an existing poem
- As a logged in user, I want to view all own poems
- As a logged in user, I want to view the favourite poems
- As a logged in user, I want to unlike the favourite poem
- As a logged in user, I want to like the poem

## Implementation

### Tech Stack

- React
- JavaScript
- MongoDB
- Firebase
- Express
- Client libraries:
  - react
  - react-router
  - axios
  - firebase
  - react-cookie
- Server libraries:
  - express
  - bcrypt for password hashing
  - cookie-parser
  - mongoose
  - cors

### APIs

- No external APIs will be used.

### Sitemap

- Home page
- List poems
- View + Like/Unlike a poem
- Register
- Login

### Mockups

#### Home Page

![](/mockups/home.png)

#### Register Page

![](/mockups/register.png)

#### Login Page

![](/mockups/login.png)

#### Enter Location Page

![](/mockups/account.png)

#### View Favourite Poems of User Page

![](/mockups/fav-poems.png)

#### Own Poems Page

![](/mockups/myPoems.png)

#### View Cafés Page

![](/mockups/poetry.png)

#### View Café Page

![](/mockups/poem.png)

#### About Page

![](/mockups/about.png)

### Data

![](/mockup/diagram.png)

### Endpoints

**GET /poetry**

- Get poems, possibly if the user is logged in or not

Response:

```
{
    "success": true,
    "data": [
        {
            "_id": ObjectId("66e08d1491564c2a083b879d"),
            "title": "dsfdsf",
            "author": ObjectId("66df4ad15f4d01df2f57648e"),
            "poem": " hgbibjhjujkb",
            "likes": [],
            "createdAt": "2024-09-10T18:16:52.184Z"
        }
        ...
    ]
}
```

**GET /poetry/:id**

- Get poem by id, possibly if the user is logged in or not

Parameters:

- id: Poem id as number

Response:

```
{
    "_id": "66e08d1491564c2a083b879d",
    "title": "dsfdsf",
    "author": "66df4ad15f4d01df2f57648e",
    "poem": " hgbibjhjujkb",
    "likes": [],
    "createdAt": "2024-09-10T18:16:52.184Z"
}
```

**GET /poetry/author/:id**

- Get poems by author id, possibly if the user is logged in or not

Parameters:

- id: Author id as number

Response:

```
{
    "_id": "66e08d1491564c2a083b879d",
    "title": "dsfdsf",
    "poem": " hgbibjhjujkb",
    "likes": [],
    "createdAt": "2024-09-10T18:16:52.184Z"
}
```

**POST /poetry**

- Logged in user can add a poem

Parameters:

- token: JWT of the logged in user

Response:

```
{
    "_id": "66e08d1491564c2a083b879d",
    "title": "dsfdsf",
    "author": "66df4ad15f4d01df2f57648e",
    "poem": " hgbibjhjujkb",
    "likes": [],
    "createdAt": "2024-09-10T18:16:52.184Z"
}
```

**PUT /poetry/:id**

- Logged in user can update a title and text of the photo

Parameters:

- token: JWT of the logged in user
- id: Poem id as number

Response:

```
{
    "_id": "66e08d1491564c2a083b879d",
    "title": "dsfdsf",
    "author": "66df4ad15f4d01df2f57648e",
    "poem": " hgbibjhjujkb",
    "likes": [],
    "createdAt": "2024-09-10T18:16:52.184Z"
}
```

**DELETE /poetry/:id**

- Logged in user can delete a poem

Parameters:

- token: JWT of the logged in user
- id: Poem id as number

Response:

```
{
    msg: "The poem has been removed",
    data: {
    "_id": "66e08d1491564c2a083b879d",
    "title": "dsfdsf",
    "author": "66df4ad15f4d01df2f57648e",
    "poem": " hgbibjhjujkb",
    "likes": [],
    "createdAt": "2024-09-10T18:16:52.184Z"
    }
}

```

**PUT /poetry/:id/like**

- Logged in user can like/unlike the poem

Parameters:

- token: JWT of the logged in user
- id: Poem id as number

Like Response:

```
{
    "_id": "66e08d1491564c2a083b879d",
    "title": "dsfdsf",
    "author": "66df4ad15f4d01df2f57648e",
    "poem": " hgbibjhjujkb",
    "likes": ["67df4ad18f4d02df2f57648e"],
    "createdAt": "2024-09-10T18:16:52.184Z"
},
```

Unlike Response:

```

{
"\_id": "66e08d1491564c2a083b879d",
"title": "dsfdsf",
"author": "66df4ad15f4d01df2f57648e",
"poem": " hgbibjhjujkb",
"likes": [],
"createdAt": "2024-09-10T18:16:52.184Z"
}

```

**POST /auth/register**

- Add a user account

Parameters:

- email: User's email
- nickname: User's nickname
- firstName: User's firstName
- lastName: User's lastName
- photo: User's photo
- password: User's provided password

Response:

```

{
"token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}

```

**POST /auth/login**

- Login a user

Parameters:

- email: User's email
- password: User's provided password

Response:

```

{
"token": "seyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}

+ Token will be added to cookies

```

### Auth

- JWT auth
  - Before adding auth, all API requests will be using a fake user with id 1
  - Added after core features have first been implemented
  - Store JWT in cookie, that expires in 1 hour
  - Add states for logged in showing different UI in places listed in mockups

## Roadmap

- Create client

  - react project with routes and boilerplate pages

- Create server

  - express project with routing, with placeholder 200 responses

- Create MongoDB Project

- Create Firebase Project

- Choose my 10 poems, so rights will not be violated

- Add some poems in MongoDB in the web app

- Deploy client and server projects so all commits will be reflected in production

- Feature: List poems

  - Implement list poetry page
  - Create GET /poetry endpoint

- Feature: View poem

  - Implement view poem page
  - Create GET /poetry/:id

- Feature: Like/unlike poem

  - Add a heart icon to change the like field at the database
  - Create PUT /like

- Feature: Home page

- Feature: Create account

  - Implement register page + form
  - Create POST /auth/register endpoint

- Feature: Login

  - Implement login page + form
  - Create POST /auth/login endpoint

- Feature: Implement JWT tokens

  - Server: Update expected requests / responses on protected endpoints
  - Client: Store JWT in cookies, include JWT on axios calls

- Bug fixes

- DEMO DAY

```

```
