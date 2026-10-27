/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Employee Self-Service (ESS)
   ══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User, Calendar, CreditCard, FileText, Download,
  Clock, Shield, ArrowUpRight, Laptop, Award, Send
} from 'lucide-react';
import useStore from '../store/useStore';
import { getInitials, getAvatarColor } from '../data/employees';
import PageTransition from '../components/common/PageTransition';
import DataTable from '../components/common/DataTable';
import PageHeader from '../components/common/PageHeader';

const SelfService = () => {
  const addToast = useStore((s) => s.addToast);
  const employees = useStore((s) => s.employees);
  const currentUser = employees[0] || {
    name: 'Daniel Okonkwo',
    designation: 'Head of Engineering',
    department: 'Engineering',
    email: 'daniel.o@novapulse.io',
    phone: '+971 50 123 4567',
    salary: 42000,
    joinDate: '2023-01-15',
  };

  return (
    <PageTransition className="p-6">
      {/* Header */}
      <PageHeader
        title="Employee Self-Service"
        subtitle="My profile, personal records, payslip downloads, and self-service requests"
        actions={
          <button
            onClick={() => addToast({ type: 'success', message: 'Salary certificate requested. Check your email.' })}
            className="btn btn-secondary text-xs"
          >
            <Send size={13} /> Request Salary Letter
          </button>
        }
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Left Profile Card */}
        <div className="col-span-12 lg:col-span-4 space-y-4">
          <div className="card p-6 text-center">
            <div
              className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-white shadow-md mb-4"
              style={{ background: getAvatarColor(currentUser.name) }}
            >
              {getInitials(currentUser.name)}
            </div>
            <h2 className="text-xl font-bold text-text-primary">{currentUser.name}</h2>
            <p className="text-sm text-text-secondary mt-0.5">{currentUser.designation}</p>
            <span className="badge badge-gold mt-2 font-bold text-xs">
              {currentUser.department}
            </span>

            <div className="mt-6 pt-6 border-t border-border-light text-left space-y-3">
              <div>
                <p className="text-[11px] text-text-secondary uppercase font-semibold">Email Address</p>
                <p className="text-sm font-medium text-text-primary">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-[11px] text-text-secondary uppercase font-semibold">Phone Contact</p>
                <p className="text-sm font-medium text-text-primary">{currentUser.phone}</p>
              </div>
              <div>
                <p className="text-[11px] text-text-secondary uppercase font-semibold">Joined Company</p>
                <p className="text-sm font-medium text-text-primary">{currentUser.joinDate}</p>
              </div>
              <div>
                <p className="text-[11px] text-text-secondary uppercase font-semibold">Monthly Basic + Allowances</p>
                <p className="text-base font-bold text-text-primary">AED {Number(currentUser.salary).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Assigned Devices */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Laptop size={16} /> My Assigned Hardware
            </h3>
            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-ivory border border-border flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-text-primary">MacBook Pro 16" M3 Max</p>
                  <p className="text-[10px] text-text-secondary">SN: C02G78K1MD6R · Issued Jan 2024</p>
                </div>
                <span className="badge badge-success text-[10px]">Verified</span>
              </div>
              <div className="p-3 rounded-xl bg-ivory border border-border flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-text-primary">YubiKey 5C NFC Security Key</p>
                  <p className="text-[10px] text-text-secondary">Hardware Token 2FA</p>
                </div>
                <span className="badge badge-success text-[10px]">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Main Column */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Quick Leave Quotas */}
          <div className="card p-5">
            <h3 className="text-sm font-semibold mb-4">My Leave Allowances (2026)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-3 rounded-xl bg-ivory border border-border">
                <p className="text-[11px] text-text-secondary font-semibold">Annual Leave</p>
                <p className="text-2xl font-bold text-text-primary mt-1">22 / 30</p>
                <p className="text-[10px] text-success font-medium">8 days used</p>
              </div>
              <div className="p-3 rounded-xl bg-ivory border border-border">
                <p className="text-[11px] text-text-secondary font-semibold">Sick Leave</p>
                <p className="text-2xl font-bold text-text-primary mt-1">10 / 12</p>
                <p className="text-[10px] text-text-secondary">2 days used</p>
              </div>
              <div className="p-3 rounded-xl bg-ivory border border-border">
                <p className="text-[11px] text-text-secondary font-semibold">Remote Days</p>
                <p className="text-2xl font-bold text-text-primary mt-1">4 / 4</p>
                <p className="text-[10px] text-success font-medium">Remaining this month</p>
              </div>
              <div className="p-3 rounded-xl bg-ivory border border-border">
                <p className="text-[11px] text-text-secondary font-semibold">Public Holidays</p>
                <p className="text-2xl font-bold text-text-primary mt-1">14</p>
                <p className="text-[10px] text-text-secondary">Official UAE holidays</p>
              </div>
            </div>
          </div>

          {/* Payslips Archive */}
          <div className="card p-0 overflow-hidden">
            <div className="p-4 border-b border-border-light flex items-center justify-between">
              <h3 className="text-sm font-semibold">My Payslips</h3>
              <span className="text-xs text-text-secondary">Last 3 Pay Cycles</span>
            </div>
            <DataTable
              data={[
                { period: 'October 2026', date: 'Oct 28, 2026', gross: '42,000', net: '42,000', status: 'Processing' },
                { period: 'September 2026', date: 'Sep 28, 2026', gross: '42,000', net: '42,000', status: 'Paid via WPS' },
                { period: 'August 2026', date: 'Aug 28, 2026', gross: '42,000', net: '42,000', status: 'Paid via WPS' },
              ]}
              columns={[
                { key: 'period', header: 'Pay Period', className: 'font-semibold text-sm', sortable: true },
                { key: 'date', header: 'Payment Date', className: 'text-xs text-text-secondary' },
                { key: 'gross', header: 'Gross Salary', className: 'text-sm font-medium', render: (val) => `AED ${val}` },
                { key: 'net', header: 'Net Disbursed', className: 'text-sm font-bold text-text-primary', render: (val) => `AED ${val}` },
                { key: 'status', header: 'Status' },
              ]}
              actions={(slip) => (
                <button
                  onClick={() => addToast({ type: 'success', message: `Downloading payslip for ${slip.period}` })}
                  className="btn btn-ghost btn-icon"
                  title="Download PDF"
                >
                  <Download size={15} />
                </button>
              )}
            />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default SelfService;
