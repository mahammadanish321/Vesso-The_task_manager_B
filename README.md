<div align="center">

# 📝 Vesso - The Task Manager (Backend)

[![Deployment Status](https://img.shields.io/badge/Deployment-Live-brightgreen?style=for-the-badge&logo=vercel)](https://vesso-the-task-manager-f.vercel.app)
[![Tech Stack](https://img.shields.io/badge/Tech-Node.js%20%7C%20Express%20%7C%20JS-blue?style=for-the-badge)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-orange?style=for-the-badge)](LICENSE)

**A modern, intuitive, and efficient task management application designed to organize your daily life.**

<br />

### [🚀 Launch Live Demo Application](https://vesso-the-task-manager-f.vercel.app)

</div>

---

## 🌟 Overview

**Vesso** reimagines productivity with a clean, user-centric interface. Whether you are managing personal to-dos or planning a project, Vesso offers a seamless experience to keep you on track. Built with performance and simplicity in mind, it works flawlessly across all your devices.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **🔐 Secure Auth** | Robust user registration and login system to keep your data safe. |
| **📝 Smart CRUD** | Create, Read, Update, and Delete tasks with instant UI updates. |
| **♻️ Recycle Bin** | Never lose a task by accident. Recover deleted tasks from the bin. |
| **📱 Responsive** | Optimized for Desktop, Tablet, and Mobile experiences. |
| **⚡ Fast & Fluid** | Built with vanilla JavaScript for maximum performance and zero bloat. |

---

## 🛠️ Technology Stack

- **Frontend**: 
  - ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) 
  - ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) 
  - ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
- **Backend**: 
  - ![Nodejs](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white) 
  - ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
- **Deployment**: 
  - ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## 📊 System Architecture

### 🔐 Authentication Flow
```mermaid
graph TD
    A[Start] --> B{User has Account?}
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#bbf,stroke:#333,stroke-width:2px
    B -- No --> C[Register Page]
    C --> D[Enter Details]
    D --> E[Submit Registration]
    E --> F[Login Page]
    B -- Yes --> F
    F --> G[Enter Credentials]
    G --> H{Valid Credentials?}
    H -- No --> I[Show Error]
    I --> F
    H -- Yes --> J[Store Token]
    J --> K[Redirect to Dashboard]
    style K fill:#9f9,stroke:#333,stroke-width:2px
```

### 📋 Task Lifecycle
```mermaid
sequenceDiagram
    participant User
    participant UI as Vesso UI
    participant API as Backend API
    
    User->>UI: Click "Add Task"
    UI->>User: Show Task Modal
    User->>UI: Enter Title & Desc + Save
    UI->>API: POST /api/v1/task/creat-task
    API-->>UI: Success Response
    UI->>UI: Refresh Task List
    UI-->>User: Show New Task
    
    User->>UI: Click "Delete"
    UI->>API: DELETE /api/v1/task/...
    API-->>UI: Success (Moved to Bin)
    UI->>UI: Remove from Active List
```

---

## 📦 Local Installation

Follow these steps to get the project running on your local machine.

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/mahammadanish321/Vesso-The_task_manager_F.git
    cd Task_Manager_Frontend
    ```

2.  **Launch the Application**
    Open `index.html` in your browser or use a simplified development server:
    - **VS Code**: Right-click `index.html` and select "Open with Live Server".
    - **Python**: `python -m http.server`

3.  **Local Configuration** (Optional)
    The app automatically detects `localhost`. If your backend is running on a different port than `8000`, update `js/config.js`.

---

## 🤝 Contributing

We welcome contributions!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

<div align="center">

**&copy; 2025 Vesso Task Manager**. Made with ❤️ by [Mahammad Anish](https://github.com/mahammadanish321).

</div>

