# Auth API Plan

## Endpoints

- POST /auth/register
- POST /auth/login
- GET /auth/me

## User Model

- id
- firstName
- lastName
- username
- email
- passwordHash
- role
- createdAt
- updatedAt

## Register Flow

1. Receive user details.
2. Validate request body.
3. Check if email already exists.
4. Hash password.
5. Save new user in database.
6. Return user without password.
7. Optionally return JWT token.

## Login Flow

1. Receive email and password.
2. Validate request body.
3. Find user by email.
4. Compare password with passwordHash.
5. If valid, create JWT token.
6. Return token and user without password.

## Protected Route Flow

1. Client sends request with Authorization header.
2. Server extracts Bearer token.
3. Auth middleware verifies token.
4. If valid, attach user data to request.
5. Controller continues.
6. Role middleware checks permissions if needed.

## Notes / Mistakes

- Login does not receive JWT. Login creates the JWT.
- Protected routes receive JWT after login.
- Passwords are never saved as plain text.
- Use passwordHash instead of password.