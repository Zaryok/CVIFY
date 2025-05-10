# CVify - Professional Resume Builder

![CVify Logo](/public/images/cvify-logo.svg)

## 🚀 Overview

CVify is a modern web application that allows users to create, edit, and manage professional resumes with ease. Built with React and TypeScript, this client-side application provides a seamless experience for creating ATS-friendly resumes with real-time preview and PDF export capabilities.

## ✨ Features

- **Resume Dashboard**: Create, edit, duplicate, and manage all your resumes in one place
- **Step-by-Step Form Wizard**: Intuitive process to create professional resumes
- **Real-Time PDF Preview**: See your changes instantly as you type
- **Professional PDF Export**: Generate high-quality, ATS-friendly PDF resumes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Choose your preferred theme
- **Local Storage**: All data is saved locally in your browser

## 🛠️ Technologies Used

- **Frontend**:
  - React 18
  - TypeScript
  - React Router v6
  - Tailwind CSS
  - Lucide React (Icons)

- **PDF Generation**:
  - @react-pdf/renderer
  - jspdf
  - html2canvas

- **State Management**:
  - React useState hooks
  - Local Storage for persistence

- **Build Tools**:
  - Vite
  - ESLint
  - PostCSS

## 📸 Screenshots

### Home Page
![Home Page](/docs/screenshots/home.png)

### Dashboard
![Dashboard](/docs/screenshots/dashboard.png)

### Resume Editor
![Resume Editor](/docs/screenshots/editor.png)

### PDF Preview
![PDF Preview](/docs/screenshots/preview.png)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cvify.git
cd cvify
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for production
```bash
npm run build
# or
yarn build
```

## 🧩 Project Structure
