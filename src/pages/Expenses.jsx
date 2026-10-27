/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Expenses & Reimbursements
   ══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Receipt, Plus, Check, X, FileText, Download,
  DollarSign, TrendingUp, AlertCircle, Calendar
} from 'lucide-react';
import useStore from '../store/useStore';
import PageTransition from '../components/common/PageTransition';
import DataTable from '../components/common/DataTable';
import PageHeader from '../components/common/PageHeader';
import { MotionCount } from '../components/animations';

const Expenses = () => {
  const expenseClaims = useStore((s) => s.expenseClaims);
  const addExpenseClaim = useStore((s) => s.addExpenseClaim);
  const updateExpenseClaim = useStore((s) => s.updateExpenseClaim);
  const addToast = useStore((s) => s.addToast);

  const [filterStatus, setFilterStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: 'Daniel Okonkwo',
    category: 'Travel',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
  });

  const filtered = expenseClaims.filter((c) => {
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    const matchesSearch = !search ||
      c.employeeName?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase()) ||
      c.category?.toLowerCase().includes(search.toLowerCase()) ||
      c.id?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalSpent = expenseClaims
    .filter((c) => c.status === 'Approved')
    .reduce((sum, c) => sum + Number(c.amount), 0);

  const pendingAmount = expenseClaims
    .filter((c) => c.status === 'Pending')
    .reduce((sum, c) => sum + Number(c.amount), 0);

  const handleApprove = (id) => {
    updateExpenseClaim(id, { status: 'Approved' });
    addToast({ type: 'success', message: 'Expense claim approved.' });
  };

  const handleReject = (id) => {
    updateExpenseClaim(id, { status: 'Rejected' });
    addToast({ type: 'error', message: 'Expense claim rejected.' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) {
      addToast({ type: 'warning', message: 'Please fill in description and amount' });
      return;
    }

    const newClaim = {
      id: `EXP${(expenseClaims.length + 1).toString().padStart(3, '0')}`,
      employeeId: 'EMP001',
      employeeName: formData.employeeName,
      category: formData.category,
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: formData.date,
      status: 'Pending',
      receipt: 'receipt_upload.pdf',
    };

    addExpenseClaim(newClaim);
    addToast({ type: 'success', message: 'Expense claim submitted for review' });
    setShowModal(false);
    setFormData({
      employeeName: 'Daniel Okonkwo',
      category: 'Travel',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <PageTransition className="p-6">
      {/* Header */}
      <PageHeader
        title="Expenses & Reimbursements"
        subtitle="Review corporate expense receipts, mileage, and travel reimbursements"
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Filter claims by employee, category..."
        actions={
          <button onClick={() => setShowModal(true)} className="btn btn-dark">
            <Plus size={14} /> New Expense Claim
          </button>
        }
      />

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="stat-label">Total Reimbursed (Oct)</span>
            <div className="w-8 h-8 rounded-lg bg-success-soft text-success flex items-center justify-center">
              <DollarSign size={16} />
            </div>
          </div>
          <div className="stat-value mt-2">
            <MotionCount to={totalSpent} prefix="AED " duration={1.1} />
          </div>
          <p className="text-xs text-success mt-1">Processed across finance</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="stat-label">Pending Approval</span>
            <div className="w-8 h-8 rounded-lg bg-warning-soft text-warning flex items-center justify-center">
              <AlertCircle size={16} />
            </div>
          </div>
          <div className="stat-value mt-2 text-warning">
            <MotionCount to={pendingAmount} prefix="AED " duration={1.1} />
          </div>
          <p className="text-xs text-text-secondary mt-1">
            <span className="font-semibold text-charcoal">
              <MotionCount to={expenseClaims.filter((c) => c.status === 'Pending').length} duration={0.9} />
            </span>{' '}
            claims waiting
          </p>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="stat-label">Top Category</span>
            <div className="w-8 h-8 rounded-lg bg-cream text-charcoal flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="stat-value mt-2">Travel & Flights</div>
          <p className="text-xs text-text-secondary mt-1">
            <span className="font-semibold text-charcoal">
              <MotionCount to={62} suffix="%" duration={0.9} />
            </span>{' '}
            of monthly claims
          </p>
        </div>
      </div>

      {/* Claims Table */}
      <div className="card p-0 overflow-hidden">
        <div className="p-4 border-b border-border-light flex items-center justify-between">
          <h3 className="text-sm font-semibold">Expense Claims</h3>
          <div className="flex items-center gap-2">
            {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`pill-tab text-xs py-1 px-3 ${filterStatus === status ? 'active' : ''}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <DataTable
          data={filtered}
          columns={[
            { key: 'id', header: 'Claim ID', className: 'font-mono text-xs font-semibold text-text-secondary', sortable: true },
            { key: 'employeeName', header: 'Employee', className: 'font-semibold text-sm', sortable: true },
            {
              key: 'category',
              header: 'Category',
              render: (val) => <span className="badge badge-neutral text-xs">{val}</span>,
              sortable: true,
            },
            { key: 'description', header: 'Description', className: 'text-sm text-text-secondary max-w-xs truncate' },
            { key: 'date', header: 'Date', className: 'text-xs text-text-secondary', sortable: true },
            {
              key: 'amount',
              header: 'Amount',
              className: 'font-bold text-sm text-text-primary',
              sortable: true,
              render: (val) => `AED ${Number(val).toLocaleString()}`,
            },
            { key: 'status', header: 'Status' },
            {
              key: 'receipt',
              header: 'Receipt',
              render: (val) => (
                <button
                  onClick={() => addToast({ type: 'info', message: 'Downloading receipt preview...' })}
                  className="inline-flex items-center gap-1 text-xs text-text-secondary hover:text-charcoal"
                >
                  <FileText size={13} /> {val || 'receipt.pdf'}
                </button>
              ),
            },
          ]}
          actions={(claim) => (
            claim.status === 'Pending' ? (
              <div className="flex items-center justify-end gap-1.5">
                <button
                  onClick={() => handleApprove(claim.id)}
                  className="btn btn-ghost btn-icon text-success hover:bg-success-soft"
                  title="Approve"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => handleReject(claim.id)}
                  className="btn btn-ghost btn-icon text-danger hover:bg-danger-soft"
                  title="Reject"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <span className="text-xs text-text-secondary font-medium">—</span>
            )
          )}
          sortable
          pagination
          pageSize={8}
          emptyMessage="No expense claims found"
        />
      </div>

      {/* New Claim Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="modal-content max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3 className="text-lg font-semibold">Submit Expense Claim</h3>
                <button onClick={() => setShowModal(false)} className="btn btn-ghost btn-icon">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="modal-body space-y-4">
                <div>
                  <label className="text-xs font-semibold text-text-secondary">Employee Name</label>
                  <input
                    type="text"
                    className="input w-full mt-1"
                    value={formData.employeeName}
                    onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-text-secondary">Category</label>
                  <select
                    className="input w-full mt-1"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Travel">Travel & Lodging</option>
                    <option value="Meals">Client Entertainment & Meals</option>
                    <option value="Office Supplies">Office Supplies & Stationery</option>
                    <option value="Hardware">Tech Hardware & Peripherals</option>
                    <option value="Training">Certifications & Courses</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-text-secondary">Description / Purpose</label>
                  <input
                    type="text"
                    placeholder="e.g. Flight to client site in Abu Dhabi"
                    className="input w-full mt-1"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-text-secondary">Amount (AED)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="input w-full mt-1"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-text-secondary">Date of Expense</label>
                    <input
                      type="date"
                      className="input w-full mt-1"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="modal-footer pt-3">
                  <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-dark">
                    Submit Claim
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Expenses;
