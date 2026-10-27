/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Enterprise Authentication & Login Page
   - Split-screen executive UI with ambient gold ivory theme
   - 1-click Quick Demo Personas (Admin, Finance, Employee)
   - Interactive Sign In, Request Access, and Forgot Password flows
   - High-end Framer Motion animations & micro-interactions
   - Enterprise SSO (Google Workspace, Microsoft 365)
   ══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  CreditCard,
  Plane,
  Users,
  Building2,
  KeyRound,
  ArrowLeft,
  User,
  Shield,
  Clock,
} from 'lucide-react';
import useStore from '../store/useStore';

// Demo Personas for instant 1-click evaluation
const DEMO_PERSONAS = [
  {
    id: 'EMP001',
    name: 'Swafvan Hassan',
    email: 'swafvan.hassan@novapulse.ae',
    role: 'HR Lead & Admin',
    department: 'People Operations',
    avatarColor: '#20201E',
    tag: 'Admin',
    description: 'Full administrative access to payroll, visas & settings',
  },
  {
    id: 'EMP006',
    name: 'Kai Tanaka',
    email: 'kai.tanaka@novapulse.ae',
    role: 'Finance Manager',
    department: 'Finance',
    avatarColor: '#E8A838',
    tag: 'Finance',
    description: 'WPS salary batch files, disbursements & expense claims',
  },
  {
    id: 'EMP003',
    name: 'Lena Park',
    email: 'lena.park@novapulse.ae',
    role: 'Senior Product Designer',
    department: 'Design',
    avatarColor: '#5BC0DE',
    tag: 'Employee',
    description: 'Self-service portal, leave requests & payslips',
  },
];

export default function Login() {
  const navigate = useNavigate();
  const login = useStore((s) => s.login);
  const addToast = useStore((s) => s.addToast);

  // Active view: 'signin' | 'request' | 'forgot'
  const [authMode, setAuthMode] = useState('signin');

  // Form states
  const [email, setEmail] = useState('swafvan.hassan@novapulse.ae');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedPersona, setSelectedPersona] = useState('EMP001');
  const [isLoading, setIsLoading] = useState(false);

  // Request Access form states
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqDept, setReqDept] = useState('Engineering');
  const [reqRole, setReqRole] = useState('');
  const [reqSubmitted, setReqSubmitted] = useState(false);

  // Forgot password states
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Handle persona selection
  const handleSelectPersona = (persona) => {
    setSelectedPersona(persona.id);
    setEmail(persona.email);
    setPassword('••••••••••••');
  };

  // Handle Sign In submit
  const handleSignIn = (e) => {
    e?.preventDefault();
    if (!email) {
      addToast({ type: 'warning', message: 'Please enter your corporate email address.' });
      return;
    }

    setIsLoading(true);

    // Realistic authentication flow simulation
    setTimeout(() => {
      const matchedPersona = DEMO_PERSONAS.find((p) => p.email.toLowerCase() === email.toLowerCase()) || {
        id: 'EMP001',
        name: email.split('@')[0].replace('.', ' '),
        email,
        role: 'Team Member',
        department: 'Operations',
        avatarColor: '#20201E',
      };

      login(matchedPersona);
      setIsLoading(false);
      addToast({
        type: 'success',
        message: `Welcome back, ${matchedPersona.name}! Workspace session active.`,
      });
      navigate('/', { replace: true });
    }, 700);
  };

  // Handle SSO login
  const handleSSOLogin = (provider) => {
    setIsLoading(true);
    setTimeout(() => {
      const adminUser = DEMO_PERSONAS[0];
      login(adminUser);
      setIsLoading(false);
      addToast({
        type: 'success',
        message: `Successfully authenticated via ${provider} Workspace.`,
      });
      navigate('/', { replace: true });
    }, 600);
  };

  // Handle Request Access submit
  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!reqName || !reqEmail) {
      addToast({ type: 'warning', message: 'Please provide your full name and corporate email.' });
      return;
    }
    setReqSubmitted(true);
    addToast({
      type: 'info',
      message: 'Onboarding request submitted to HR team for review.',
    });
  };

  // Handle Forgot Password submit
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      addToast({ type: 'warning', message: 'Please enter your account email.' });
      return;
    }
    setForgotSent(true);
    addToast({
      type: 'success',
      message: 'Password reset link sent to your corporate email.',
    });
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8 selection:bg-gold/30 selection:text-charcoal relative overflow-x-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 88% 12%, rgba(244, 197, 66, 0.22) 0%, transparent 55%), radial-gradient(ellipse at 12% 88%, rgba(248, 222, 131, 0.16) 0%, transparent 55%), #F8F6EF',
      }}
    >
      {/* Background Decorative Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage:
            'radial-gradient(#20201E 0.75px, transparent 0.75px), radial-gradient(#20201E 0.75px, #F8F6EF 0.75px)',
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 80%)',
        }}
      />

      {/* Main Dual-Panel Enterprise Card Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-6xl min-h-[640px] bg-white/70 backdrop-blur-2xl rounded-3xl border border-[#EAE7DD] shadow-[0_32px_90px_rgba(32,32,30,0.12),0_4px_24px_rgba(32,32,30,0.04)] grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative z-10"
      >
        {/* ══════════════════════════════════════════════════════════════
            LEFT PANEL: Brand Showcase, UAE Compliance & Live Metrics
           ══════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#EAE7DD] flex flex-col justify-between relative bg-gradient-to-br from-[#FAF9F5]/90 via-[#FAF9F5]/60 to-white/40">
          {/* Subtle Ambient Gold Spot */}
          <div
            className="absolute top-12 left-12 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-35"
            style={{ background: 'radial-gradient(circle, #F4C542 0%, transparent 70%)' }}
          />

          {/* Top: Logo & Platform Identity */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                <div className="w-2.5 h-5 rounded-l-full bg-charcoal" />
                <div className="w-2.5 h-5 rounded-r-full bg-gold" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-charcoal font-sans">
                  NovaPulse
                </span>
                <span className="px-2 py-0.5 rounded-full bg-cream border border-[#EAE7DD] text-[10px] font-bold text-charcoal tracking-wider uppercase font-mono">
                  HRMS Enterprise
                </span>
              </div>
            </div>

            <div className="mt-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-[11px] font-bold text-charcoal mb-3">
                <Sparkles size={12} className="text-charcoal" />
                <span>Next-Gen GCC Workforce Suite</span>
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-charcoal tracking-tight leading-[1.18]">
                Intelligent People, <br />
                Payroll & MOHRE Ops.
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-[#5C5950] leading-relaxed max-w-md">
                Unified UAE labor compliance, automated WPS salary disbursements, visa life-cycle
                renewals, and self-service portals engineered for enterprise excellence.
              </p>
            </div>
          </div>

          {/* Center: Live Interactive Metrics Showcase Cards */}
          <div className="my-8 space-y-3 relative z-10">
            {/* Metric 1: WPS Payroll Disbursal */}
            <motion.div
              whileHover={{ y: -2, x: 2 }}
              transition={{ duration: 0.2 }}
              className="p-3.5 rounded-2xl bg-white/95 border border-[#EAE7DD] shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-success-soft text-success flex items-center justify-center shrink-0">
                  <CreditCard size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-charcoal font-sans">
                      WPS Salary Disbursal
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold text-success bg-success-soft px-1.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                      100% SIF Validated
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    AED 598,420 ready for automated WPS bank routing
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold font-mono text-charcoal hidden sm:block">
                51 Staff
              </span>
            </motion.div>

            {/* Metric 2: Live Visa & MOHRE Radar */}
            <motion.div
              whileHover={{ y: -2, x: 2 }}
              transition={{ duration: 0.2 }}
              className="p-3.5 rounded-2xl bg-white/95 border border-[#EAE7DD] shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-warning-soft text-warning flex items-center justify-center shrink-0">
                  <Plane size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-charcoal font-sans">
                      Visa & Emirates ID Radar
                    </span>
                    <span className="text-[9px] font-bold text-[#8A6D14] bg-[#FFF8E6] px-1.5 py-0.5 rounded-full">
                      2 Renewals Due
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    Zero penalties with 60/30/15-day smart automated alerts
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold font-mono text-[#8A6D14] hidden sm:block">
                Active
              </span>
            </motion.div>

            {/* Metric 3: Real-Time Team Approvals */}
            <motion.div
              whileHover={{ y: -2, x: 2 }}
              transition={{ duration: 0.2 }}
              className="p-3.5 rounded-2xl bg-white/95 border border-[#EAE7DD] shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E0F4FA] text-info flex items-center justify-center shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-charcoal font-sans">
                      Department Approvals
                    </span>
                    <span className="text-[9px] font-bold text-[#2A7B9B] bg-[#EBF7FA] px-1.5 py-0.5 rounded-full">
                      Fast Track
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-0.5">
                    3 leave applications and 2 expense claims awaiting sign-off
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold font-mono text-charcoal hidden sm:block">
                99.4% SLA
              </span>
            </motion.div>
          </div>

          {/* Bottom Reassurance & Trust Badges */}
          <div className="pt-4 border-t border-[#EAE7DD]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-text-secondary relative z-10">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2 overflow-hidden">
                {['#20201E', '#F4C542', '#5CB85C', '#5BC0DE'].map((bg, i) => (
                  <div
                    key={i}
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white text-[9px] font-bold text-white flex items-center justify-center"
                    style={{ backgroundColor: bg }}
                  >
                    {['SH', 'LP', 'KT', 'OM'][i]}
                  </div>
                ))}
              </div>
              <span className="text-[11px] text-charcoal font-medium">
                120+ UAE Enterprises
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-text-secondary font-mono">
              <ShieldCheck size={13} className="text-success" />
              <span>MOHRE & WPS 256-Bit TLS</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            RIGHT PANEL: Authentication Section & Interactive Forms
           ══════════════════════════════════════════════════════════════ */}
        <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-center relative bg-white/80">
          <div className="max-w-md w-full mx-auto">
            {/* Header Tabs: Sign In / Request Access */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1.5 bg-cream p-1 rounded-full border border-border relative">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signin');
                    setReqSubmitted(false);
                    setForgotSent(false);
                  }}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    authMode === 'signin' ? 'text-white' : 'text-text-secondary hover:text-charcoal'
                  }`}
                >
                  {authMode === 'signin' && (
                    <motion.div
                      layoutId="activeAuthTab"
                      className="absolute inset-0 bg-charcoal rounded-full shadow-xs"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">Sign In</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('request');
                    setReqSubmitted(false);
                  }}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    authMode === 'request' ? 'text-white' : 'text-text-secondary hover:text-charcoal'
                  }`}
                >
                  {authMode === 'request' && (
                    <motion.div
                      layoutId="activeAuthTab"
                      className="absolute inset-0 bg-charcoal rounded-full shadow-xs"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">Request Access</span>
                </button>
              </div>

              {authMode !== 'signin' && (
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className="text-xs font-semibold text-charcoal hover:underline flex items-center gap-1 transition-all cursor-pointer"
                >
                  <ArrowLeft size={12} />
                  <span>Back to login</span>
                </button>
              )}
            </div>

            {/* ── Mode 1: SIGN IN ── */}
            {authMode === 'signin' && (
              <motion.div
                key="signin-form"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-sans">
                    Welcome back
                  </h2>
                  <p className="text-xs text-text-secondary mt-1">
                    Enter your corporate credentials to access your NovaPulse HRMS portal.
                  </p>
                </div>

                {/* 1-Click Quick Demo Personas */}
                <div className="mb-5 p-3 rounded-2xl bg-[#FAF9F5] border border-[#EAE7DD]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider font-mono">
                      1-Click Demo Personas
                    </span>
                    <span className="text-[10px] text-charcoal font-medium flex items-center gap-1">
                      <Sparkles size={11} className="text-gold" /> Quick Fill
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    {DEMO_PERSONAS.map((p) => {
                      const isSelected = selectedPersona === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => handleSelectPersona(p)}
                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer relative ${
                            isSelected
                              ? 'bg-white border-charcoal shadow-xs ring-1 ring-charcoal'
                              : 'bg-white/70 border-border hover:bg-white hover:border-[#D4D0C5]'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: p.avatarColor }}
                            />
                            <span className="text-[11px] font-bold text-charcoal truncate">
                              {p.name.split(' ')[0]}
                            </span>
                          </div>
                          <span className="text-[9px] text-text-secondary block truncate mt-0.5 font-mono">
                            {p.tag}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Sign In Form */}
                <form onSubmit={handleSignIn} className="space-y-4">
                  {/* Email / Staff ID */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal mb-1.5">
                      Work Email or Staff ID
                    </label>
                    <div className="relative">
                      <Mail
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
                      />
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setSelectedPersona('');
                        }}
                        placeholder="swafvan.hassan@novapulse.ae"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAE7DD] text-xs font-medium text-charcoal placeholder:text-[#A8A69E] focus:outline-none focus:border-charcoal focus:ring-2 focus:ring-charcoal/10 transition-all shadow-2xs"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-charcoal">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setAuthMode('forgot')}
                        className="text-[11px] font-semibold text-charcoal hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock
                        size={15}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none"
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-[#EAE7DD] text-xs font-medium text-charcoal placeholder:text-[#A8A69E] focus:outline-none focus:border-charcoal focus:ring-2 focus:ring-charcoal/10 transition-all shadow-2xs"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-charcoal transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-[#D4D0C5] text-charcoal focus:ring-charcoal cursor-pointer accent-[#20201E]"
                      />
                      <span className="text-xs text-[#5C5950]">Remember this device for 30 days</span>
                    </label>
                  </div>

                  {/* Primary CTA Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-charcoal hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer group disabled:opacity-75 disabled:cursor-not-allowed mt-2"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Verifying credentials...</span>
                      </div>
                    ) : (
                      <>
                        <span>Sign In to Workspace</span>
                        <ArrowRight
                          size={14}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </motion.button>
                </form>

                {/* SSO Divider */}
                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#EAE7DD]" />
                  </div>
                  <span className="relative px-3 bg-white text-[10px] font-semibold text-text-secondary uppercase tracking-wider font-mono">
                    or continue with corporate SSO
                  </span>
                </div>

                {/* SSO Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Google Workspace */}
                  <button
                    type="button"
                    onClick={() => handleSSOLogin('Google')}
                    className="py-2.5 px-3 rounded-xl border border-[#EAE7DD] bg-white hover:bg-[#FAF9F5] hover:border-[#D4D0C5] text-xs font-semibold text-charcoal flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Google Workspace</span>
                  </button>

                  {/* Microsoft 365 Azure AD */}
                  <button
                    type="button"
                    onClick={() => handleSSOLogin('Microsoft 365')}
                    className="py-2.5 px-3 rounded-xl border border-[#EAE7DD] bg-white hover:bg-[#FAF9F5] hover:border-[#D4D0C5] text-xs font-semibold text-charcoal flex items-center justify-center gap-2 transition-all shadow-2xs cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <rect fill="#F25022" x="1" y="1" width="10" height="10" />
                      <rect fill="#7FBA00" x="13" y="1" width="10" height="10" />
                      <rect fill="#00A4EF" x="1" y="13" width="10" height="10" />
                      <rect fill="#FFB900" x="13" y="13" width="10" height="10" />
                    </svg>
                    <span>Microsoft 365</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Mode 2: REQUEST ACCESS / SIGN UP ── */}
            {authMode === 'request' && (
              <motion.div
                key="request-form"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-sans">
                    Request Workspace Access
                  </h2>
                  <p className="text-xs text-text-secondary mt-1">
                    New staff member or department lead? Submit your details for administrator verification.
                  </p>
                </div>

                {reqSubmitted ? (
                  <div className="p-6 rounded-2xl bg-success-soft border border-success/30 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white text-success flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="text-sm font-bold text-charcoal">
                      Onboarding Request Received
                    </h3>
                    <p className="text-xs text-[#44423C] leading-relaxed">
                      Thank you, <strong className="text-charcoal">{reqName}</strong>. Your request for the{' '}
                      <span className="font-semibold">{reqDept}</span> department has been dispatched to the HR
                      Operations team. You will receive an invitation email upon approval.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signin');
                        setReqSubmitted(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-charcoal text-white text-xs font-bold hover:bg-black transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Return to Sign In</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleRequestSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary"
                        />
                        <input
                          type="text"
                          value={reqName}
                          onChange={(e) => setReqName(e.target.value)}
                          placeholder="e.g. Tariq Mansoor"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAE7DD] text-xs font-medium text-charcoal placeholder:text-[#A8A69E] focus:outline-none focus:border-charcoal focus:ring-2 focus:ring-charcoal/10 transition-all shadow-2xs"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1">
                        Corporate Email
                      </label>
                      <div className="relative">
                        <Mail
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary"
                        />
                        <input
                          type="email"
                          value={reqEmail}
                          onChange={(e) => setReqEmail(e.target.value)}
                          placeholder="tariq.mansoor@novapulse.ae"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAE7DD] text-xs font-medium text-charcoal placeholder:text-[#A8A69E] focus:outline-none focus:border-charcoal focus:ring-2 focus:ring-charcoal/10 transition-all shadow-2xs"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-charcoal mb-1">
                          Department
                        </label>
                        <select
                          value={reqDept}
                          onChange={(e) => setReqDept(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#EAE7DD] text-xs font-medium text-charcoal focus:outline-none focus:border-charcoal transition-all shadow-2xs cursor-pointer"
                        >
                          <option value="Engineering">Engineering</option>
                          <option value="Design">Design</option>
                          <option value="Finance">Finance</option>
                          <option value="People Operations">People Operations</option>
                          <option value="Operations">Operations</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-charcoal mb-1">
                          Requested Role
                        </label>
                        <input
                          type="text"
                          value={reqRole}
                          onChange={(e) => setReqRole(e.target.value)}
                          placeholder="e.g. Lead Engineer"
                          className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#EAE7DD] text-xs font-medium text-charcoal placeholder:text-[#A8A69E] focus:outline-none focus:border-charcoal transition-all shadow-2xs"
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 rounded-xl bg-charcoal hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer mt-2"
                    >
                      <Shield size={14} />
                      <span>Submit Onboarding Request</span>
                    </motion.button>
                  </form>
                )}
              </motion.div>
            )}

            {/* ── Mode 3: FORGOT PASSWORD ── */}
            {authMode === 'forgot' && (
              <motion.div
                key="forgot-form"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-charcoal tracking-tight font-sans">
                    Reset your password
                  </h2>
                  <p className="text-xs text-text-secondary mt-1">
                    Enter your registered corporate email and we will dispatch a secure recovery token.
                  </p>
                </div>

                {forgotSent ? (
                  <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#EAE7DD] text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white text-gold border border-[#EAE7DD] flex items-center justify-center mx-auto shadow-xs">
                      <Mail size={22} className="text-charcoal" />
                    </div>
                    <h3 className="text-sm font-bold text-charcoal">
                      Recovery Link Dispatched
                    </h3>
                    <p className="text-xs text-[#5C5950] leading-relaxed">
                      We have sent instructions to <strong className="text-charcoal">{forgotEmail}</strong>.
                      Please check your inbox and corporate spam filter.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signin');
                        setForgotSent(false);
                      }}
                      className="px-4 py-2 rounded-xl bg-charcoal text-white text-xs font-bold hover:bg-black transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <span>Return to Sign In</span>
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal mb-1.5">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary"
                        />
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="swafvan.hassan@novapulse.ae"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#EAE7DD] text-xs font-medium text-charcoal placeholder:text-[#A8A69E] focus:outline-none focus:border-charcoal focus:ring-2 focus:ring-charcoal/10 transition-all shadow-2xs"
                          required
                        />
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 rounded-xl bg-charcoal hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
                    >
                      <KeyRound size={14} />
                      <span>Send Recovery Instructions</span>
                    </motion.button>
                  </form>
                )}
              </motion.div>
            )}

            {/* Bottom Footer Note */}
            <div className="mt-8 text-center text-[10px] text-text-secondary">
              <span>Protected by NovaPulse Enterprise Security Shield.</span>
              <div className="mt-1 flex items-center justify-center gap-3">
                <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:underline">
                  Terms of Service
                </a>
                <span>&bull;</span>
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:underline">
                  Privacy Policy
                </a>
                <span>&bull;</span>
                <a href="#compliance" onClick={(e) => e.preventDefault()} className="hover:underline">
                  UAE MOHRE WPS v2.4
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
