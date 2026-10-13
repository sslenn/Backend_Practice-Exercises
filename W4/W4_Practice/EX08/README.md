# User Management API - Refactored

A modular Express.js REST API with separated concerns following MVC architecture.

## Project Structure

```
EX08/
├── controllers/
│   └── userController.js
├── models/
│   └── userModel.js
├── routes/
│   └── userRoutes.js
├── middleware/
│   ├── logger.js
│   └── validateUser.js
├── logs/
├── server.js
├── package.json
└── README.md
```

## Architecture

### Folders & Files

#### Controllers

- **userController.js** - Business logic handlers for HTTP requests
  - CRUD operations: `getAllUsers`, `getUserById`, `createUser`, `updateUser`, `deleteUser`

#### Models

- **userModel.js** - Data management and business logic
  - In-memory user store with functions to manage user data

#### Routes

- **userRoutes.js** - Express router with all user-related routes

#### Middleware

- **logger.js** - Logs HTTP requests with timestamp, method, and URL
- **validateUser.js** - Validates name and email in request body

#### Logs

- Directory for log files (for future use)

## API Endpoints

### GET /users

Retrieve all users

- **Middleware:** logger
- **Status:** 200 OK
- **Response:** Array of user objects

### GET /users/:id

Retrieve a specific user by ID

- **Middleware:** logger
- **Status:** 200 OK or 404 Not Found
- **Response:** User object with id, name, email

### POST /users

Create a new user

- **Middleware:** logger, validateUser
- **Status:** 201 Created or 400 Bad Request
- **Request Body:**

```json
{
  "name": "string (required)",
  "email": "string (required)"
}
```

- **Response:** Created user object with auto-generated id

### PUT /users/:id

Update an existing user

- **Middleware:** logger, validateUser
- **Status:** 200 OK, 400 Bad Request, or 404 Not Found
- **Request Body:**

```json
{
  "name": "string (required)",
  "email": "string (required)"
}
```

- **Response:** Updated user object

### DELETE /users/:id

Delete a user

- **Middleware:** logger
- **Status:** 204 No Content or 404 Not Found

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup Steps

1. Navigate to the EX08 directory
2. Run: `npm install`
3. Run: `npm start` (or `node server.js` for one-time run)
4. Server will start on `http://localhost:3000`

## Scripts

- `npm start` - Run server with node
- `npm run dev` - Run server with nodemon (auto-reload)
- `npm test` - Run test suite (to be implemented)

## Testing Examples

### cURL Commands

**Get all users:**

```bash
curl http://localhost:3000/users
```

**Get specific user:**

```bash
curl http://localhost:3000/users/1
```

**Create user:**

```bash
curl -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

**Update user:**

```bash
curl -X PUT http://localhost:3000/users/1 \
  -H 'Content-Type: application/json' \
  -d '{"name":"Jane Doe","email":"jane@example.com"}'
```

**Delete user:**

```bash
curl -X DELETE http://localhost:3000/users/1
```

**Test validation:**

```bash
curl -X POST http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test"}'
```

## Sample Data

**Total Users:** 20

### Initial Users

- Alice Johnson (alice.johnson@example.com)
- Bob Smith (bob.smith@example.com)
- Charlie Lee (charlie.lee@example.com)

See `models/userModel.js` for complete user list.

## Architecture Benefits

- **Separation of Concerns** - Each module has a single responsibility
- **Maintainability** - Easy to locate and fix bugs
- **Testability** - Each layer can be tested independently
- **Scalability** - Simple to add new features without affecting existing code
- **Reusability** - Models and controllers can be reused across different routes
- **Team Collaboration** - Multiple developers can work on different modules simultaneously

## Data Flow

1. HTTP Request arrives
2. Logger middleware logs the request
3. For POST/PUT: validateUser middleware validates body
4. Route matches and forwards to controller
5. Controller processes request and calls model
6. Model performs business logic (CRUD operations)
7. Controller sends response back to client

## Error Codes

- **200** - OK - Request successful
- **201** - Created - Resource successfully created
- **204** - No Content - Request successful, no content to return
- **400** - Bad Request - Missing required fields
- **404** - Not Found - Resource does not exist
- **500** - Internal Server Error - Server-side error

## Future Enhancements

- **Database Integration** - Replace in-memory store with MongoDB or PostgreSQL (modify only models/userModel.js)
- **Authentication** - Add JWT-based authentication with auth middleware and routes
- **Advanced Logging** - Log to file or external service (Winston, Morgan)
- **Error Handling** - Add centralized error handler middleware
- **Input Validation** - Add email format validation
- **Rate Limiting** - Prevent API abuse

## Technologies Used

- **Express.js** ^4.18.0 - Web framework for Node.js
- **Nodemon** ^2.0.0 - Development tool for auto-restarting server on file changes

## Current State

- In-memory data storage (data lost on server restart)
- Request body validation at middleware level before controller execution
- Next step: Integrate with database for persistence

---

## Reflective Questions

1. **Why is separating concerns (routes, controllers, models, middleware) important in backend development?**

   Separation of concerns is crucial because it:
   - Makes code more modular and maintainable - each file has a single responsibility
   - Enables easier testing - each layer can be tested independently without dependencies
   - Improves scalability - new features can be added without modifying existing code
   - Facilitates team collaboration - different developers can work on different modules simultaneously
   - Makes debugging easier - issues can be isolated to specific components
   - Allows for code reusability - models and controllers can be reused across different routes

2. **What challenges did you face when refactoring the monolithic server.js into multiple files?**

   Common challenges include:
   - Understanding where business logic should live (controller vs. model vs. middleware)
   - Managing imports and exports between modules correctly
   - Deciding on the right level of abstraction for each layer
   - Ensuring the request flow works correctly across multiple files
   - Testing individual modules in isolation
   - Maintaining consistent naming conventions and structure across files

3. **How does moving business logic into controllers improve the readability and testability of your code?**

   Controllers improve code quality by:
   - Clearly separating HTTP request handling from business logic
   - Making routes simpler and more readable - they focus on routing only
   - Allowing business logic to be tested without needing to test HTTP aspects
   - Making it easier to reuse the same business logic for different routes
   - Creating a clear entry point for debugging request-related issues
   - Enabling easy modification of business logic without affecting routing

4. **If this project were to grow to support authentication, database integration, and logging, how would this folder structure help manage that growth?**

   This structure handles growth through:
   - **Authentication** - Add `authController.js` and `auth.js` middleware without modifying existing files
   - **Database Integration** - Replace `userModel.js` implementation without changing controllers or routes
   - **Advanced Logging** - Enhance `logger.js` or add new middleware without affecting other modules
   - **New Features** - Create new controller/route pairs that follow the same pattern
   - **Middleware Reusability** - New middleware can be added and reused across multiple routes
   - **Parallel Development** - Different team members can work on different modules simultaneously
   - **Maintenance** - Changes to one layer don't require modifications to others (e.g., switching databases only requires updating models)
