/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Generic Module View
   Provides rich interactive dashboards for specialized HR modules:
   Visa, Requests, Assets, Insurance, Accommodation, Loans, Reports
   ══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { Download, Plus, Search } from 'lucide-react';
import useStore from '../store/useStore';
import PageTransition from '../components/common/PageTransition';
import DataTable from '../components/common/DataTable';
import PageHeader from '../components/common/PageHeader';
import { MotionCount } from '../components/animations';

const parseStatValue = (val) => {
  if (typeof val === 'number') {
    return { numeric: val, prefix: '', suffix: '', decimals: 0, isNumeric: true };
  }
  if (!val || typeof val !== 'string') {
    return { numeric: 0, prefix: '', suffix: String(val || ''), decimals: 0, isNumeric: false };
  }
  const match = val.match(/^([^\d.-]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { numeric: 0, prefix: '', suffix: val, decimals: 0, isNumeric: false };
  }
  const prefix = match[1];
  const numStr = match[2].replace(/,/g, '');
  const suffix = match[3];
  const numeric = parseFloat(numStr);
  const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;
  return { numeric, prefix, suffix, decimals, isNumeric: !isNaN(numeric) };
};

const moduleData = {
  visa: {
    stats: [
      { label: 'Active Visas', value: '48', change: 4 },
      { label: 'Pending Renewals', value: '4', change: -2 },
      { label: 'Labor Cards Valid', value: '51', change: 0 },
      { label: 'Visa Quota Remaining', value: '14', change: 0 },
    ],
    items: [
      { col1: 'Daniel Okonkwo', col2: 'Partner / Investor Visa', col3: 'Dubai GDRFA', col4: 'Jan 14, 2027', col5: 'Valid' },
      { col1: 'Lena Park', col2: 'Employment Residence Visa', col3: 'MOHRE Dubai', col4: 'Mar 01, 2027', col5: 'Valid' },
      { col1: 'Sofia Marin', col2: 'Green Visa (Freelance/Skill)', col3: 'Abu Dhabi ICP', col4: 'Nov 12, 2026', col5: 'Expiring Soon' },
      { col1: 'Kai Tanaka', col2: 'Employment Residence Visa', col3: 'Dubai GDRFA', col4: 'Oct 05, 2026', col5: 'In Renewal' },
      { col1: 'Omar Haddad', col2: 'Golden Visa (Tech Specialist)', col3: 'Federal ICP', col4: 'Sep 20, 2033', col5: 'Valid' },
    ],
    headers: ['Employee', 'Visa Category', 'Issuing Authority', 'Valid Until', 'Status'],
  },
  requests: {
    stats: [
      { label: 'Pending Requests', value: '7', change: -12 },
      { label: 'Approved This Week', value: '19', change: 8 },
      { label: 'NOC Certificates', value: '11', change: 3 },
      { label: 'Avg. Turnaround', value: '1.2d', change: -15 },
    ],
    items: [
      { col1: 'Salary Transfer Certificate', col2: 'Daniel Okonkwo', col3: 'Banking & Mortgage', col4: 'Today, 09:20 AM', col5: 'Approved' },
      { col1: 'Embassy NOC (Schengen Visa)', col2: 'Lena Park', col3: 'Travel Approval', col4: 'Yesterday', col5: 'Pending' },
      { col1: 'Experience Certificate', col2: 'Marcus Chen', col3: 'Formal Credential', col4: 'Oct 20, 2026', col5: 'Approved' },
      { col1: 'Driving License NOC', col2: 'Priya Sharma', col3: 'RTA Licensing', col4: 'Oct 18, 2026', col5: 'Pending' },
    ],
    headers: ['Request Type', 'Employee', 'Purpose', 'Submitted', 'Status'],
  },
  assets: {
    stats: [
      { label: 'Total Assigned Assets', value: '142', change: 6 },
      { label: 'Laptops in Fleet', value: '54', change: 0 },
      { label: 'In Inventory / Spare', value: '18', change: 0 },
      { label: 'Maintenance Requests', value: '2', change: -50 },
    ],
    items: [
      { col1: 'Acer Laptop NG6733', col2: 'John Hampton', col3: '507054689133', col4: '05.09.2023', col5: 'Returned' },
      { col1: 'Apple MacBook Pro 16" M3', col2: 'Daniel Okonkwo', col3: '53554666544', col4: '12.03.2024', col5: 'Deployed' },
      { col1: 'Apple iPhone 14 Pro', col2: 'Daisy Ruiz', col3: '41689726345', col4: '22.03.2024', col5: 'Deployed' },
      { col1: 'Dell UltraSharp 32" 4K', col2: 'Sofia Marin', col3: '55102938112', col4: '15.01.2024', col5: 'Deployed' },
      { col1: 'YubiKey 5C NFC Token', col2: 'Kai Tanaka', col3: 'SEC-99120811', col4: '10.02.2024', col5: 'Active' },
    ],
    headers: ['Asset Description', 'Assigned Staff', 'Serial / Tag No', 'Allocation Date', 'Status'],
  },
  insurance: {
    stats: [
      { label: 'Total Staff Eligible', value: '1,250', change: 0 },
      { label: 'Employees Insured', value: '1,000', change: 4 },
      { label: 'Pending Enrollment', value: '250', change: -8 },
      { label: 'Claims Settled (Oct)', value: 'AED 38.4k', change: 5 },
    ],
    items: [
      { col1: 'Aliev Imrakh', col2: 'General Network (Daman)', col3: '485902rf033', col4: '12.10.2026', col5: 'Active' },
      { col1: 'Daniel Okonkwo + 2 Deps', col2: 'Enhanced Global Tier 1', col3: '591024ax912', col4: '31.12.2026', col5: 'Active' },
      { col1: 'Linda Parker', col2: 'General Network (Daman)', col3: '382910kp441', col4: '15.08.2026', col5: 'Active' },
      { col1: 'Sofia Marin', col2: 'Standard Care Tier 2', col3: '331094bv001', col4: '31.12.2026', col5: 'Active' },
      { col1: 'Kai Tanaka', col2: 'Enhanced Global Tier 1', col3: '992104kl882', col4: '31.12.2026', col5: 'Active' },
    ],
    headers: ['Employee Name', 'Coverage Network', 'Insurance / Policy No', 'Expiry Date', 'Status'],
  },
  accommodation: {
    stats: [
      { label: 'Managed Units', value: '12', change: 0 },
      { label: 'Occupancy Rate', value: '92%', change: 0 },
      { label: 'Monthly Cost (AED)', value: '145k', change: 2 },
      { label: 'Available Beds', value: '27', change: -4 },
    ],
    items: [
      { col1: 'Block A 101', col2: 'Apartment', col3: 'Clay Global', col4: '20 Rooms (20 Sharing)', col5: '17 Unoccupied' },
      { col1: 'Alberts Home B-1', col2: 'Villa', col3: 'Clay Global', col4: '5 Rooms (5 Sharing)', col5: '5 Unoccupied' },
      { col1: 'Dubai Villa A-1', col2: 'Villa', col3: 'Clay Global', col4: '5 Rooms (5 Sharing)', col5: '5 Unoccupied' },
      { col1: 'Executive Marina #1402', col2: 'Apartment', col3: 'NovaPulse FZ', col4: '12 Rooms', col5: '2 Unoccupied' },
    ],
    headers: ['Accommodation Name', 'Type', 'Entity / Company', 'Total Rooms & Spaces', 'Availability'],
  },
  loans: {
    stats: [
      { label: 'Active Advances', value: '6', change: -1 },
      { label: 'Total Disbursed', value: 'AED 65,000', change: 0 },
      { label: 'Recovered via Payroll', value: 'AED 24,000', change: 12 },
      { label: 'Default / Arrears', value: '0.0%', change: 0 },
    ],
    items: [
      { col1: 'Emergency Salary Advance', col2: 'Ines Duarte', col3: 'AED 10,000', col4: '3 of 6 months', col5: 'Active' },
      { col1: 'Annual Housing Advance', col2: 'Lucas Weber', col3: 'AED 25,000', col4: '8 of 12 months', col5: 'Active' },
      { col1: 'Travel & Relocation Loan', col2: 'Fatima Al-Zahra', col3: 'AED 15,000', col4: 'Paid in Full', col5: 'Settled' },
    ],
    headers: ['Loan Scheme', 'Beneficiary', 'Principal Amount', 'Deduction Plan', 'Status'],
  },
  reports: {
    stats: [
      { label: 'Monthly Payroll Run', value: 'AED 1.48M', change: 3.2 },
      { label: 'Annual Turnover Rate', value: '4.1%', change: -1.2 },
      { label: 'National Diversity', value: '18 Countries', change: 2 },
      { label: 'Average Tenure', value: '3.4 Years', change: 0.5 },
    ],
    items: [
      { col1: 'Monthly WPS Salary Disbursal Audit (Oct 2026)', col2: 'Payroll & Compliance', col3: 'Full Staff (51 emps)', col4: 'Generated Oct 24', col5: 'Ready' },
      { col1: 'Annual Employee Headcount & Growth Projection', col2: 'HR Leadership', col3: 'All Departments', col4: 'Generated Oct 20', col5: 'Ready' },
      { col1: 'Leave Liability & Accrual Financial Provision', col2: 'Finance & Accounts', col3: 'Accrual Balance', col4: 'Generated Oct 15', col5: 'Ready' },
    ],
    headers: ['Report Title', 'Category', 'Target Scope', 'Last Generated', 'Status'],
  },
};

const GenericModule = ({ moduleId, title, subtitle }) => {
  const addToast = useStore((s) => s.addToast);
  const [search, setSearch] = useState('');
  const data = moduleData[moduleId] || moduleData.visa;

  const filteredItems = data.items.filter((item) =>
    Object.values(item).some((val) =>
      val.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <PageTransition className="pt-2 pb-6">
      {/* Page Header with Integrated Search & Actions */}
      <PageHeader
        title={title}
        subtitle={subtitle}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search records..."
        actions={
          <>
            <button
              onClick={() => addToast({ type: 'success', message: `Exporting ${title} report...` })}
              className="btn btn-secondary text-xs"
            >
              <Download size={14} /> Export
            </button>
            <button
              onClick={() => addToast({ type: 'info', message: `Creating new record for ${title}` })}
              className="btn btn-dark text-xs"
            >
              <Plus size={14} /> Add Record
            </button>
          </>
        }
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {data.stats.map((stat, i) => {
          const parsed = parseStatValue(stat.value);

          return (
            <div key={i} className="card p-4">
              <div className="stat-value">
                {parsed.isNumeric ? (
                  <MotionCount
                    to={parsed.numeric}
                    prefix={parsed.prefix}
                    suffix={parsed.suffix}
                    decimals={parsed.decimals}
                    duration={1.0}
                  />
                ) : (
                  stat.value
                )}
              </div>
              <div className="stat-label">{stat.label}</div>
              {stat.change !== 0 && (
                <div className={`text-[11px] font-semibold mt-1 ${
                  stat.change > 0 ? 'text-success' : 'text-danger'
                }`}>
                  {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}% vs last month
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main Table Card */}
      <div className="card p-0 overflow-hidden">
        <div className="p-4 border-b border-border-light flex items-center justify-between">
          <h3 className="text-sm font-semibold">{title} Directory</h3>
          <span className="badge badge-neutral text-xs">{filteredItems.length} records</span>
        </div>

        <DataTable
          headers={data.headers}
          data={filteredItems}
          sortable
          pagination
          pageSize={8}
          emptyMessage={`No ${title} records matching "${search}"`}
        />
      </div>
    </PageTransition>
  );
};

export default GenericModule;
