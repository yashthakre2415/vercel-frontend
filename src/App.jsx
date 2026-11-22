import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

// Layouts
import { MainLayout } from './layouts/MainLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { UploadResumePage } from './pages/UploadResumePage';
import { JobDescriptionPage } from './pages/JobDescriptionPage';
import { ResumePreviewPage } from './pages/ResumePreviewPage';
import { AnalysisResultsPage } from './pages/AnalysisResultsPage';
import { ResumeStudioPage } from './pages/ResumeStudioPage';
import { ResumeComparePage } from './pages/ResumeComparePage';
import { AnalysisHistoryPage } from './pages/AnalysisHistoryPage';
import { SavedJobsPage } from './pages/SavedJobsPage';
import { ResumeLibraryPage } from './pages/ResumeLibraryPage';
import { SettingsPage } from './pages/SettingsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes with MainLayout */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
              </Route>

              {/* Protected Routes with DashboardLayout */}
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/upload" element={<UploadResumePage />} />
                <Route path="/jobs" element={<JobDescriptionPage />} />
                <Route path="/resumes/:id/preview" element={<ResumePreviewPage />} />
                <Route path="/results/:id" element={<AnalysisResultsPage />} />
                <Route path="/studio" element={<ResumeStudioPage />} />
                <Route path="/compare" element={<ResumeComparePage />} />
                <Route path="/history" element={<AnalysisHistoryPage />} />
                <Route path="/saved-jobs" element={<SavedJobsPage />} />
                <Route path="/resumes" element={<ResumeLibraryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Catch-all 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
