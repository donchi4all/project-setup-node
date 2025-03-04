
# **📌 `READ ME `  Version: 3.0.0**
```md
# API Generator 🚀  
An advanced API generator that helps in **generating CRUD endpoints** and **database seeders** directly from the terminal.  
**Version: 3.0.0**

---

## **📌 Installation & Setup**
### **1️⃣ Clone the Template**
```sh
git clone <repository-url> <projectName>
cd <projectName>
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Configure Environment Variables**
Create a **`.env`** file and add your **database credentials**.

---

## **📌 Generate Your First API Endpoint**
### **Using Plop (Scaffolding Tool)**
```sh
npx plop service
```
or  
```sh
npm run plop service
```

### **What Does This Command Do?**
This will generate a full **CRUD API** for your service, including:
- **Model**
- **Model Interface**
- **Migrations**
- **Controller**
- **Service**
- **Repository**
- **DTOs**
- **Unit Tests (optional)**

### **Example: Generate a `user` Service**
```sh
npx plop service
```
_Enter `user` when prompted_

### **Generated Routes for `user`**
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
### **Using Plop (Seeder Generator)**
```sh
npx plop seed
```

### **What Does This Command Do?**
This will generate a **Seeder file** for your database, allowing you to insert default data automatically.

### **Example: Generate a Seeder for `users` Table**
```sh
npx plop seed
```
_Enter `user` when prompted_

### **Generated Seeder File (`src/seeders/2025-03-02-seed-users.js`)**
```javascript
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */

    await queryInterface.bulkInsert('users', [{
      id: '99b23552-314f-457b-8291-2a32feb46ed9',
      email: 'user@example.com',
      password: '28f6a5f5ac65a9adaf5693efbfa7c05e5bff31bafbc4f66063989af6d9f142c0',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }], 
    {
      updateOnDuplicate: ['updatedAt'],
    });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert user seed here.
     */
    await queryInterface.bulkDelete('users', null, {});
  }
};
```

---

## **📌 Updated Project Structure**
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
  - seeders   # Now includes database seeders
  - types
  - utils
- templates  # This is where Plop.js templates (.hbs) are stored
- tests
```

---

## **📌 Running the Project**
### **Development Mode**
```sh
npm run dev
```

### **Production Mode**
```sh
npm run build
npm start
```

---

## **📌 New Features in Version 3.0.0**
✅ **Replaced Gulp with Plop.js for better scaffolding**.  
✅ **Templates now use `.hbs` instead of `.ejs`**.  
✅ **Supports automatic pluralization for API endpoints** (e.g., `user` → `users`).  
✅ **Auto-generates unit tests with an option to skip them**.  
✅ **Automatic code formatting with ESLint & Prettier after file generation**.  
✅ **Custom migration naming for better tracking**.  
✅ **More optimized Sequelize queries for better performance**.  
✅ **Added database seeder generator (`npx plop seed`)**.

---

## **📌 Contribution Guidelines**
- Write and maintain **unit tests**  
- Follow **code review** best practices  
- Open an **issue** or submit a **pull request**  

---

## **📌 Future Improvements (TODO)**
✅ **Add background workers**  
✅ **Improve test coverage**  
✅ **Deploy using CircleCI & Docker**  

---

## **📌 Who to Contact?**
- **Repo Owner / Admin**
- **Community / Team Contact**

🚀 Happy Coding!
```

---

## **✅ Summary of Updates**
✔ **Added Seeder Documentation** (`npx plop seed`).  
✔ **Included Example Seeder Output** (`src/seeders/2025-03-02-seed-users.js`).  
✔ **Updated Project Structure to Include `seeders/` Directory**.  
✔ **Clarified What the Seeder Generator Does**.  
✔ **Ensured Everything Works with the New `plopfile.js`**.  

---

## **📌 Next Steps**
1️⃣ **Replace your current `README.md` with this updated version.**  
2️⃣ **Run `npx plop seed` to generate a new seeder and verify the output.**  
3️⃣ **Commit and push the changes!** 🚀🔥  

Let me know if you need any further refinements! 😊🔥