# Auth Module Summary

## Overview

This module implements a complete authentication and authorization system using modern backend technologies and clean architecture principles.

The goal of this module was:
- Practice real backend development.
- Understand authentication flow deeply.
- Build a scalable and maintainable backend structure.
- Improve TypeScript and backend engineering fluency.
- Learn how modern authentication systems work in production-style applications.

---

## Stack

- TypeScript
- Node.js
- Express.js
- PostgreSQL
- Prisma ORM v7
- Zod
- bcrypt
- JWT (`jsonwebtoken`)
- Docker
- Docker Compose
- ts-node-dev
- Postman

---

## Project Structure

```txt
src/
├── config/
├── controllers/
├── middlewares/
│   └── errors/
├── routes/
├── validations/
├── utils/
├── models/
├── types/
├── errors/
└── generated/
```

---

## Architecture

The project follows a layered backend architecture:

- Routes handle endpoint definitions.
- Controllers handle business logic.
- Middlewares handle cross-cutting concerns such as authentication, validation, and authorization.
- Validation schemas define request rules using Zod.
- Prisma handles database communication.
- Utilities contain reusable helper functions.
- Error handling is centralized through `AppError` and global error middleware.

This separation improves:
- Maintainability
- Scalability
- Readability
- Reusability
- Debugging experience

---

## Authentication Flow

### Register Flow

1. Validate request body using Zod.
2. Check if email or username already exists.
3. Hash password using bcrypt.
4. Create user in PostgreSQL using Prisma.
5. Generate JWT token.
6. Return token and a safe user object.

### Login Flow

1. Validate request body.
2. Find user by email.
3. Compare password with `passwordHash` using `bcrypt.compare`.
4. Generate JWT token.
5. Return token and a safe user object.

---

## Authorization Flow

### Auth Middleware

The auth middleware:
- Extracts JWT from the `Authorization` header.
- Verifies the token.
- Decodes `userId` and `role`.
- Attaches `authUser` to `req`.
- Protects private routes.

### Role Middleware

The role middleware:
- Checks the authenticated user's role.
- Allows or blocks access based on the required role.
- Returns 401 or 403 when necessary.

Example:

```ts
router.get(
  "/users",
  authMiddleware,
  requireRole("ADMIN"),
  getAllUsers
);
```

---

## Key Concepts Learned

### Backend Architecture

- Separation of concerns
- Controller-based architecture
- Centralized routing
- Middleware architecture
- Reusable utilities
- Layered backend structure

### Express.js

- Request lifecycle
- Middleware chain
- Error middleware
- Route organization
- Request/response handling
- `next()` flow

### TypeScript

- Interfaces
- Type safety
- Request augmentation
- Generics
- Reusable typing
- Async typing

### Validation

- Zod schemas
- Generic validation middleware
- Body/query/params validation
- Validation vs. business logic separation

### Database & ORM

- PostgreSQL fundamentals
- Prisma schema
- Prisma Client
- Prisma migrations
- `findUnique`
- `findFirst`
- `findMany`
- Database constraints
- ORM-based querying

### Authentication & Security

- JWT generation
- JWT verification
- Authorization headers
- Protected routes
- Role-based authorization
- Password hashing
- Password comparison
- Authentication flow
- Authorization flow

### Docker

- Docker Compose
- PostgreSQL container
- Environment variables
- Volumes
- Port mapping

### Error Handling

- Custom `AppError` class
- Global error middleware
- Centralized error handling
- Operational errors vs. unexpected errors

---

## Important Insights

- Validation is different from business logic.
- Database constraints are still important even with validation.
- Middleware should focus on one responsibility.
- Controllers should focus on business logic.
- Error handling should be centralized.
- Authentication and authorization are different concepts.
- DRY is important, but readability also matters.
- Building systems teaches more than passive learning.
- Understanding flow is more important than memorizing syntax.

---

## Future Improvements

Possible future improvements for this module:

- Refresh token flow
- Logout flow
- Access token rotation
- Testing
- Rate limiting
- Email verification
- Password reset
- Better logging
- Async handler wrapper
- Environment configuration validation
- Service layer abstraction
- Swagger/OpenAPI documentation

---

## Final Notes

This module was built as part of a backend engineering rebuild process focused on:
- Practical learning
- Real-world backend architecture
- Industry-relevant technologies
- Clean code practices
- Hands-on repetition and understanding

The focus was not only making the module work, but also understanding why the architecture and patterns were designed this way.