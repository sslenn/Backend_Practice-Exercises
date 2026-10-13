# Article Management Backend API

Simple Express.js REST API server for managing articles.

## Setup

```bash
npm install
```

## Running the Server

**Development mode** (with auto-reload):

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server runs on **http://localhost:5000**

## API Endpoints

### Get All Articles

```
GET /articles
```

Returns array of all articles

### Get Single Article

```
GET /articles/:id
```

Returns article with specified ID

### Create Article

```
POST /articles
Content-Type: application/json

{
  "title": "Article Title",
  "author": "Author Name",
  "content": "Article content here",
  "journalist": "Journalist Name",
  "category": "Category"
}
```

### Update Article

```
PUT /articles/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

### Delete Article

```
DELETE /articles/:id
```

### Health Check

```
GET /health
```

## Sample Article Data

The server comes with 4 sample articles pre-loaded:

- Getting Started with React
- Understanding Axios
- State Management in React
- REST API Best Practices

## Testing with Frontend

Run the backend server in one terminal:

```bash
npm start
```

Run the frontend in another terminal:

```bash
cd ../EX01-08/warmup1
npm run dev
```

The frontend will communicate with this backend on port 5000.
