/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – People / Workforce Directory
   Enterprise-grade HR employee management with:
   - Staggered AnimatedTableRow component
   - Full Multi-Section Employee Onboarding Form
   - Purposeful multi-select checkboxes with floating Bulk Actions bar
   - Slide-over Employee Details Profile Drawer
   - Department filtering & instant search
   ══════════════════════════════════════════════════════════════ */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, X, Mail, Phone, MapPin, Check,
  Download, Briefcase, DollarSign, Shield,
  User, ChevronRight, AlertCircle
} from 'lucide-react';
import useStore from '../store/useStore';
import { employees as initialMockEmployees, getInitials, getAvatarColor, departments } from '../data/employees';
import PageTransition from '../components/common/PageTransition';
import DataTable from '../components/common/DataTable';
import PageHeader from '../components/common/PageHeader';

const Employees = ({ initialOpenAdd = false }) => {
  const addToast = useStore((s) => s.addToast);

  // Workforce state initialized with comprehensive mock dataset
  const [employeesList, setEmployeesList] = useState(initialMockEmployees);
  const [activeDept, setActiveDept] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showAddModal, setShowAddModal] = useState(initialOpenAdd);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    if (initialOpenAdd) setShowAddModal(true);
  }, [initialOpenAdd]);

  // Comprehensive Create Form State (Multi-Section / Complete Staff Information)
  const [addStep, setAddStep] = useState('personal'); // 'personal' | 'job' | 'compensation' | 'compliance'
  const [formData, setFormData] = useState({
    // Personal
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '1995-05-15',
    gender: 'Female',
    nationality: 'United Arab Emirates',
    emiratesId: '',
    // Job
    employeeId: `EMP-${Math.floor(100 + Math.random() * 900)}`,
    department: 'Engineering',
    designation: '',
    employmentType: 'Full-time',
    location: 'Dubai HQ',
    joinDate: new Date().toISOString().split('T')[0],
    manager: 'Swafvan Hassan',
    // Compensation
    basicSalary: '16000',
    housingAllowance: '4000',
    transportAllowance: '1500',
    bankName: 'Emirates NBD',
    bankAccount: 'AE12 0260 0012 3456 7890',
    // Compliance & Visa
    visaType: 'Employment Visa',
    visaExpiry: '2028-10-30',
    passportNumber: 'N9876543',
    passportExpiry: '2030-05-20',
    insuranceCategory: 'Gold Comprehensive',
  });

  // Department counts
  const deptCounts = useMemo(() => {
    const counts = { All: employeesList.length };
    departments.forEach((d) => {
      counts[d] = employeesList.filter((e) => e.department === d).length;
    });
    return counts;
  }, [employeesList]);

  // Filtered employees by search and active department
  const filtered = useMemo(() => {
    return employeesList.filter((e) => {
      const q = search.toLowerCase();
      const matchSearch =
        e.name?.toLowerCase().includes(q) ||
        e.designation?.toLowerCase().includes(q) ||
        e.department?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.location?.toLowerCase().includes(q);
      const matchDept = activeDept === 'All' || e.department === activeDept;
      return matchSearch && matchDept;
    });
  }, [employeesList, search, activeDept]);

  // Bulk Selection Handlers
  const isAllSelected = filtered.length > 0 && selectedIds.length === filtered.length;

  const handleToggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((e) => e.id));
    }
  };

  const handleToggleCheck = (id, e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Submit Complete Staff Form
  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.designation) {
      addToast({ type: 'warning', message: 'Please provide at least Name and Designation.' });
      return;
    }

    const fullName = `${formData.firstName} ${formData.lastName}`;
    const totalSalary =
      Number(formData.basicSalary || 0) +
      Number(formData.housingAllowance || 0) +
      Number(formData.transportAllowance || 0);

    const newStaffMember = {
      id: formData.employeeId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: fullName,
      email: formData.email || `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}@novapulse.ae`,
      phone: formData.phone || '+971 50 000 0000',
      department: formData.department,
      designation: formData.designation,
      location: formData.location,
      employmentType: formData.employmentType,
      status: 'New',
      joinDate: formData.joinDate,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      nationality: formData.nationality,
      emiratesId: formData.emiratesId || '784-1995-1234567-1',
      salary: totalSalary,
      basicSalary: formData.basicSalary,
      housingAllowance: formData.housingAllowance,
      transportAllowance: formData.transportAllowance,
      bankName: formData.bankName,
      bankAccount: formData.bankAccount,
      visaType: formData.visaType,
      visaExpiry: formData.visaExpiry,
      passportNumber: formData.passportNumber,
      manager: formData.manager,
      insuranceCategory: formData.insuranceCategory,
    };

    setEmployeesList([newStaffMember, ...employeesList]);
    addToast({
      type: 'success',
      message: `Successfully onboarded ${fullName} to ${formData.department}!`,
    });
    setShowAddModal(false);
    setAddStep('personal');
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '1995-05-15',
      gender: 'Female',
      nationality: 'United Arab Emirates',
      emiratesId: '',
      employeeId: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      department: 'Engineering',
      designation: '',
      employmentType: 'Full-time',
      location: 'Dubai HQ',
      joinDate: new Date().toISOString().split('T')[0],
      manager: 'Swafvan Hassan',
      basicSalary: '16000',
      housingAllowance: '4000',
      transportAllowance: '1500',
      bankName: 'Emirates NBD',
      bankAccount: 'AE12 0260 0012 3456 7890',
      visaType: 'Employment Visa',
      visaExpiry: '2028-10-30',
      passportNumber: 'N9876543',
      passportExpiry: '2030-05-20',
      insuranceCategory: 'Gold Comprehensive',
    });
  };

  // Bulk Action Helpers
  const handleExportSelected = () => {
    addToast({
      type: 'success',
      message: `Exported official workforce census CSV for ${selectedIds.length} members.`,
    });
  };

  const handleBulkEmail = () => {
    addToast({
      type: 'info',
      message: `Drafted company broadcast notification for ${selectedIds.length} recipients.`,
    });
  };

  return (
    <PageTransition className="w-full pt-2">
      {/* ── Top Bar: Title + Search & Primary Action ── */}
      <PageHeader
        title="People"
        subtitle="Workforce Census & Employee Directory"
        badge={`${employeesList.length} Headcount`}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search by name, role, email..."
        className="mb-4"
        actions={
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1C1B18] text-white text-xs font-semibold shadow-xs hover:bg-charcoal-light transition-all cursor-pointer"
          >
            <Plus size={14} />
            <span>Add Member</span>
          </button>
        }
      />

      {/* ── Department Filter Pills ── */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 text-xs no-scrollbar">
        {['All', 'Engineering', 'Design', 'Product', 'Operations', 'Marketing', 'Sales'].map((dept) => {
          const isActive = activeDept === dept;
          const count = deptCounts[dept] || 0;
          return (
            <button
              key={dept}
              onClick={() => setActiveDept(dept)}
              className={`px-3.5 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-[#1C1B18] text-white font-semibold shadow-xs'
                  : 'bg-white text-[#7C786E] border border-border hover:border-[#D4D1C8] hover:text-charcoal'
              }`}
            >
              <span>{dept}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-cream text-text-secondary'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Main Employee Table Card ── */}
      <div className="card p-4 rounded-3xl bg-white border border-border shadow-sm flex flex-col justify-between overflow-hidden relative min-h-140">
        <DataTable
          columns={[
            {
              key: 'name',
              header: 'Employee',
              render: (val, emp) => (
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-2xs"
                    style={{ background: getAvatarColor(emp.name) }}
                  >
                    {getInitials(emp.name)}
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-semibold block text-charcoal truncate">
                      {emp.name}
                    </span>
                    <span className="text-[10px] text-text-secondary font-mono block">
                      {emp.id}
                    </span>
                  </div>
                </div>
              ),
            },
            {
              key: 'designation',
              header: 'Role',
              render: (val, emp) => (
                <span className="font-medium text-charcoal">{emp.designation || emp.role}</span>
              ),
            },
            {
              key: 'department',
              header: 'Department',
              render: (val, emp) => (
                <span className="inline-block px-2 py-0.5 rounded-full bg-[#FAF9F5] border border-border-light text-[10px] font-medium text-charcoal">
                  {emp.department || emp.team}
                </span>
              ),
            },
            {
              key: 'location',
              header: 'Location',
              render: (val) => (
                <span className="flex items-center gap-1 text-[11px] text-[#7C786E]">
                  <MapPin size={11} className="text-text-secondary" />
                  {val}
                </span>
              ),
            },
            {
              key: 'joinDate',
              header: 'Join Date',
              render: (val, emp) => (
                <span className="text-[#7C786E] font-mono text-[11px]">
                  {emp.joinDate || emp.started || 'Mar 2024'}
                </span>
              ),
            },
            {
              key: 'salary',
              header: 'Compensation',
              render: (val, emp) => (
                <span className="text-charcoal font-medium font-mono text-[11px]">
                  AED {Number(emp.salary || 16000).toLocaleString()}/mo
                </span>
              ),
            },
            {
              key: 'status',
              header: 'Status',
              align: 'right',
              render: (val) => (
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                    val === 'New'
                      ? 'bg-[#1C1B18] text-white'
                      : val === 'Active'
                      ? 'bg-[#E6F4EA] text-[#137333]'
                      : 'bg-[#FEF3E6] text-[#B06000]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      val === 'New'
                        ? 'bg-gold'
                        : val === 'Active'
                        ? 'bg-[#137333]'
                        : 'bg-[#B06000]'
                    }`}
                  />
                  {val}
                </span>
              ),
            },
          ]}
          data={filtered}
          sortable
          selectable
          selectedIds={selectedIds}
          onToggleSelect={(id, e) => handleToggleCheck(id, e)}
          onToggleSelectAll={handleToggleSelectAll}
          onRowClick={(emp) => setSelectedEmployee(emp)}
          emptyMessage="No staff members found"
          pagination
          pageSize={10}
        />

        {/* Footer Statistics */}
        <div className="flex items-center justify-between pt-4 border-t border-border-light mt-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] border border-border text-xs font-medium text-charcoal">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span>Showing {filtered.length} of {employeesList.length} staff records</span>
          </div>

          <div className="text-xs text-text-secondary flex items-center gap-2">
            <span>Tip: Click on any employee row to inspect their complete profile dossier.</span>
          </div>
        </div>

        {/* ── Floating Bulk Actions Bar (Triggered when >= 1 row selected) ── */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 450, damping: 30 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#1C1B18] text-white px-5 py-2.5 rounded-full shadow-2xl border border-white/10 flex items-center gap-4 text-xs font-medium"
            >
              <div className="flex items-center gap-2 pr-2 border-r border-white/20">
                <span className="w-5 h-5 rounded-full bg-gold text-charcoal font-bold text-[10px] flex items-center justify-center">
                  {selectedIds.length}
                </span>
                <span>Selected</span>
              </div>

              <button
                onClick={handleExportSelected}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Download size={13} />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handleBulkEmail}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Mail size={13} />
                <span>Broadcast</span>
              </button>

              <button
                onClick={() => setSelectedIds([])}
                className="text-[#D4D1C8] hover:text-white transition-colors cursor-pointer text-[11px]"
              >
                Deselect All
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          EMPLOYEE DETAILS SLIDE-OVER DRAWER (Inspect Complete Dossier)
          ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedEmployee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex justify-end"
            onClick={() => setSelectedEmployee(null)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 350 }}
              className="w-full max-w-lg bg-[#FAF9F5] h-full shadow-2xl border-l border-border flex flex-col justify-between overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-border bg-white sticky top-0 z-10 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm shrink-0"
                    style={{ background: getAvatarColor(selectedEmployee.name) }}
                  >
                    {getInitials(selectedEmployee.name)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-charcoal leading-tight">
                      {selectedEmployee.name}
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">
                      {selectedEmployee.designation || selectedEmployee.role} • <span className="font-mono">{selectedEmployee.id}</span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="w-8 h-8 rounded-full bg-[#FAF9F5] border border-border flex items-center justify-center text-charcoal hover:bg-border transition-all cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Drawer Body: Complete Staff Information Cards */}
              <div className="p-6 space-y-4 text-xs">
                {/* Employment Status Badge Bar */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-border">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#137333]" />
                    <span className="font-semibold text-charcoal">Employment Status</span>
                  </div>
                  <span className="badge badge-success text-[10px] uppercase font-bold">
                    {selectedEmployee.status || 'Active'}
                  </span>
                </div>

                {/* Section A: Job & Organization */}
                <div className="card p-4 rounded-2xl bg-white border border-border space-y-2.5 shadow-2xs">
                  <h4 className="text-xs font-bold text-charcoal flex items-center gap-1.5 pb-1 border-b border-border-light">
                    <Briefcase size={13} className="text-text-secondary" />
                    <span>Job & Organization</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-text-secondary block">Department</span>
                      <span className="font-medium text-charcoal">{selectedEmployee.department || selectedEmployee.team}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Work Location</span>
                      <span className="font-medium text-charcoal">{selectedEmployee.location}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Join Date</span>
                      <span className="font-medium text-charcoal font-mono">{selectedEmployee.joinDate || selectedEmployee.started}</span>
                    </div>
                    <div>
                      <span className="text-text-secondary block">Reporting Line</span>
                      <span className="font-medium text-charcoal">{selectedEmployee.manager || 'Swafvan Hassan'}</span>
                    </div>
                  </div>
                </div>

                {/* Section B: Contact & Personal Details */}
                <div className="card p-4 rounded-2xl bg-white border border-border space-y-2.5 shadow-2xs">
                  <h4 className="text-xs font-bold text-charcoal flex items-center gap-1.5 pb-1 border-b border-border-light">
                    <User size={13} className="text-text-secondary" />
                    <span>Contact & Personal Details</span>
                  </h4>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary flex items-center gap-1">
                        <Mail size={11} /> Work Email
                      </span>
                      <span className="font-medium text-charcoal font-mono">{selectedEmployee.email}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary flex items-center gap-1">
                        <Phone size={11} /> Phone
                      </span>
                      <span className="font-medium text-charcoal font-mono">{selectedEmployee.phone}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Nationality</span>
                      <span className="font-medium text-charcoal">{selectedEmployee.nationality || 'United Arab Emirates'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Emirates ID</span>
                      <span className="font-medium text-charcoal font-mono">{selectedEmployee.emiratesId || '784-1994-1234567-1'}</span>
                    </div>
                  </div>
                </div>

                {/* Section C: Compensation & Banking */}
                <div className="card p-4 rounded-2xl bg-white border border-border space-y-2.5 shadow-2xs">
                  <h4 className="text-xs font-bold text-charcoal flex items-center gap-1.5 pb-1 border-b border-border-light">
                    <DollarSign size={13} className="text-text-secondary" />
                    <span>Compensation & Payroll</span>
                  </h4>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Total Monthly Package</span>
                      <span className="font-bold text-sm text-charcoal font-mono">
                        AED {Number(selectedEmployee.salary || 16000).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Salary Payment Channel</span>
                      <span className="font-medium text-[#137333]">WPS Direct Bank Deposit</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Bank Name</span>
                      <span className="font-medium text-charcoal">{selectedEmployee.bankName || 'Emirates NBD'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">IBAN Account</span>
                      <span className="font-mono text-[10px] text-charcoal">{selectedEmployee.bankAccount || 'AE12 0260 0012 3456 7890'}</span>
                    </div>
                  </div>
                </div>

                {/* Section D: Visa & Immigration Compliance */}
                <div className="card p-4 rounded-2xl bg-white border border-border space-y-2.5 shadow-2xs">
                  <h4 className="text-xs font-bold text-charcoal flex items-center gap-1.5 pb-1 border-b border-border-light">
                    <Shield size={13} className="text-text-secondary" />
                    <span>Visa & Compliance (MOHRE)</span>
                  </h4>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Visa Category</span>
                      <span className="font-semibold text-charcoal">{selectedEmployee.visaType || 'Employment Visa'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Visa Expiration</span>
                      <span className="font-mono text-charcoal">{selectedEmployee.visaExpiry || '2028-10-30'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-text-secondary">Passport Number</span>
                      <span className="font-mono text-charcoal">{selectedEmployee.passportNumber || 'N9876543'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 bg-white border-t border-border flex items-center justify-between gap-3 sticky bottom-0">
                <button
                  onClick={() => {
                    addToast({ type: 'info', message: `Exporting dossier PDF for ${selectedEmployee.name}...` });
                  }}
                  className="btn btn-secondary flex-1 text-xs"
                >
                  <Download size={13} />
                  <span>Download Dossier</span>
                </button>
                <button
                  onClick={() => {
                    addToast({ type: 'success', message: `Updated credentials for ${selectedEmployee.name}.` });
                    setSelectedEmployee(null);
                  }}
                  className="btn btn-dark flex-1 text-xs"
                >
                  Edit Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════════════════════════
          COMPREHENSIVE CREATE EMPLOYEE MODAL (Full Staff Information)
          ══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 28, stiffness: 400 }}
              className="bg-white rounded-3xl border border-border shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-5 border-b border-border bg-[#FAF9F5] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-charcoal">Onboard New Employee</h3>
                  <p className="text-xs text-text-secondary">Complete staff records for payroll, visa & internal directory</p>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-charcoal hover:bg-[#FAF9F5] cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Form Navigation Tabs */}
              <div className="flex border-b border-border bg-white px-5 pt-3 gap-3 text-xs overflow-x-auto no-scrollbar">
                {[
                  { key: 'personal', label: '1. Personal Info', icon: User },
                  { key: 'job', label: '2. Job & Team', icon: Briefcase },
                  { key: 'compensation', label: '3. Compensation', icon: DollarSign },
                  { key: 'compliance', label: '4. Visa & Compliance', icon: Shield },
                ].map((step) => {
                  const Icon = step.icon;
                  const isCurrent = addStep === step.key;
                  return (
                    <button
                      key={step.key}
                      type="button"
                      onClick={() => setAddStep(step.key)}
                      className={`pb-3 border-b-2 font-medium flex items-center gap-1.5 cursor-pointer transition-all whitespace-nowrap ${
                        isCurrent
                          ? 'border-[#1C1B18] text-[#1C1B18] font-bold'
                          : 'border-transparent text-text-secondary hover:text-charcoal'
                      }`}
                    >
                      <Icon size={13} />
                      <span>{step.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Form Content Body */}
              <form onSubmit={handleAddSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
                {/* ── STEP 1: Personal Details ── */}
                {addStep === 'personal' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">First Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex"
                          className="input text-xs w-full"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Last Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Morgan"
                          className="input text-xs w-full"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Work Email</label>
                        <input
                          type="email"
                          placeholder="alex.morgan@novapulse.ae"
                          className="input text-xs w-full"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+971 50 123 4567"
                          className="input text-xs w-full"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Date of Birth</label>
                        <input
                          type="date"
                          className="input text-xs w-full"
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Gender</label>
                        <select
                          className="input text-xs w-full"
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        >
                          <option value="Female">Female</option>
                          <option value="Male">Male</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Nationality</label>
                        <input
                          type="text"
                          placeholder="e.g. UAE / UK / Canada"
                          className="input text-xs w-full"
                          value={formData.nationality}
                          onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-text-secondary block mb-1">Emirates ID / National ID Number</label>
                      <input
                        type="text"
                        placeholder="784-1995-1234567-1"
                        className="input text-xs w-full font-mono"
                        value={formData.emiratesId}
                        onChange={(e) => setFormData({ ...formData, emiratesId: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* ── STEP 2: Job & Organization ── */}
                {addStep === 'job' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Employee ID Code</label>
                        <input
                          type="text"
                          readOnly
                          className="input text-xs w-full font-mono bg-[#FAF9F5]"
                          value={formData.employeeId}
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Department *</label>
                        <select
                          className="input text-xs w-full"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        >
                          {departments.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-text-secondary block mb-1">Designation / Role Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Senior Frontend Engineer"
                        className="input text-xs w-full"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Employment Type</label>
                        <select
                          className="input text-xs w-full"
                          value={formData.employmentType}
                          onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Probation">Probation (3mo)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Work Location</label>
                        <input
                          type="text"
                          placeholder="Dubai HQ / Remote"
                          className="input text-xs w-full"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Join Date</label>
                        <input
                          type="date"
                          className="input text-xs w-full"
                          value={formData.joinDate}
                          onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-text-secondary block mb-1">Reporting Manager</label>
                      <input
                        type="text"
                        placeholder="e.g. Swafvan Nwosu"
                        className="input text-xs w-full"
                        value={formData.manager}
                        onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {/* ── STEP 3: Compensation & Payroll ── */}
                {addStep === 'compensation' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Basic Salary (AED)</label>
                        <input
                          type="number"
                          placeholder="16000"
                          className="input text-xs w-full font-mono"
                          value={formData.basicSalary}
                          onChange={(e) => setFormData({ ...formData, basicSalary: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Housing Allowance</label>
                        <input
                          type="number"
                          placeholder="4000"
                          className="input text-xs w-full font-mono"
                          value={formData.housingAllowance}
                          onChange={(e) => setFormData({ ...formData, housingAllowance: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Transport Allowance</label>
                        <input
                          type="number"
                          placeholder="1500"
                          className="input text-xs w-full font-mono"
                          value={formData.transportAllowance}
                          onChange={(e) => setFormData({ ...formData, transportAllowance: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Total Package Callout */}
                    <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-border-light flex items-center justify-between">
                      <span className="font-semibold text-xs text-charcoal">Total Monthly Gross Package</span>
                      <span className="font-bold text-base text-charcoal font-mono">
                        AED {(Number(formData.basicSalary || 0) + Number(formData.housingAllowance || 0) + Number(formData.transportAllowance || 0)).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">WPS Bank Name</label>
                        <select
                          className="input text-xs w-full"
                          value={formData.bankName}
                          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                        >
                          <option value="Emirates NBD">Emirates NBD</option>
                          <option value="First Abu Dhabi Bank (FAB)">First Abu Dhabi Bank (FAB)</option>
                          <option value="Abu Dhabi Commercial Bank (ADCB)">Abu Dhabi Commercial Bank (ADCB)</option>
                          <option value="Mashreq Bank">Mashreq Bank</option>
                          <option value="Dubai Islamic Bank">Dubai Islamic Bank</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">IBAN Account Number</label>
                        <input
                          type="text"
                          placeholder="AE12 0260 0012 3456 7890"
                          className="input text-xs w-full font-mono"
                          value={formData.bankAccount}
                          onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: Visa & Compliance ── */}
                {addStep === 'compliance' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Visa Category (UAE / MOHRE)</label>
                        <select
                          className="input text-xs w-full"
                          value={formData.visaType}
                          onChange={(e) => setFormData({ ...formData, visaType: e.target.value })}
                        >
                          <option value="Employment Visa">Employment Visa (2 Years)</option>
                          <option value="Golden Visa">UAE Golden Visa (10 Years)</option>
                          <option value="Green Visa">UAE Green Visa (5 Years)</option>
                          <option value="GCC Citizen">GCC Citizen / National</option>
                          <option value="Remote Work Visa">Virtual Working / Remote Visa</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Visa Expiration Date</label>
                        <input
                          type="date"
                          className="input text-xs w-full"
                          value={formData.visaExpiry}
                          onChange={(e) => setFormData({ ...formData, visaExpiry: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Passport Number</label>
                        <input
                          type="text"
                          placeholder="N9876543"
                          className="input text-xs w-full font-mono"
                          value={formData.passportNumber}
                          onChange={(e) => setFormData({ ...formData, passportNumber: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-text-secondary block mb-1">Medical Insurance Category</label>
                        <select
                          className="input text-xs w-full"
                          value={formData.insuranceCategory}
                          onChange={(e) => setFormData({ ...formData, insuranceCategory: e.target.value })}
                        >
                          <option value="Gold Comprehensive">Gold Comprehensive (Zero Co-pay)</option>
                          <option value="Executive Tier">Executive Tier</option>
                          <option value="Standard MOHRE Basic">Standard MOHRE Basic</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal Footer Controls */}
                <div className="pt-4 border-t border-border flex items-center justify-between">
                  {addStep !== 'personal' ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (addStep === 'job') setAddStep('personal');
                        if (addStep === 'compensation') setAddStep('job');
                        if (addStep === 'compliance') setAddStep('compensation');
                      }}
                      className="btn btn-secondary text-xs"
                    >
                      ← Back
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="btn btn-secondary text-xs"
                    >
                      Cancel
                    </button>
                  )}

                  {addStep !== 'compliance' ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (addStep === 'personal') setAddStep('job');
                        if (addStep === 'job') setAddStep('compensation');
                        if (addStep === 'compensation') setAddStep('compliance');
                      }}
                      className="btn btn-dark text-xs"
                    >
                      <span>Next Step</span>
                      <ChevronRight size={13} />
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-dark text-xs bg-[#1C1B18] text-white">
                      <span>Complete & Onboard</span>
                      <Check size={13} />
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Employees;
