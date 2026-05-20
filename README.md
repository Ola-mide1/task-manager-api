# Task Manager API

A simple RESTful API for managing tasks, built with **Express.js** and **SQLite**.

## Features

- Full CRUD operations (Create, Read, Update, Delete)
- Filter tasks by status and priority
- Sorting and pagination support
- Input validation and error handling
- MVC architecture

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite (via better-sqlite3)
- **Other:** CORS, Morgan (logging)

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Ola-mide1/task-manager-api.git
cd task-manager-api

# Install dependencies
npm install

# Start the server
npm start
```

The server runs at `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks (with filters) |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Query Parameters

- `status` — Filter by status: `pending`, `in_progress`, `completed`
- `priority` — Filter by priority: `low`, `medium`, `high`
- `sort` — Sort by field: `created_at`, `title`, `priority`
- `order` — Sort order: `ASC` or `DESC`
- `page` — Page number (default: 1)
- `limit` — Items per page (default: 10)

### Example Request

```bash
# Create a task
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Express.js", "priority": "high"}'

# Get all high-priority tasks
curl http://localhost:3000/api/tasks?priority=high
```

## Project Structure

```
src/
├── index.js              # Entry point
├── routes/taskRoutes.js   # Route definitions
├── controllers/taskController.js  # Request handlers
└── models/
    ├── database.js        # DB connection & init
    └── taskModel.js       # Data access layer
```

## License

MIT
