/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Main Application Root
   ══════════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import useStore from './store/useStore';
import SplashScreen from './components/layout/SplashScreen';
import TopNav from './components/layout/TopNav';
import Sidebar from './components/layout/Sidebar';
import ToastContainer from './components/common/ToastContainer';

// Prototype Core Pages
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Payroll from './pages/Payroll';
import Recruitment from './pages/Recruitment';
import Leave from './pages/Leave';
import Attendance from './pages/Attendance';
import Expenses from './pages/Expenses';
import Performance from './pages/Performance';
import Documents from './pages/Documents';
import Settings from './pages/Settings';
import SelfService from './pages/SelfService';
import GenericModule from './pages/GenericModule';
import Login from './pages/Login';

function App() {
  const location = useLocation();
  const splashDone = useStore((s) => s.splashDone);
  const setSplashDone = useStore((s) => s.setSplashDone);
  const isAuthenticated = useStore((s) => s.isAuthenticated);

  const isAuthPage = location.pathname === '/login';

  // If on /login page, render full screen Login view without Sidebar or TopNav
  if (isAuthPage) {
    return (
      <div className="min-h-screen w-screen overflow-x-hidden text-text-primary font-sans selection:bg-gold/30 selection:text-charcoal bg-[#F8F6EF]">
        <Login />
        <ToastContainer />
      </div>
    );
  }

  // If not authenticated and trying to access app pages, redirect to /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden text-text-primary flex font-sans selection:bg-gold/30 selection:text-charcoal"
      style={{
        background: 'radial-gradient(ellipse at 88% 12%, rgba(244, 197, 66, 0.18) 0%, transparent 48%), radial-gradient(ellipse at 12% 88%, rgba(248, 222, 131, 0.10) 0%, transparent 48%), #F8F6EF'
      }}
    >
      <AnimatePresence mode="wait">
        {!splashDone && (
          <SplashScreen onComplete={() => setSplashDone(true)} />
        )}
      </AnimatePresence>

      {/* Animated Collapsible Left Sidebar - Fixed to viewport */}
      <Sidebar />

      {/* Main Content Area Column - Independently scrollable */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col min-w-0 relative">
        {/* Top Navigation */}
        <TopNav />

        {/* Main Content Area */}
        <main className="flex-1 w-full px-6 lg:px-8 xl:px-10 relative pb-8 flex flex-col">
          <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/new" element={<Employees initialOpenAdd={true} />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/self-service" element={<SelfService />} />

            {/* Other HR System Modules using specialized views */}
            <Route
              path="/visa"
              element={
                <GenericModule
                  moduleId="visa"
                  title="Visa & Immigration"
                  subtitle="Track UAE residence visas, labor cards, Emirates ID renewals, and quota allocations."
                />
              }
            />
            <Route
              path="/requests"
              element={
                <GenericModule
                  moduleId="requests"
                  title="HR Requests"
                  subtitle="Employee certificate requests, NOCs, salary letters, and transfer workflows."
                />
              }
            />
            <Route
              path="/assets"
              element={
                <GenericModule
                  moduleId="assets"
                  title="Asset Management"
                  subtitle="Company hardware, laptops, mobile devices, security keys, and access card inventory."
                />
              }
            />
            <Route
              path="/insurance"
              element={
                <GenericModule
                  moduleId="insurance"
                  title="Health & Life Insurance"
                  subtitle="Corporate policy coverage, dependents enrollment, claim submissions, and network tiers."
                />
              }
            />
            <Route
              path="/accommodation"
              element={
                <GenericModule
                  moduleId="accommodation"
                  title="Accommodation & Housing"
                  subtitle="Corporate housing assignments, rent allowances, utility bill management, and lease dates."
                />
              }
            />
            <Route
              path="/loans"
              element={
                <GenericModule
                  moduleId="loans"
                  title="Loans & Advances"
                  subtitle="Salary advances, emergency loans, installment deduction schedules, and balance tracking."
                />
              }
            />
            <Route
              path="/reports"
              element={
                <GenericModule
                  moduleId="reports"
                  title="Reports & Analytics"
                  subtitle="Workforce turnover rates, payroll cost summaries, diversity indices, and exportable audits."
                />
              }
            />

            {/* Catch-all redirect to Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      </div>

      {/* Global Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default App;
