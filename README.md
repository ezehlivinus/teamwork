# teamwork
Teamwork is an internal social network for employees of an organization. The goal of this application is to facilitate more interaction between colleagues and promote team bonding.

## Basics: api end points
<pre>
Base path: /api/v1/users
Users:
-- Post: /auth/create-user
This end point accepts data that has the following properties/field on it body

{
	"name": "joe",
	"username": "joe123",
	"email": "some@email.com",
	"password": "some-password",
	"is_admin": false
}

-- Post: /auth/signin
path: /api/v1/users/auth/signin

{
	"email": "some@email.com",
	"password": "some-password",
}

-- Get: fetch all users: /
path: /api/v1/users

-- Get: fetch a user: /<id>
  path: /api/v1/users/id
  
-- Patch: Update a user: /id
apth:  /api/v1/users/<id>
{
	"name": "joe",
	"username": "joe123",
	"email": "some@email.com",
	"is_admin": false
}

-- Delete: delete a user: /id
  path: /api/v1/users/<id>
</pre>
