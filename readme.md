# SIMPLE LARAVEL REACT CRUD APP FOR TEST

A simple crud application using laravel and reactjs to manage user list.

React, Laravel, Bootstrap, Router, Pagination, Ajax, RESTful API

## Instructions

Clone the repo with the git clone cmd.

```bash
git clone https://github.com/<user-name>/<repo>.git
```

Change the directory.

```bash
cd into the project directory.
```

For the **back-end**, install the dependencies once via the terminal.

```bash
npm install
```

Runs the react in the development mode.

```bash
npm run watch
```

Create database with the name "testdb".

Create .env file from .env.example and set the database details.

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=testdb
DB_USERNAME=root
DB_PASSWORD=
```

Install dependencies for laravel project

```bash
composer install
```

Configure database and migrate table.

```bash
php artisan migrate
```

Generate dummy data for users with laravel seeder

```bash
php artisan db:seed
```

Runs the development server for the apps.

```bash
php artisan serve
```

Hit the url in the browser

```bash
APP_URL= http://localhost:8000
```

To make a production build, simply run on _react-src_ folder via the terminal.

```bash
npm run build
```
