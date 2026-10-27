
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserCheck, Calendar, Clock, DollarSign, CheckCircle2, TrendingUp, ShieldAlert, FileText, Briefcase, Plus, Download, X, Cake, CheckCircle } from 'lucide-react';
import useStore from '../store/useStore';
import PageTransition from '../components/common/PageTransition';
import { getInitials, getAvatarColor } from '../data/employees';
import { MotionCount, ApprovalCheckButton, AnimatedProgressBar } from '../components/animations';

// Initial pending approval requests for interactive resolution
const initialApprovals = [
  {
    id: 'REQ-101',
    type: 'Leave',
    employee: 'Lena Park',
    role: 'Product Manager',
    detail: 'Annual Leave • 5 days (Oct 28 – Nov 01)',
    reason: 'Family visit to Seoul',
    date: 'Today, 09:30 am',
    amount: null,
  },
  {
    id: 'REQ-102',
    type: 'Expense',
    employee: 'Omar Haddad',
    role: 'Backend Engineer',
    detail: 'Travel & Client Meeting • Abu Dhabi',
    reason: 'Client technical onsite deployment',
    date: 'Today, 10:15 am',
    amount: 'AED 2,450',
  },
  {
    id: 'REQ-103',
    type: 'Leave',
    employee: 'Kai Tanaka',
    role: 'Data Analyst',
    detail: 'Sick Leave • 2 days (Oct 26 – Oct 27)',
    reason: 'Medical appointment & recovery',
    date: 'Yesterday, 04:10 pm',
    amount: null,
  },
  {
    id: 'REQ-104',
    type: 'Asset',
    employee: 'Theo Brandt',
    role: 'Platform Engineer',
    detail: 'Hardware Upgrade Request',
    reason: 'MacBook Pro 16" M3 for infrastructure builds',
    date: 'Oct 22, 11:45 am',
    amount: 'AED 11,200',
  },
];

// Who's Out Today Roster
const initialWhosOut = [
  { id: 1, name: 'Lena Park', role: 'Product Manager', type: 'Annual Leave', returnDate: 'Nov 02', status: 'leave' },
  { id: 2, name: 'Omar Haddad', role: 'Backend Engineer', type: 'Casual Leave', returnDate: 'Oct 27', status: 'leave' },
  { id: 3, name: 'Sofia Marin', role: 'Brand Designer', type: 'Sick Leave', returnDate: 'Oct 26', status: 'leave' },
  { id: 4, name: 'Jonah Reyes', role: 'Frontend Engineer', type: 'Remote (WFH)', returnDate: 'Monday', status: 'remote' },
  { id: 5, name: 'Theo Brandt', role: 'Platform Engineer', type: 'Annual Leave', returnDate: 'Oct 30', status: 'leave' },
  { id: 6, name: 'Freya Lund', role: 'UX Researcher', type: 'Remote (WFH)', returnDate: 'Monday', status: 'remote' },
];

// Visa & Document Expirations (Compliance Radar)
const complianceItems = [
  { id: 1, employee: 'Lena Park', doc: 'UAE Residence Visa', expiry: 'Expired 14d ago', status: 'critical', days: -14 },
  { id: 2, employee: 'Sofia Marin', doc: 'Emirates ID Renewal', expiry: 'Expires in 12 days', status: 'warning', days: 12 },
  { id: 3, employee: 'Omar Haddad', doc: 'Labor Card (MOHRE)', expiry: 'Expires in 28 days', status: 'attention', days: 28 },
  { id: 4, employee: 'Ines Duarte', doc: 'Health Insurance Card', expiry: 'Expires in 45 days', status: 'normal', days: 45 },
];

// Department Distribution
const departmentsData = [
  { name: 'Engineering', count: 28, pct: 33, openRoles: 14, color: '#1C1B18' },
  { name: 'Design', count: 14, pct: 17, openRoles: 6, color: '#F4C542' },
  { name: 'Product', count: 12, pct: 14, openRoles: 5, color: '#E8A838' },
  { name: 'Operations', count: 10, pct: 12, openRoles: 4, color: '#85837B' },
  { name: 'Marketing', count: 8, pct: 10, openRoles: 4, color: '#5CB85C' },
  { name: 'Sales & Finance', count: 12, pct: 14, openRoles: 4, color: '#5BC0DE' },
];

// Activity Feed Log
const initialActivity = [
  { id: 1, text: 'September Payroll processed for 84 employees ($985,000)', time: '2 hours ago', icon: DollarSign, color: '#F4C542' },
  { id: 2, text: 'New joiner onboarded: Nadia Sato (QA Engineer)', time: '4 hours ago', icon: UserCheck, color: '#5CB85C' },
  { id: 3, text: 'Salary Certificate (NOC) issued for Swafvan Hassan', time: '6 hours ago', icon: FileText, color: '#5BC0DE' },
  { id: 4, text: 'Expense claim approved for Ines Duarte (AED 890)', time: 'Yesterday', icon: CheckCircle, color: '#1C1B18' },
  { id: 5, text: 'Health & Life insurance card renewed: Freya Lund', time: '2 days ago', icon: ShieldAlert, color: '#E8A838' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] } },
};

const Dashboard = () => {
  const navigate = useNavigate();
  const addToast = useStore((s) => s.addToast);

  const [approvals, setApprovals] = useState(initialApprovals);
  const [approvingId, setApprovingId] = useState(null);
  const [outFilter, setOutFilter] = useState('all');
  const [activityFeed, setActivityFeed] = useState(initialActivity);

  // One-click interactive approval handlers with yellow & white particle burst
  const handleApprove = (req) => {
    if (approvingId) return;
    setApprovingId(req.id);

    // Let the yellow/white celebratory particle burst play for 480ms before completing card removal
    setTimeout(() => {
      setApprovals((prev) => prev.filter((r) => r.id !== req.id));
      setApprovingId(null);
      addToast({
        type: 'success',
        message: `Approved ${req.type} request for ${req.employee}!`,
      });
      setActivityFeed((prev) => [
        {
          id: Date.now(),
          text: `${req.type} request approved for ${req.employee}`,
          time: 'Just now',
          icon: CheckCircle2,
          color: '#5CB85C',
        },
        ...prev,
      ]);
    }, 480);
  };

  const handleReject = (req) => {
    setApprovals((prev) => prev.filter((r) => r.id !== req.id));
    addToast({
      type: 'warning',
      message: `Rejected ${req.type} request for ${req.employee}.`,
    });
  };

  const handleExportAudit = () => {
    addToast({
      type: 'success',
      message: 'Generating HR Workforce & Compliance Audit Report (PDF)...',
    });
  };

  const filteredWhosOut = initialWhosOut.filter((item) => {
    if (outFilter === 'all') return true;
    if (outFilter === 'leave') return item.status === 'leave';
    if (outFilter === 'remote') return item.status === 'remote';
    return true;
  });

  return (
    <PageTransition className="w-full pt-2">
      {/* ── Top Bar: Greeting & Quick Action Command Bar ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[32px] 2xl:text-[42px] font-normal tracking-tight text-charcoal leading-none font-sans">
            Good morning, Swafvan
          </h1>
          <p className="text-xs 2xl:text-sm text-text-secondary mt-1.5 flex items-center gap-2">
            <span>Workforce & Human Resource Command Center</span>
            <span className="w-1 h-1 rounded-full bg-[#D4D1C8]" />
            <span className="font-medium text-charcoal">Saturday, Oct 24, 2026</span>
          </p>
        </div>

        {/* Quick HR Action Pills Bar */}
        <div className="flex items-center flex-wrap gap-2.5">
          <NavLink
            to="/employees/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-full bg-[#1C1B18] text-white text-xs 2xl:text-sm font-semibold shadow-xs hover:bg-charcoal-light transition-all no-underline"
          >
            <Plus size={14} />
            <span>Add Employee</span>
          </NavLink>

          <NavLink
            to="/leave"
            className="inline-flex items-center gap-1.5 px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-full bg-white border border-border text-charcoal text-xs 2xl:text-sm font-medium shadow-xs hover:bg-[#FAF9F5] transition-all no-underline"
          >
            <Calendar size={13} className="text-text-secondary" />
            <span>Approve Leaves</span>
            <span className="w-5 h-5 rounded-full bg-gold text-charcoal text-[10px] font-bold flex items-center justify-center">
              {approvals.filter((a) => a.type === 'Leave').length}
            </span>
          </NavLink>

          <NavLink
            to="/payroll"
            className="inline-flex items-center gap-1.5 px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-full bg-white border border-border text-charcoal text-xs 2xl:text-sm font-medium shadow-xs hover:bg-[#FAF9F5] transition-all no-underline"
          >
            <DollarSign size={13} className="text-text-secondary" />
            <span>Run Payroll</span>
            <span className="text-[10px] text-text-secondary hidden sm:inline">Due Oct 30</span>
          </NavLink>

          <NavLink
            to="/recruitment"
            className="inline-flex items-center gap-1.5 px-4 py-2 2xl:px-5 2xl:py-2.5 rounded-full bg-white border border-border text-charcoal text-xs 2xl:text-sm font-medium shadow-xs hover:bg-[#FAF9F5] transition-all no-underline"
          >
            <Briefcase size={13} className="text-text-secondary" />
            <span>37 Open Roles</span>
          </NavLink>

          <button
            onClick={handleExportAudit}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 2xl:px-4 2xl:py-2.5 rounded-full bg-cream text-charcoal text-xs 2xl:text-sm font-medium hover:bg-border transition-all"
            title="Download HR Summary"
          >
            <Download size={13} />
            <span className="hidden xl:inline">Export Audit</span>
          </button>
        </div>
      </div>

      {/* ── 4 Hero HR KPI Telemetry Cards ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 2xl:gap-5 mb-6"
      >
        {/* KPI 1: Total Workforce */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.012, boxShadow: '0 12px 28px -6px rgba(28,27,24,0.08)' }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.2 }}
          className="card p-4 2xl:p-5 rounded-2xl bg-white border border-border shadow-sm flex flex-col justify-between cursor-pointer"
          onClick={() => navigate('/employees')}
        >
          <div className="flex items-center justify-between text-text-secondary">
            <span className="text-xs 2xl:text-sm font-medium">Total Workforce</span>
            <div className="w-8 h-8 rounded-full bg-ivory flex items-center justify-center text-charcoal">
              <Users size={15} />
            </div>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <span className="text-[34px] 2xl:text-[44px] font-normal text-charcoal leading-none">
              <MotionCount to={84} duration={1.2} />
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] 2xl:text-xs font-semibold bg-[#E6F4EA] text-[#137333]">
              <TrendingUp size={11} /> +10.5%
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] 2xl:text-xs text-text-secondary pt-2 border-t border-border-light">
            <span className="text-charcoal font-medium">72 Active</span>
            <span>•</span>
            <span>8 New Joiners</span>
            <span>•</span>
            <span>4 Notice</span>
          </div>
        </motion.div>

        {/* KPI 2: Today's Attendance */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.012, boxShadow: '0 12px 28px -6px rgba(28,27,24,0.08)' }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.2 }}
          className="card p-4 2xl:p-5 rounded-2xl bg-white border border-border shadow-sm flex flex-col justify-between cursor-pointer"
          onClick={() => navigate('/attendance')}
        >
          <div className="flex items-center justify-between text-text-secondary">
            <span className="text-xs 2xl:text-sm font-medium">Today's Attendance</span>
            <div className="w-8 h-8 rounded-full bg-[#FDF3D6] flex items-center justify-center text-[#B06000]">
              <UserCheck size={15} />
            </div>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <span className="text-[34px] 2xl:text-[44px] font-normal text-charcoal leading-none">
              <MotionCount to={93.2} decimals={1} suffix="%" duration={1.2} />
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] 2xl:text-xs font-semibold bg-highlight-row text-[#8A6D14]">
              <MotionCount to={74} duration={1} /> Present
            </span>
          </div>
          {/* Framer Motion Animated attendance split */}
          <div className="space-y-1 pt-2 border-t border-border-light">
            <AnimatedProgressBar
              segments={[
                { value: 68, color: '#1C1B18', title: 'In Office (56)' },
                { value: 22, color: '#F4C542', title: 'Remote (18)' },
                { value: 10, color: '#D9534F', title: 'On Leave (6)' },
              ]}
              height="h-2"
              bgTrack="bg-border"
            />
            <div className="flex justify-between text-[10px] 2xl:text-[11px] text-text-secondary">
              <span>56 In Office</span>
              <span>18 Remote</span>
              <span>6 On Leave</span>
            </div>
          </div>
        </motion.div>

        {/* KPI 3: Pending HR Approvals */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.012, boxShadow: '0 12px 28px -6px rgba(28,27,24,0.08)' }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.2 }}
          className="card p-4 2xl:p-5 rounded-2xl bg-white border border-border shadow-sm flex flex-col justify-between cursor-pointer"
          onClick={() => navigate('/requests')}
        >
          <div className="flex items-center justify-between text-text-secondary">
            <span className="text-xs 2xl:text-sm font-medium">Pending Approvals</span>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-gold" />
            </span>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <span className="text-[34px] 2xl:text-[44px] font-normal text-charcoal leading-none">
              <MotionCount to={approvals.length + 10} duration={1} />
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] 2xl:text-xs font-semibold bg-[#FEF3E6] text-[#B06000]">
              Action Required
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] 2xl:text-xs text-text-secondary pt-2 border-t border-border-light">
            <span className="text-charcoal font-medium">{approvals.length} Live Desk</span>
            <span>•</span>
            <span>6 Visa/NOC</span>
            <span>•</span>
            <span>4 Expenses</span>
          </div>
        </motion.div>

        {/* KPI 4: Monthly Payroll Run */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, scale: 1.012, boxShadow: '0 12px 28px -6px rgba(28,27,24,0.08)' }}
          whileTap={{ scale: 0.985 }}
          transition={{ duration: 0.2 }}
          className="card p-4 2xl:p-5 rounded-2xl bg-white border border-border shadow-sm flex flex-col justify-between cursor-pointer"
          onClick={() => navigate('/payroll')}
        >
          <div className="flex items-center justify-between text-text-secondary">
            <span className="text-xs 2xl:text-sm font-medium">October Payroll Cycle</span>
            <div className="w-8 h-8 rounded-full bg-ivory flex items-center justify-center text-charcoal">
              <DollarSign size={15} />
            </div>
          </div>
          <div className="my-3 flex items-baseline justify-between">
            <span className="text-[34px] 2xl:text-[44px] font-normal text-charcoal leading-none">
              <MotionCount to={985} prefix="$" suffix="K" duration={1.2} />
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] 2xl:text-xs font-semibold bg-[#1C1B18] text-white">
              Due in 6d
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] 2xl:text-xs text-text-secondary pt-2 border-t border-border-light">
            <span>84 Employees</span>
            <span className="text-[#137333] font-medium">✓ Automated & Ready</span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Main Operations Grid (3 Columns) ── */}
      <div className="grid grid-cols-12 gap-5 2xl:gap-6 items-start">
        {/* ══════════════════════════════════════════════════════════════
            LEFT COLUMN (4 Cols): Who's Out Today + Visa & Document Expiry
            ══════════════════════════════════════════════════════════════ */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          {/* Card A: Who's Out Today */}
          <div className="card p-4 2xl:p-5 rounded-3xl bg-white border border-border shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm 2xl:text-base font-semibold text-charcoal">
                  Who's Out Today
                </h3>
                <p className="text-[11px] 2xl:text-xs text-text-secondary">
                  Live attendance & planned leave tracker
                </p>
              </div>

              {/* Sub-filter tabs */}
              <div className="flex items-center gap-1 bg-cream p-1 rounded-full text-[10px] 2xl:text-xs font-medium">
                {['all', 'leave', 'remote'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setOutFilter(tab)}
                    className={`px-2.5 py-0.5 rounded-full capitalize transition-colors ${
                      outFilter === tab
                        ? 'bg-[#1C1B18] text-white font-semibold shadow-xs'
                        : 'text-text-secondary hover:text-charcoal'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Roster List */}
            <div className="space-y-2 mt-2">
              {filteredWhosOut.map((person) => (
                <motion.div
                  key={person.id}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-between p-2 rounded-2xl hover:bg-[#FAF9F5] transition-colors border border-transparent hover:border-border-light cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className="w-7 h-7 2xl:w-8 2xl:h-8 rounded-full flex items-center justify-center text-[10px] 2xl:text-xs font-bold text-white shrink-0"
                      style={{ background: getAvatarColor(person.name) }}
                    >
                      {getInitials(person.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs 2xl:text-sm font-medium text-charcoal truncate leading-tight">
                        {person.name}
                      </p>
                      <p className="text-[10px] 2xl:text-[11px] text-text-secondary truncate">
                        {person.role}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        person.status === 'remote'
                          ? 'bg-gold/20 text-[#8A6D14]'
                          : 'bg-[#FEF3E6] text-[#B06000]'
                      }`}
                    >
                      {person.type}
                    </span>
                    <p className="text-[9px] text-text-secondary mt-0.5">Returns: {person.returnDate}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <NavLink
              to="/leave"
              className="mt-3 block text-center py-2 rounded-xl text-xs font-semibold text-charcoal bg-ivory hover:bg-cream transition-colors no-underline"
            >
              View Full Leave Calendar →
            </NavLink>
          </div>

          {/* Card B: Visa & Compliance Expiry Radar */}
          <div className="card p-4 2xl:p-5 rounded-3xl bg-white border border-border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShieldAlert size={16} className="text-danger" />
                <h3 className="text-sm 2xl:text-base font-semibold text-charcoal">
                  Visa & Compliance Radar
                </h3>
              </div>
              <span className="badge badge-danger text-[10px]">UAE / MOHRE</span>
            </div>
            <p className="text-[11px] 2xl:text-xs text-text-secondary mb-3">
              Immigration documents requiring HR renewal actions
            </p>

            <div className="space-y-2">
              {complianceItems.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -2, scale: 1.012 }}
                  transition={{ duration: 0.15 }}
                  className="p-2.5 rounded-2xl bg-[#FAF9F5] border border-border-light hover:border-[#D4D1C8] flex items-center justify-between transition-colors shadow-2xs"
                >
                  <div>
                    <p className="text-xs 2xl:text-sm font-semibold text-charcoal leading-tight">
                      {item.employee}
                    </p>
                    <p className="text-[10px] 2xl:text-[11px] text-text-secondary">
                      {item.doc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        item.status === 'critical'
                          ? 'bg-danger-soft text-danger'
                          : item.status === 'warning'
                          ? 'bg-warning-soft text-[#B8860B]'
                          : 'bg-border-light text-text-secondary'
                      }`}
                    >
                      {item.expiry}
                    </span>
                    <button
                      onClick={() =>
                        addToast({
                          type: 'info',
                          message: `Initiated renewal flow for ${item.employee}'s ${item.doc}`,
                        })
                      }
                      className="px-2 py-0.5 rounded-full bg-white border border-border text-[10px] font-medium text-charcoal hover:bg-[#1C1B18] hover:text-white transition-colors cursor-pointer"
                    >
                      Renew
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <NavLink
              to="/visa"
              className="mt-3 block text-center py-2 rounded-xl text-xs font-semibold text-charcoal bg-ivory hover:bg-cream transition-colors no-underline"
            >
              Open Visa Management Module →
            </NavLink>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            CENTER COLUMN (5 Cols): Pending Approvals Desk + Headcount
            ══════════════════════════════════════════════════════════════ */}
        <div className="col-span-12 lg:col-span-5 space-y-5">
          {/* Card C: Pending Approvals Desk (Interactive 1-Click Resolve) */}
          <div className="card p-4 2xl:p-5 rounded-3xl bg-white border border-border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm 2xl:text-base font-semibold text-charcoal flex items-center gap-2">
                  <span>Pending Approvals Desk</span>
                  <span className="w-5 h-5 rounded-full bg-[#1C1B18] text-white text-[10px] font-bold flex items-center justify-center">
                    {approvals.length}
                  </span>
                </h3>
                <p className="text-[11px] 2xl:text-xs text-text-secondary">
                  One-click decision for leave, claims & hardware
                </p>
              </div>

              <span className="text-[10px] 2xl:text-xs font-semibold text-[#137333] bg-[#E6F4EA] px-2.5 py-0.5 rounded-full">
                Live Inbox
              </span>
            </div>

            {/* List of Approval Items */}
            <div className="space-y-2.5 mt-3">
              {approvals.length === 0 ? (
                <div className="p-8 text-center bg-[#FAF9F5] rounded-2xl border border-dashed border-border">
                  <CheckCircle2 size={32} className="mx-auto text-success mb-2" />
                  <p className="text-xs font-semibold text-charcoal">All caught up!</p>
                  <p className="text-[11px] text-text-secondary">No pending approvals awaiting HR action.</p>
                </div>
              ) : (
                approvals.map((req) => (
                  <div
                    key={req.id}
                    className="p-3.5 rounded-2xl bg-warm-white border border-border hover:border-[#D4D1C8] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
                        style={{ background: getAvatarColor(req.employee) }}
                      >
                        {getInitials(req.employee)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs 2xl:text-sm font-semibold text-charcoal">
                            {req.employee}
                          </span>
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              req.type === 'Leave'
                                ? 'bg-[#FDF3D6] text-[#B06000]'
                                : req.type === 'Expense'
                                ? 'bg-[#E6F4EA] text-[#137333]'
                                : 'bg-border-light text-[#1C1B18]'
                            }`}
                          >
                            {req.type}
                          </span>
                          {req.amount && (
                            <span className="text-[10px] font-bold font-mono text-charcoal">
                              {req.amount}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-medium text-charcoal mt-0.5">
                          {req.detail}
                        </p>
                        <p className="text-[10px] text-text-secondary truncate">
                          "{req.reason}" • <span className="font-mono">{req.date}</span>
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons: Check & Cross */}
                    <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => handleReject(req)}
                        className="w-8 h-8 rounded-full bg-white border border-border text-danger hover:bg-danger-soft hover:border-danger flex items-center justify-center transition-all shadow-xs cursor-pointer"
                        title="Reject"
                      >
                        <X size={14} strokeWidth={2.5} />
                      </button>
                      {/* Reusable Approval Checkmark Button with Spreading Yellow & White Burst Animation */}
                      <ApprovalCheckButton
                        onClick={() => handleApprove(req)}
                        isActive={approvingId === req.id}
                        disabled={approvingId !== null}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Card D: Workforce Headcount & Department Distribution */}
          <div className="card p-4 2xl:p-5 rounded-3xl bg-white border border-border shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm 2xl:text-base font-semibold text-charcoal">
                  Workforce & Department Breakdown
                </h3>
                <p className="text-[11px] 2xl:text-xs text-text-secondary">
                  Headcount distribution across 6 core departments
                </p>
              </div>
              <span className="text-xs font-semibold text-charcoal">84 Total</span>
            </div>

            {/* Department Multi-Segment Bar using reusable AnimatedProgressBar */}
            <AnimatedProgressBar
              segments={departmentsData.map((d) => ({
                value: d.pct,
                color: d.color,
                title: `${d.name}: ${d.count} (${d.pct}%)`,
              }))}
              height="h-3"
              className="mb-4"
            />

            {/* Department Detail Grid with small cards micro-interactions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {departmentsData.map((d) => (
                <motion.div
                  key={d.name}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="p-2.5 rounded-xl bg-[#FAF9F5] border border-border-light hover:border-[#D4D1C8] flex flex-col justify-between cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                    <span className="text-[11px] font-medium text-charcoal truncate">{d.name}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-base 2xl:text-lg font-bold text-charcoal leading-none">
                      <MotionCount to={d.count} duration={0.9} />
                    </span>
                    <span className="text-[10px] text-text-secondary">
                      +{d.openRoles} hiring
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            RIGHT COLUMN (3 Cols): ATS Recruitment Pipeline + Activity Feed
            ══════════════════════════════════════════════════════════════ */}
        <div className="col-span-12 lg:col-span-3 space-y-5">
          {/* Card E: Recruitment & ATS Pipeline Snapshot */}
          <div className="card p-4 2xl:p-5 rounded-3xl bg-white border border-border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm 2xl:text-base font-semibold text-charcoal">
                  Recruitment & ATS
                </h3>
                <p className="text-[11px] 2xl:text-xs text-text-secondary">Active hiring pipeline</p>
              </div>
              <NavLink to="/recruitment" className="text-xs font-semibold text-charcoal hover:underline no-underline">
                37 Roles →
              </NavLink>
            </div>

            {/* ATS Funnel Stages with Reusable AnimatedProgressBar & MotionCount */}
            <div className="space-y-2 mt-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-text-secondary mb-1">
                  <span>Applied</span>
                  <span className="font-semibold text-charcoal">
                    <MotionCount to={142} duration={1} /> candidates
                  </span>
                </div>
                <AnimatedProgressBar value={100} color="#1C1B18" height="h-1.5" delay={0.15} />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-text-secondary mb-1">
                  <span>Phone Screen</span>
                  <span className="font-semibold text-charcoal">
                    <MotionCount to={28} duration={1} /> candidates
                  </span>
                </div>
                <AnimatedProgressBar value={55} color="#E8A838" height="h-1.5" delay={0.28} />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-text-secondary mb-1">
                  <span>Technical Interview</span>
                  <span className="font-semibold text-charcoal">
                    <MotionCount to={17} duration={1} /> candidates
                  </span>
                </div>
                <AnimatedProgressBar value={38} color="#F4C542" height="h-1.5" delay={0.4} />
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-text-secondary mb-1">
                  <span>Offer Stage</span>
                  <span className="font-semibold text-[#137333]">
                    <MotionCount to={6} duration={1} /> offers extended
                  </span>
                </div>
                <AnimatedProgressBar value={18} color="#5CB85C" height="h-1.5" delay={0.52} />
              </div>
            </div>
          </div>

          {/* Card F: Live HR Activity & Audit Feed */}
          <div className="card p-4 2xl:p-5 rounded-3xl bg-white border border-border shadow-sm">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border-light">
              <h3 className="text-sm 2xl:text-base font-semibold text-charcoal flex items-center gap-1.5">
                <Clock size={14} className="text-text-secondary" />
                Live HR Activity Feed
              </h3>
              <span className="text-[10px] text-text-secondary">Audited</span>
            </div>

            <div className="space-y-3">
              {activityFeed.map((act) => {
                const Icon = act.icon;
                return (
                  <motion.div
                    key={act.id}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-start gap-2.5 p-1 rounded-xl transition-colors cursor-pointer"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${act.color}20`, color: act.color }}
                    >
                      <Icon size={12} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] 2xl:text-xs font-medium text-charcoal leading-snug">
                        {act.text}
                      </p>
                      <span className="text-[9px] 2xl:text-[10px] text-text-secondary block mt-0.5">
                        {act.time}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Card G: Upcoming Celebrations */}
          <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="card p-3.5 2xl:p-4 rounded-2xl bg-highlight-row border border-gold-soft shadow-2xs cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
              <Cake size={14} className="text-[#8A6D14]" />
              <h4 className="text-xs 2xl:text-sm font-semibold text-[#8A6D14]">
                Upcoming Team Celebrations
              </h4>
            </div>
            <div className="space-y-1.5 text-[11px] 2xl:text-xs text-charcoal">
              <div className="flex justify-between items-center">
                <span>🎂 <strong>Sofia Marin</strong> (Birthday)</span>
                <span className="text-[#8A6D14] font-medium">Oct 28</span>
              </div>
              <div className="flex justify-between items-center">
                <span>🎖️ <strong>Nadia Sato</strong> (1 Year Milestone)</span>
                <span className="text-[#8A6D14] font-medium">Nov 04</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
