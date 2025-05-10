# 💼 CVify - Professional Resume Builder

![CVify Logo](/public/images/cvify-logo.svg)

<p align="center">
  <strong>Build stunning, ATS-friendly resumes in minutes.</strong><br>
  <em>A sleek, modern web app built with React + TypeScript</em>
</p>

<p align="center">
  <a href="#-features">Features</a> • 
  <a href="#-technologies-used">Tech Stack</a> • 
  <a href="#-screenshots">Screenshots</a> • 
  <a href="#-quick-start">Quick Start</a> • 
  <a href="#-project-structure">Project Structure</a> • 
  <a href="#-license">License</a>
</p>

---

## 🚀 Overview

**CVify** is a user-friendly web application designed to help users craft professional, ATS-compatible resumes effortlessly. With a modern interface, real-time preview, and instant PDF export, CVify streamlines the resume creation process.

<div align="center">
  <img src="/docs/screenshots/editor.png" width="80%" alt="Resume Editor Preview" />
</div>

---

## ✨ Features

- 🗂️ **Resume Dashboard** – Manage multiple resumes (create, edit, duplicate, delete)
- 🧙 **Form Wizard** – Guided multi-step builder for structured data input
- 🖼️ **Real-Time Preview** – Live PDF preview while editing
- 📄 **PDF Export** – Professionally formatted, ATS-friendly export
- 🌗 **Dark / Light Mode** – Customizable theme toggle
- 📱 **Responsive Design** – Fully optimized for all screen sizes
- 💾 **Local Persistence** – Saves resume data securely in the browser

---

## 🛠️ Technologies Used

| Area             | Tech Stack |
|------------------|------------|
| **Frontend**     | React 18, TypeScript, React Router v6, Tailwind CSS |
| **Icons & UI**   | Lucide React |
| **PDF Generation** | @react-pdf/renderer, jspdf, html2canvas |
| **State Management** | React `useState`, Local Storage |
| **Build Tools**  | Vite, ESLint, PostCSS |

---

## 📸 Screenshots

| Home Page | Dashboard |
|-----------|-----------|
| ![Home](/docs/screenshots/home.png) | ![Dashboard](/docs/screenshots/dashboard.png) |

| Resume Editor | PDF Preview |
|---------------|-------------|
| ![Editor](/docs/screenshots/editor.png) | ![Preview](/docs/screenshots/preview.png) |

---

## 🚀 Quick Start

### ⚙️ Prerequisites
- Node.js `v14.0.0+`
- npm or yarn

### 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/cvify.git
cd cvify

# Install dependencies
npm install # or yarn install

# Start development server
npm run dev # or yarn dev
