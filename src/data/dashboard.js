/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Mock Dashboard Data
   ══════════════════════════════════════════════════════════════ */

export const dashboardStats = {
  totalEmployees: 84,
  activeEmployees: 72,
  inactiveEmployees: 4,
  newJoiners: 8,
  onLeave: 6,
  pendingApprovals: 14,
  openPositions: 37,
  totalProjects: 212,
  interviewRate: 17,
  hiredRate: 15,
  projectTimeRate: 56,
  outputRate: 12,
};

export const departmentDistribution = [
  { name: 'Engineering', value: 28, color: '#20201E' },
  { name: 'Design', value: 14, color: '#F4C542' },
  { name: 'Product', value: 12, color: '#E8A838' },
  { name: 'Operations', value: 10, color: '#85837B' },
  { name: 'Marketing', value: 8, color: '#5CB85C' },
  { name: 'Sales', value: 6, color: '#5BC0DE' },
  { name: 'Finance', value: 4, color: '#9B59B6' },
  { name: 'HR', value: 2, color: '#D9534F' },
];

export const workforceGrowth = [
  { month: 'Jan', employees: 62 },
  { month: 'Feb', employees: 64 },
  { month: 'Mar', employees: 66 },
  { month: 'Apr', employees: 69 },
  { month: 'May', employees: 71 },
  { month: 'Jun', employees: 73 },
  { month: 'Jul', employees: 76 },
  { month: 'Aug', employees: 79 },
  { month: 'Sep', employees: 82 },
  { month: 'Oct', employees: 84 },
];

export const weeklyProgress = [
  { day: 'W', hours: 5.2, target: 8 },
  { day: 'T', hours: 7.1, target: 8 },
  { day: 'F', hours: 4.8, target: 8 },
  { day: 'S', hours: 0, target: 0 },
  { day: 'S', hours: 0, target: 0 },
  { day: 'M', hours: 7.9, target: 8 },
  { day: 'T', hours: 5.7, target: 8 },
];

export const monthlyPayroll = [
  { month: 'Apr', total: 892000 },
  { month: 'May', total: 915000 },
  { month: 'Jun', total: 928000 },
  { month: 'Jul', total: 945000 },
  { month: 'Aug', total: 968000 },
  { month: 'Sep', total: 985000 },
];

export const upcomingBirthdays = [
  { name: 'Sofia Marin', date: 'Oct 28', department: 'Design' },
  { name: 'Rania Khalil', date: 'Nov 30', department: 'Operations' },
  { name: 'Jonah Reyes', date: 'Nov 23', department: 'Engineering' },
];

export const pendingApprovals = [
  { id: 'REQ-101', type: 'Leave', employee: 'Lena Park', date: 'Oct 22', status: 'Pending' },
  { id: 'REQ-102', type: 'Expense', employee: 'Omar Haddad', date: 'Oct 21', status: 'Pending' },
  { id: 'REQ-103', type: 'Leave', employee: 'Kai Tanaka', date: 'Oct 20', status: 'Pending' },
  { id: 'REQ-104', type: 'Asset', employee: 'Theo Brandt', date: 'Oct 19', status: 'Pending' },
];

export const onboardingTasks = [
  { id: 1, title: 'Intro interview', date: 'Sep 29, 08:30', completed: true },
  { id: 2, title: 'Sign the offer', date: 'Sep 29, 10:30', completed: true },
  { id: 3, title: 'Tax & bank forms', date: 'Sep 29, 13:00', completed: false },
  { id: 4, title: 'Accounts & access', date: 'Sep 30, 09:00', completed: false },
  { id: 5, title: 'Laptop hand-off', date: 'Sep 30, 11:15', completed: false },
  { id: 6, title: 'Q4 goals draft', date: 'Oct 1, 14:45', completed: false },
  { id: 7, title: 'Coffee with the team', date: 'Oct 2, 10:00', completed: false },
  { id: 8, title: 'Handbook walkthrough', date: 'Oct 2, 16:30', completed: false },
];

export const scheduleEvents = [
  {
    id: 1,
    title: 'Weekly team sync',
    subtitle: 'Priorities for the sprint',
    day: 'Tue',
    time: '8:00 am',
    duration: 60,
    attendees: 3,
    color: '#20201E',
  },
  {
    id: 2,
    title: '1:1 with Mira',
    subtitle: 'Growth plan',
    day: 'Tue',
    time: '9:00 am',
    duration: 45,
    attendees: 1,
    color: '#F4C542',
  },
  {
    id: 3,
    title: 'Onboarding session',
    subtitle: 'Welcome Jonah & Theo',
    day: 'Tue',
    time: '10:00 am',
    duration: 90,
    attendees: 2,
    color: '#85837B',
  },
];

export const recentActivity = [
  { id: 1, action: 'Leave approved', detail: 'Lena Park - Annual Leave', time: '2 hours ago', type: 'leave' },
  { id: 2, action: 'New employee added', detail: 'Theo Brandt - Platform Engineer', time: '5 hours ago', type: 'employee' },
  { id: 3, action: 'Payroll processed', detail: 'September 2026 - 84 employees', time: '1 day ago', type: 'payroll' },
  { id: 4, action: 'Expense approved', detail: 'Omar Haddad - AED 2,450', time: '1 day ago', type: 'expense' },
  { id: 5, action: 'Interview scheduled', detail: 'Senior Backend Engineer', time: '2 days ago', type: 'recruitment' },
];

export const contractExpirations = [
  { name: 'Lena Park', role: 'Product Manager', expiry: '2025-01-09', daysLeft: -654 },
  { name: 'Sofia Marin', role: 'Brand Designer', expiry: '2025-10-31', daysLeft: -359 },
  { name: 'Omar Haddad', role: 'Backend Engineer', expiry: '2026-02-04', daysLeft: -263 },
];

export const visaExpirations = [
  { name: 'Lena Park', type: 'Employment Visa', expiry: '2025-01-09', status: 'Expired' },
  { name: 'Sofia Marin', type: 'Employment Visa', expiry: '2025-10-31', status: 'Expired' },
  { name: 'Omar Haddad', type: 'Employment Visa', expiry: '2026-02-04', status: 'Expiring' },
  { name: 'Ines Duarte', type: 'Employment Visa', expiry: '2026-08-11', status: 'Active' },
];
