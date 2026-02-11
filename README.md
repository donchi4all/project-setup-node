
# **📌 API Generator README – Version 3.0.0**

````md
# API Generator 🚀  

An advanced **CRUD API generator** that scaffolds endpoints, services, models, migrations, and database seeders directly from the terminal.  

**Version:** 3.0.0

---

## **📌 Installation & Setup**

### 1️⃣ Clone the Template
```sh
git clone <repository-url> <projectName>
cd <projectName>
````

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file and add your **database credentials**, e.g.:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASS=your_password
DB_NAME=your_database
```

---

## **📌 Generate Your First API Endpoint**

### Using Plop (Scaffolding Tool)

```sh
npx plop service
```

or

```sh
npm run plop service
```

### What This Command Does

Generates a **full CRUD API** for your service, including:

* Model
* Model Interface
* Migrations
* Controller
* Service
* Repository
* DTOs
* Unit Tests (optional)

---

### Example: Generate a `user` Service

```sh
npx plop service
```

*Enter `user` when prompted*

### Generated Routes for `user`

| Method     | Endpoint      | Description                                                 |
| ---------- | ------------- | ----------------------------------------------------------- |
| **POST**   | `/users`      | Create a new user                                           |
| **GET**    | `/users`      | Get all users (supports pagination, search, and date range) |
| **GET**    | `/users/{id}` | Get a single user                                           |
| **PUT**    | `/users`      | Update multiple users                                       |
| **PATCH**  | `/users/{id}` | Update a single user                                        |
| **DELETE** | `/users/{id}` | Delete a single user                                        |
| **DELETE** | `/users`      | Delete multiple users                                       |

---

## **📌 Generate Database Seeder**

### Using Plop (Seeder Generator)

```sh
npx plop seed
```

### What This Command Does

Generates a **database seeder file** to insert default data into your tables automatically.

---

### Example: Generate a Seeder for `users` Table

```sh
npx plop seed
```

*Enter `user` when prompted*

### Generated Seeder File (`src/seeders/2026-02-11-seed-users.js`)

```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      id: '99b23552-314f-457b-8291-2a32feb46ed9',
      email: 'user@example.com',
      password: '28f6a5f5ac65a9adaf5693efbfa7c05e5bff31bafbc4f66063989af6d9f142c0',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }], 
    {
      updateOnDuplicate: ['status', 'updatedAt'],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
```

---

## **📌 Project Structure (Updated)**

```
- src
  - api
    - controllers
    - models
    - services
    - repositories
  - config
  - interfaces
  - middleware
  - migrations
  - modules
  - seeders       # Added database seeders
  - types
  - utils
- templates       # Plop.js templates (.hbs) stored here
- tests
```

---

## **📌 Running the Project**

### Development Mode

```sh
npm run dev
```

### Production Mode

```sh
npm run build
npm start
```

---

## **📌 New Features in Version 3.0.0**

✅ **Replaced Gulp with Plop.js for better scaffolding**
✅ **Uses Handlebars (`.hbs`) templates instead of `.ejs`**
✅ **Automatic pluralization for API endpoints** (`user` → `users`)
✅ **Auto-generates unit tests with optional skipping**
✅ **Automatic code formatting with ESLint & Prettier after generation**
✅ **Custom migration naming for better tracking**
✅ **Optimized Sequelize queries for improved performance**
✅ **Database seeder generator (`npx plop seed`)**

---

## **📌 Contribution Guidelines**

* Write and maintain **unit tests**
* Follow **code review** best practices
* Open an **issue** or submit a **pull request**

---

## **📌 Future Improvements (TODO)**

✅ Add background workers
✅ Improve test coverage
✅ Deploy using CircleCI & Docker

---

## **📌 Contact**

* **Repo Owner / Admin**
* **Community / Team Contact**

---

🚀 Happy Coding!

```

---

### ✅ Summary of Updates

- Fully **pluralization-aware** documentation for `service` and `seed` generators  
- Updated **Seeder example** with `updateOnDuplicate`  
- Added **project structure section** to include `seeders/`  
- Refined **command instructions**, **examples**, and formatting  
- Matches latest **Plop helpers & generator workflow**  


```
