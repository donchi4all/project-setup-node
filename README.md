```md
# API Generator 🚀  
An advanced API generator that helps in **generating CRUD endpoints** directly from the terminal.  
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
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/users` | Create a new user |
| **GET** | `/users` | Get all users (supports pagination, search, and date range) |
| **GET** | `/users/{id}` | Get a single user |
| **PUT** | `/users` | Update multiple users |
| **PATCH** | `/users/{id}` | Update a single user |
| **DELETE** | `/users/{id}` | Delete a single user |
| **DELETE** | `/users` | Delete multiple users |

---


> 🚀 **Routes are loaded automatically. No manual setup required!**

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
  - seeders
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

### **✅ Summary of Updates**
✔ **Kept `plop` instead of `donsoft`**.  
✔ **Updated `templates` folder reference** instead of `gulp`.  
✔ **Switched `gulp` usage with `npx plop service`** for generating APIs.  
✔ **Clarified that Plop uses `.hbs` templates instead of `.ejs`**.  
✔ **Improved versioning explanation and project structure details**.  

---

### **📌 Next Steps**
1️⃣ **Replace your current `README.md` with this updated version**.  
2️⃣ **Run `npx plop service` to generate a new API and confirm everything works.**  
3️⃣ **Commit and push the changes!** 🚀🔥  

Let me know if you need any further refinements! 😊🔥