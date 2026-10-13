# RESTful API for Articles - Exercise 9

A complete RESTful API implementation for managing articles, journalists, and categories using Express.js with a modular, maintainable project structure.

## Project Structure

```
EX-09/
├── controllers/
│   ├── articlesController.js
│   ├── journalistsController.js
│   └── categoriesController.js
├── routes/
│   ├── articlesRoutes.js
│   ├── journalistsRoutes.js
│   └── categoriesRoutes.js
├── middleware/
│   └── logger.js
├── models/
│   └── data.js
├── server.js
├── package.json
└── README.md
```

## Getting Started

### Installation

1. Install dependencies:

```bash
npm install
```

2. Install nodemon for development (optional):

```bash
npm install --save-dev nodemon
```

### Running the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
node server.js
```

The server will run on `http://localhost:3000`

## API Endpoints

### 1. Articles Resource

#### GET /articles

Get all articles

- **Status:** 200 OK
- **Response:**

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "title": "Election Results 2025",
      "content": "...",
      "journalistId": 1,
      "categoryId": 1
    }
  ]
}
```

#### GET /articles/:id

Get a single article by ID

- **Parameters:** id (integer)
- **Status:** 200 OK or 404 Not Found
- **Response:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Election Results 2025",
    "content": "...",
    "journalistId": 1,
    "categoryId": 1
  }
}
```

#### POST /articles

Create a new article

- **Required Fields:** title, content, journalistId, categoryId
- **Status:** 201 Created or 400 Bad Request
- **Request Body:**

```json
{
  "title": "New Article Title",
  "content": "Article content here...",
  "journalistId": 1,
  "categoryId": 2
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Article created successfully",
  "data": {
    "id": 6,
    "title": "New Article Title",
    "content": "Article content here...",
    "journalistId": 1,
    "categoryId": 2
  }
}
```

#### PUT /articles/:id

Update an existing article

- **Parameters:** id (integer)
- **Optional Fields:** title, content, journalistId, categoryId
- **Status:** 200 OK or 404 Not Found
- **Request Body:**

```json
{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

- **Response:**

```json
{
  "success": true,
  "message": "Article updated successfully",
  "data": {
    /* updated article */
  }
}
```

#### DELETE /articles/:id

Delete an article

- **Parameters:** id (integer)
- **Status:** 200 OK or 404 Not Found
- **Response:**

```json
{
  "success": true,
  "message": "Article deleted successfully",
  "data": {
    /* deleted article */
  }
}
```

---

### 2. Journalists Resource

#### GET /journalists

Get all journalists

- **Status:** 200 OK
- **Response:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice.johnson@newsco.com"
    }
  ]
}
```

#### GET /journalists/:id

Get a single journalist by ID

- **Parameters:** id (integer)
- **Status:** 200 OK or 404 Not Found

#### POST /journalists

Create a new journalist

- **Required Fields:** name, email (must be unique)
- **Status:** 201 Created or 400 Bad Request
- **Request Body:**

```json
{
  "name": "John Doe",
  "email": "john.doe@newsco.com"
}
```

#### PUT /journalists/:id

Update journalist info

- **Parameters:** id (integer)
- **Optional Fields:** name, email
- **Status:** 200 OK or 404 Not Found

#### DELETE /journalists/:id

Delete a journalist

- **Parameters:** id (integer)
- **Status:** 200 OK or 404 Not Found

#### GET /journalists/:id/articles

Get all articles by a specific journalist

- **Parameters:** id (integer)
- **Status:** 200 OK or 404 Not Found
- **Response:**

```json
{
  "success": true,
  "count": 2,
  "journalist": {
    "id": 1,
    "name": "Alice Johnson",
    "email": "alice.johnson@newsco.com"
  },
  "data": [
    {
      /* articles */
    }
  ]
}
```

---

### 3. Categories Resource

#### GET /categories

Get all categories

- **Status:** 200 OK
- **Response:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "name": "Politics"
    }
  ]
}
```

#### GET /categories/:id

Get a single category by ID

- **Parameters:** id (integer)
- **Status:** 200 OK or 404 Not Found

#### POST /categories

Create a new category

- **Required Fields:** name (must be unique)
- **Status:** 201 Created or 400 Bad Request
- **Request Body:**

```json
{
  "name": "Entertainment"
}
```

#### PUT /categories/:id

Update a category

- **Parameters:** id (integer)
- **Optional Fields:** name
- **Status:** 200 OK or 404 Not Found

#### DELETE /categories/:id

Delete a category

- **Parameters:** id (integer)
- **Status:** 200 OK or 404 Not Found

#### GET /categories/:id/articles

Get all articles from a specific category

- **Parameters:** id (integer)
- **Status:** 200 OK or 404 Not Found
- **Response:**

```json
{
  "success": true,
  "count": 2,
  "category": {
    "id": 1,
    "name": "Politics"
  },
  "data": [
    {
      /* articles */
    }
  ]
}
```

---

## Testing the API

You can test the API using **Postman**, **Insomnia**, or **cURL**.

### Example cURL Requests

**Get all articles:**

```bash
curl http://localhost:3000/articles
```

**Get single article:**

```bash
curl http://localhost:3000/articles/1
```

**Create article:**

```bash
curl -X POST http://localhost:3000/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Article",
    "content": "Content here",
    "journalistId": 1,
    "categoryId": 2
  }'
```

**Update article:**

```bash
curl -X PUT http://localhost:3000/articles/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title"
  }'
```

**Delete article:**

```bash
curl -X DELETE http://localhost:3000/articles/1
```

**Get articles by journalist:**

```bash
curl http://localhost:3000/journalists/1/articles
```

**Get articles by category:**

```bash
curl http://localhost:3000/categories/1/articles
```

---

## API Design Principles Implemented

✅ **Resource-based routing** - Each resource (articles, journalists, categories) has its own routes
✅ **HTTP Methods** - Proper use of GET, POST, PUT, DELETE
✅ **Status Codes** - 200 OK, 201 Created, 400 Bad Request, 404 Not Found
✅ **Modular Structure** - Separation of concerns (controllers, routes, models, middleware)
✅ **Request Validation** - Validates required fields and relationships
✅ **Error Handling** - Consistent error responses with meaningful messages
✅ **JSON Responses** - Consistent JSON response format with success flag and data

---

## Sample Data

### Initial Articles

- 5 articles with relationships to journalists and categories

### Initial Journalists

- Alice Johnson (Politics)
- Bob Martinez (Technology)
- Clara Lee (Sports)

### Initial Categories

- Politics
- Technology
- Sports

---

## Technologies Used

- **Express.js** - Node.js web framework
- **Nodemon** - Auto-reload during development
- **JavaScript (ES6+)** - Modern JavaScript modules

---

## Future Enhancements

- Add database integration (MongoDB, PostgreSQL)
- Add authentication & authorization
- Add input validation library (Joi, Zod)
- Add pagination and filtering
- Add sorting capabilities
- Add rate limiting
- Add comprehensive logging with Winston or Morgan

---

## Reflective Questions

1. **How do sub-resource routes (e.g., /journalists/:id/articles) improve the organization and clarity of your API?**

   Sub-resource routes provide a hierarchical structure that reflects real-world relationships between entities. They make the API more intuitive and self-documenting by clearly showing that articles belong to journalists. This reduces ambiguity, improves discoverability, and makes it easier for frontend developers to understand the API structure without extensive documentation.

2. **What are the pros and cons of using in-memory dummy data instead of a real database during development?**

   **Pros:**
   - Faster development and testing without database setup
   - No external dependencies, easier to learn core API concepts
   - Easy to reset data for testing
   
   **Cons:**
   - Data is lost on server restart
   - Doesn't reflect real database constraints or performance issues
   - Difficult to scale and test with large datasets
   - Doesn't simulate concurrent access or data persistence challenges

3. **How would you modify the current structure if you needed to add user authentication for journalists to manage only their own articles?**

   I would add:
   - An `authController.js` to handle login/logout and JWT token generation
   - An `authRoutes.js` for authentication endpoints
   - An `auth.js` middleware to verify and validate JWT tokens
   - Modify `articlesController.js` to check if the authenticated journalist matches the `journalistId` of the article
   - Add role-based access control (RBAC) to differentiate between journalist and admin permissions
   - Update routes to require auth middleware for sensitive operations

4. **What challenges did you face when linking related resources (e.g., matching journalistId in articles), and how did you resolve them?**

   Challenges included:
   - Ensuring referential integrity when creating articles with non-existent journalist IDs
   - Handling orphaned articles if a journalist is deleted
   - Validating that provided IDs exist before creating/updating relationships
   
   Solutions:
   - Added validation in controllers to check if referenced journalist and category IDs exist
   - Used consistent ID matching logic across all operations
   - Implemented consistent error responses when relationships are invalid

5. **If your API were connected to a front-end application, how would RESTful design help the frontend developer understand how to interact with your API?**

   RESTful design helps frontend developers by:
   - Using standard HTTP methods (GET, POST, PUT, DELETE) with predictable behavior
   - Following resource-based URLs that are intuitive and self-explanatory
   - Providing consistent status codes that clearly indicate success or failure
   - Returning structured JSON responses with meaningful data
   - Enabling developers to predict endpoints without deep API documentation
   - Making it easy to implement features like pagination, filtering, and sorting using standard query parameters
   - Reducing the learning curve for API integration and enabling faster development cycles
