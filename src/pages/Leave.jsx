/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Leave Management
   Leave balances, calendar, request list
   ══════════════════════════════════════════════════════════════ */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar as CalendarIcon, Check, X, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import useStore from '../store/useStore';
import { getInitials, getAvatarColor } from '../data/employees';
import PageTransition from '../components/common/PageTransition';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import { MotionCount } from '../components/animations';

const leaveTypes = [
  { type: 'Annual Leave', total: 30, used: 8, color: '#F4C542' },
  { type: 'Sick Leave', total: 12, used: 2, color: '#D9534F' },
  { type: 'Parental Leave', total: 90, used: 0, color: '#5BC0DE' },
  { type: 'Compassionate', total: 5, used: 0, color: '#85837B' },
  { type: 'Hajj Leave', total: 30, used: 0, color: '#E8A838' },
  { type: 'Study Leave', total: 10, used: 0, color: '#9B59B6' },
];

const CircularProgress = ({ used, total, color, size = 80, strokeWidth = 6 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = total > 0 ? (used / total) * 100 : 0;
  const dashOffset = circumference * (1 - percentage / 100);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#F0EDE5" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold">
          <MotionCount to={total - used} duration={0.9} />
        </span>
        <span className="text-[9px] text-text-secondary">left</span>
      </div>
    </div>
  );
};

const Leave = () => {
  const leaveRequests = useStore(s => s.leaveRequests);
  const updateLeaveRequest = useStore(s => s.updateLeaveRequest);
  const addToast = useStore(s => s.addToast);
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [showApply, setShowApply] = useState(false);

  const filteredRequests = useMemo(() => {
    return leaveRequests.filter((r) => {
      const matchTab = activeTab === 'All' || r.status === activeTab;
      const matchSearch = !search ||
        r.employee?.toLowerCase().includes(search.toLowerCase()) ||
        r.type?.toLowerCase().includes(search.toLowerCase()) ||
        r.reason?.toLowerCase().includes(search.toLowerCase());
      return matchTab && matchSearch;
    });
  }, [leaveRequests, activeTab, search]);

  const handleApprove = (id) => {
    updateLeaveRequest(id, { status: 'Approved' });
    addToast({ type: 'success', message: 'Leave request approved' });
  };

  const handleReject = (id) => {
    updateLeaveRequest(id, { status: 'Rejected' });
    addToast({ type: 'warning', message: 'Leave request rejected' });
  };

  return (
    <PageTransition className="p-6">
      {/* Page Header */}
      <PageHeader
        title="Leave Management"
        subtitle="Employee leave allocations, leave calendar, and approval workflows"
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Filter leave requests..."
        actions={
          <button className="btn btn-primary" onClick={() => setShowApply(true)}>
            <Plus size={14} /> Apply Leave
          </button>
        }
      />

      {/* Leave Balance Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {leaveTypes.map((lt, i) => (
          <motion.div
            key={lt.type}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            className="card p-4 flex flex-col items-center text-center"
          >
            <CircularProgress used={lt.used} total={lt.total} color={lt.color} />
            <h4 className="text-xs font-semibold mt-3">{lt.type}</h4>
            <p className="text-[10px] text-text-secondary mt-0.5">
              <MotionCount to={lt.used} duration={0.8} /> / {lt.total} used
            </p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-4">
        {['All', 'Pending', 'Approved', 'Rejected'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pill-tab ${activeTab === tab ? 'active' : ''}`}
          >
            {tab}
            <span className="text-[10px] opacity-60 ml-1">
              <MotionCount
                to={tab === 'All' ? leaveRequests.length : leaveRequests.filter(r => r.status === tab).length}
                duration={0.6}
              />
            </span>
          </button>
        ))}
      </div>

      {/* Requests Table */}
      <div className="card p-0 overflow-hidden">
        <DataTable
          data={filteredRequests}
          columns={[
            {
              key: 'employeeName',
              header: 'Employee',
              sortable: true,
              render: (val, req) => (
                <div className="flex items-center gap-2">
                  <div className="avatar avatar-sm" style={{ background: getAvatarColor(req.employeeName) }}>
                    <span className="text-white text-[9px] font-semibold">{getInitials(req.employeeName)}</span>
                  </div>
                  <span className="text-sm font-medium">{req.employeeName}</span>
                </div>
              ),
            },
            { key: 'type', header: 'Type', sortable: true },
            {
              key: 'startDate',
              header: 'Duration',
              className: 'text-sm text-text-secondary',
              render: (val, req) => (
                <span>
                  {new Date(req.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  {' – '}
                  {new Date(req.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              ),
            },
            { key: 'days', header: 'Days', className: 'text-sm font-semibold', sortable: true },
            { key: 'reason', header: 'Reason', className: 'text-sm text-text-secondary max-w-[200px] truncate' },
            { key: 'status', header: 'Status' },
          ]}
          actions={(req) => (
            req.status === 'Pending' ? (
              <div className="flex gap-1 justify-end">
                <button onClick={() => handleApprove(req.id)} className="btn btn-ghost btn-sm text-success" title="Approve">
                  <Check size={14} />
                </button>
                <button onClick={() => handleReject(req.id)} className="btn btn-ghost btn-sm text-danger" title="Reject">
                  <X size={14} />
                </button>
              </div>
            ) : null
          )}
          sortable
          pagination
          pageSize={8}
          emptyMessage="No leave requests in this category"
        />
      </div>

      {/* Apply Leave Modal */}
      <AnimatePresence>
        {showApply && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-overlay" onClick={() => setShowApply(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="text-lg font-semibold">Apply for Leave</h3>
                <button onClick={() => setShowApply(false)} className="btn btn-ghost btn-icon"><X size={16} /></button>
              </div>
              <div className="modal-body space-y-4">
                <div>
                  <label className="label">Leave Type</label>
                  <select className="input select">
                    {leaveTypes.map(lt => <option key={lt.type}>{lt.type}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Start Date</label>
                    <input type="date" className="input" />
                  </div>
                  <div>
                    <label className="label">End Date</label>
                    <input type="date" className="input" />
                  </div>
                </div>
                <div>
                  <label className="label">Reason</label>
                  <textarea className="input" rows={3} placeholder="Describe the reason..." />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowApply(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={() => { setShowApply(false); }}>Submit Request</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Leave;
