# MediLink: Doctor-Patient Connect

MediLink is a modern web application designed to bridge the gap between patients and healthcare professionals. It provides a platform for users to find doctors based on their specialization, view detailed profiles, and engage in real-time chat conversations.

## ✨ Features

- **Doctor Listing:** Browse a comprehensive list of doctors.
- **Search & Filter:** Easily find doctors by name or filter by specialization.
- **Detailed Doctor Profiles:** View in-depth profiles including biography, years of experience, languages spoken, and online status.
- **Real-time Chat:** Engage in one-on-one chat sessions with available doctors.
- **AI-Powered Responses:** The chat interface uses Generative AI to simulate doctor responses for a seamless conversational experience.
- **Responsive Design:** A clean, modern, and fully responsive user interface built with ShadCN UI and Tailwind CSS.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (with App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Component Library:** [ShadCN UI](https://ui.shadcn.com/)
- **Generative AI:** [Genkit](https://firebase.google.com/docs/genkit)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

To get the project up and running on your local machine, follow these steps:

1.  **Install Dependencies:**
    Open your terminal and run the following command to install the necessary packages.

    ```bash
    npm install
    ```

2.  **Run the Development Server:**
    Once the dependencies are installed, start the Next.js development server.

    ```bash
    npm run dev
    ```

    The application will be available at [http://localhost:9002](http://localhost:9002).

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

```
src
├── ai/                # Genkit flows for AI functionality
├── app/               # Next.js pages and layouts
├── components/        # Reusable React components (UI and feature-specific)
├── hooks/             # Custom React hooks
├── lib/               # Utility functions, data fetching, and type definitions
└── ...
```


