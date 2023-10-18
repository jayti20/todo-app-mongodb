# Express Todo App

A simple Todo application built using Express, MongoDB, and Handlebars as the templating engine.

## Features
- Add a new task
- Search tasks
- Delete tasks
- Edit and update tasks

## Getting Started

### Prerequisites

- Node.js and npm installed.
- MongoDB Atlas account or a local MongoDB setup.

### Installation

1. Clone the repository:
```bash
git clone <repository_url>
```

2. Navigate to the project directory:
```bash
cd <project_name>
```

3. Install the required dependencies:
```bash
npm install
```

### Configuration

Ensure you have set up your MongoDB URL in the main application file. If using a different setup, replace the `url` with your MongoDB connection string.

### Running the Application

1. Start the server:
```bash
node <your_app_file_name>.js
```

2. The server will start on port `8000`. Open a browser and navigate to:
```
http://localhost:8000/
```

## Application Routes

- **Home (`/`)** - Displays all tasks.
- **Add Task (`/add` POST route)** - Adds a new task to the database.
- **Search Task (`/search` POST route)** - Searches for tasks in the database based on the search query.
- **Delete Task (`/delete/:id` POST route)** - Deletes a specific task based on its ID.
- **Edit Task (`/edit/:id` GET route)** - Fetches the task details based on its ID for editing.
- **Update Task (`/update/:id` POST route)** - Updates the task in the database based on its ID.

## Future Improvements

- Implement user authentication and authorization.
- Add pagination for tasks.
- Include task priorities and categorization.
