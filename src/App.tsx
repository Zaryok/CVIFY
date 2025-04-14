import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { FileText, Download, CheckCircle, Pencil, X, MinusCircle } from 'lucide-react';
import { ThemeProvider } from 'next-themes';
import { BuilderPage } from './pages/BuilderPage';
import { TestingPage } from './pages/TestingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ResumesPage } from './pages/ResumesPage';
import { CreateResumePage } from './pages/CreateResumePage';
import { EditResumePage } from './pages/EditResumePage';
import { Toast } from './components/Toast';
import { verifyLocalStorage } from './utils/storageUtils';

function App() {
  useEffect(() => {
    // Verify localStorage works on app startup
    const isStorageWorking = verifyLocalStorage();
    if (!isStorageWorking) {
      console.error('localStorage is not available. Resume data will not be saved!');
      alert('Your browser storage is not working properly. Resume data will not be saved between sessions. Try using a different browser or enabling cookies.');
    }
  }, []);

  return (
    <ThemeProvider attribute="class">
      <Router basename={import.meta.env.BASE_URL || '/'}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
          <Header />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* Redirect templates page to dashboard */}
              <Route path="/templates" element={<Navigate to="/dashboard" replace />} />
              <Route path="/build/:templateId" element={<BuilderPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/resumes" element={<ResumesPage />} />
              <Route path="/create-resume" element={<CreateResumePage />} />
              <Route path="/edit-resume/:id" element={<EditResumePage />} />
              <Route path="/testing" element={<TestingPage />} />
              {/* Add a catch-all route to handle 404 errors */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
      <Toast />
    </ThemeProvider>
  );
}

function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="py-12 sm:py-16 lg:py-20 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Create Your Professional CV in Minutes
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Build an ATS-friendly CV that stands out with our professional templates.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/dashboard"
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 transition-colors"
          >
            Create Resume
          </Link>
          <Link
            to="/resumes"
            className="px-8 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-2 border-indigo-600 dark:border-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
          >
            My Resumes
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Why Choose CVify?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileText className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />}
            title="Professional Templates"
            description="Choose from a variety of ATS-optimized templates suitable for any industry"
          />
          <FeatureCard
            icon={<CheckCircle className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />}
            title="ATS-Friendly"
            description="Ensure your CV passes Applicant Tracking Systems with our optimized formats"
          />
          <FeatureCard
            icon={<Download className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />}
            title="Easy Export"
            description="Download your CV in multiple formats including PDF and Word"
          />
        </div>
      </div>

      {/* How It Works + Benefits Section */}
      <div className="py-16 border-t border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Create Your Perfect Resume in 3 Simple Steps
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
          Our streamlined process makes building an impressive, ATS-optimized resume quick and effortless
        </p>
        
        {/* Steps Process */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-bold text-xl">1</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-2">Create New Resume</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Start from your dashboard and create a professional resume with our easy-to-use builder
            </p>
            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-bold text-xl">2</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-2">Fill In Your Details</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Our smart editor guides you through entering your information with helpful tips
            </p>
            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <Pencil className="h-16 w-16 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-bold text-xl">3</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-2">Download & Apply</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Export your professional resume in PDF format, ready to impress employers
            </p>
            <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center">
              <Download className="h-16 w-16 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Creator Credit Section */}
      <div className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Created with <span className="text-red-500">♥</span> by <span className="font-semibold text-indigo-600 dark:text-indigo-400">Zaryab</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

export default App;