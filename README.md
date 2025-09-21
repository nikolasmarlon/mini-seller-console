# Mini Seller Console

This project is my solution to the frontend challenge from **CoverPin Company**. The goal was to build a lightweight console to manage and convert Leads into Opportunities, demonstrating skills in modern UI development, code structure, and user experience.

[**Access the Live Demo →**](https://mini-seller-console-kappa.vercel.app/)

---


---

## ✨ Features Implemented

### Minimum Viable Product (MVP)
- [x] **Leads List:** Data is loaded from a local JSON file.
- [x] **Dynamic Search:** Filter by name or company in real-time.
- [x] **Status Filter:** Allows viewing leads based on their current status.
- [x] **Score Sorting:** Sort the list by `score` in both ascending and descending order.
- [x] **Details Panel:** A slide-over panel opens on lead click, showing all details.
- [x] **Inline Editing:** Inside the panel, it's possible to edit the lead's email and status.
- [x] **Email Validation:** The email field includes format validation to ensure data integrity.
- [x] **Save/Cancel Actions:** With visual feedback and basic error handling.
- [x] **Convert to Opportunity:** A lead can be converted into an opportunity, moving it to a new list.
- [x] **Opportunities Table:** Displays all created opportunities in a simple table.
- [x] **UI States:** The application shows a "Loading" state while preparing the data.

### Nice-to-Haves
- [x] **Responsive Layout (Desktop → Mobile):** The interface was carefully designed to be fully functional and user-friendly on both large screens and mobile devices. Tables transform into "card" lists for better readability on smaller screens.
- [x] **Tab-Based Organization:** To improve user experience, especially on mobile, the Leads and Opportunities views were separated into tabs, preventing an overly long page scroll.

---

## 🛠️ Tech Stack

This project was built with a modern frontend toolset:

- **React:** The core library for building the user interface.
- **Vite:** An extremely fast build tool for the development environment.
- **TypeScript:** To add static typing, ensuring a more robust and error-free codebase.
- **Tailwind CSS:** A utility-first CSS framework for rapid and responsive styling.
- **Vercel:** The platform used for deploying and hosting the live application.

---

## 🚀 How to Run Locally

To clone and run this project on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nikolasmarlon/mini-seller-console.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd mini-seller-console
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal) in your browser to see the application.

---