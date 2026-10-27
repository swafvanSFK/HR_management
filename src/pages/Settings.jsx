/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – System Settings & Configuration
   ══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building, Clock, Shield, Bell, CreditCard,
  Save, CheckCircle2, Sliders, Globe, Lock
} from 'lucide-react';
import useStore from '../store/useStore';
import PageTransition from '../components/common/PageTransition';
import PageHeader from '../components/common/PageHeader';

const Settings = () => {
  const addToast = useStore((s) => s.addToast);
  const [activeTab, setActiveTab] = useState('company');
  const [companyData, setCompanyData] = useState({
    companyName: 'NovaPulse Technologies FZ-LLC',
    licenseNo: 'FZ-2024-99812',
    taxId: '100-8829-4410-003',
    country: 'United Arab Emirates',
    currency: 'AED (United Arab Emirates Dirham)',
    timezone: 'Asia/Dubai (UTC+04:00)',
    workWeek: 'Monday – Friday',
    standardHours: '9.0',
    payrollCutoff: '25th of every month',
  });

  const handleSave = (e) => {
    e.preventDefault();
    addToast({ type: 'success', message: 'Organization settings updated successfully!' });
  };

  return (
    <PageTransition className="p-6">
      {/* Header */}
      <PageHeader
        title="Settings & Policies"
        subtitle="Configure company profiles, UAE compliance rules, shifts, and access roles"
        actions={
          <button onClick={handleSave} className="btn btn-dark">
            <Save size={14} /> Save Changes
          </button>
        }
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <div className="col-span-12 md:col-span-3 space-y-1">
          <div className="card p-2">
            {[
              { id: 'company', label: 'Company Profile', icon: Building },
              { id: 'work', label: 'Work Shifts & Calendar', icon: Clock },
              { id: 'payroll', label: 'WPS & Payroll Rules', icon: CreditCard },
              { id: 'security', label: 'Roles & Permissions', icon: Shield },
              { id: 'notifications', label: 'Alerts & Reminders', icon: Bell },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-charcoal text-white'
                      : 'text-text-primary hover:bg-cream'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Panel */}
        <div className="col-span-12 md:col-span-9">
          <div className="card p-6">
            {activeTab === 'company' && (
              <form onSubmit={handleSave} className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-text-primary">Organization Identity</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Official company credentials registered with legal authorities</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-text-secondary">Legal Entity Name</label>
                    <input
                      type="text"
                      className="input w-full mt-1 font-medium"
                      value={companyData.companyName}
                      onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-text-secondary">Trade License / Registration</label>
                    <input
                      type="text"
                      className="input w-full mt-1 font-medium"
                      value={companyData.licenseNo}
                      onChange={(e) => setCompanyData({ ...companyData, licenseNo: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-text-secondary">UAE TRN / Tax ID</label>
                    <input
                      type="text"
                      className="input w-full mt-1 font-medium"
                      value={companyData.taxId}
                      onChange={(e) => setCompanyData({ ...companyData, taxId: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-text-secondary">Jurisdiction & Country</label>
                    <input
                      type="text"
                      className="input w-full mt-1 font-medium"
                      value={companyData.country}
                      onChange={(e) => setCompanyData({ ...companyData, country: e.target.value })}
                    />
                  </div>
                </div>

                <div className="border-t border-border-light pt-6">
                  <h3 className="text-base font-semibold text-text-primary">Locale & Currency Defaults</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="text-xs font-semibold text-text-secondary">Operating Currency</label>
                      <input
                        type="text"
                        disabled
                        className="input w-full mt-1 bg-ivory cursor-not-allowed text-text-secondary"
                        value={companyData.currency}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-text-secondary">Default Timezone</label>
                      <input
                        type="text"
                        disabled
                        className="input w-full mt-1 bg-ivory cursor-not-allowed text-text-secondary"
                        value={companyData.timezone}
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'work' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-text-primary">Working Schedule</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Set daily work shifts, core hours, and attendance tolerance</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-text-secondary">Standard Work Week</label>
                    <input
                      type="text"
                      className="input w-full mt-1"
                      value={companyData.workWeek}
                      onChange={(e) => setCompanyData({ ...companyData, workWeek: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-text-secondary">Required Hours / Day</label>
                    <input
                      type="text"
                      className="input w-full mt-1"
                      value={companyData.standardHours}
                      onChange={(e) => setCompanyData({ ...companyData, standardHours: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payroll' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-semibold text-text-primary">WPS & Salary Disbursal</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Compliant with UAE Ministry of Human Resources & Emiratisation (MOHRE)</p>
                </div>

                <div className="p-4 rounded-xl bg-gold-pale/50 border border-gold/40 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-charcoal">
                    <CreditCard size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-charcoal">WPS SIF File Generator Active</p>
                    <p className="text-[11px] text-text-secondary">Outputs 14-column approved Wage Protection System batch files</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-semibold text-text-primary">RBAC Roles & Privileges</h3>
                  <p className="text-xs text-text-secondary mt-0.5">Define role permissions for HR Executives, Managers, and Employees</p>
                </div>
                <div className="space-y-2">
                  {['Super Administrator', 'HR Business Partner', 'Department Line Manager', 'Staff Self-Service'].map((role) => (
                    <div key={role} className="flex items-center justify-between p-3 rounded-xl bg-ivory border border-border">
                      <span className="text-sm font-semibold">{role}</span>
                      <span className="badge badge-gold text-xs">Active</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-text-primary">System Alerts</h3>
                <div className="space-y-3">
                  {[
                    'Notify on Leave Request Submission',
                    'Alert 30 Days Before Visa / Passport Expiry',
                    'Send Automated Monthly Payslip Emails',
                    'Daily Late Arrival Digest to Line Managers',
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-ivory border border-border cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-gold" />
                      <span className="text-sm font-medium text-text-primary">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Settings;
