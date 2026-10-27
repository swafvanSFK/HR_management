/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Performance Management
   KPI tracking, 360 reviews, goal alignment & competency matrix
   ══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target, Star, Award, TrendingUp, CheckCircle,
  Clock, ArrowUpRight, ChevronRight, User
} from 'lucide-react';
import useStore from '../store/useStore';
import { getInitials, getAvatarColor } from '../data/employees';
import PageTransition from '../components/common/PageTransition';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import { MotionCount, AnimatedProgressBar } from '../components/animations';

const reviewCycles = [
  { id: 'REV-01', name: 'Daniel Okonkwo', role: 'Head of Engineering', score: 4.8, status: 'Completed', goalsCompleted: 5, totalGoals: 5, rating: 'Outstanding' },
  { id: 'REV-02', name: 'Sofia Marin', role: 'Lead Product Designer', score: 4.6, status: 'In Review', goalsCompleted: 4, totalGoals: 5, rating: 'Exceeds Expectations' },
  { id: 'REV-03', name: 'Kai Tanaka', role: 'Principal Architect', score: 4.9, status: 'Completed', goalsCompleted: 6, totalGoals: 6, rating: 'Outstanding' },
  { id: 'REV-04', name: 'Omar Haddad', role: 'DevOps Lead', score: 4.2, status: 'Self-Review', goalsCompleted: 3, totalGoals: 4, rating: 'Meets Expectations' },
  { id: 'REV-05', name: 'Lena Park', role: 'Senior Mobile Engineer', score: 4.5, status: 'In Review', goalsCompleted: 4, totalGoals: 4, rating: 'Exceeds Expectations' },
];

const teamGoals = [
  { title: 'Migrate Core API Gateway to Rust', owner: 'Engineering Team', progress: 85, dueDate: 'Nov 15, 2026', status: 'On Track' },
  { title: 'Reduce Employee Onboarding Time to < 48 Hours', owner: 'People Team', progress: 100, dueDate: 'Oct 30, 2026', status: 'Achieved' },
  { title: 'Publish NovaPulse Mobile v2.0 to App Store', owner: 'Product & Mobile', progress: 60, dueDate: 'Dec 05, 2026', status: 'In Progress' },
];

const Performance = () => {
  const addToast = useStore((s) => s.addToast);
  const [selectedCycle, setSelectedCycle] = useState('Q4 2026 Annual Appraisal');

  return (
    <PageTransition className="p-6">
      {/* Page Header */}
      <PageHeader
        title="Performance & Goals"
        subtitle="Continuous performance appraisals, OKRs, and employee career ladders"
        actions={
          <>
            <select
              className="pl-3 pr-8 py-2 rounded-full bg-white border text-xs font-semibold text-charcoal shadow-2xs focus:outline-none focus:border-charcoal transition-all cursor-pointer"
              value={selectedCycle}
              onChange={(e) => setSelectedCycle(e.target.value)}
            >
              <option>Q4 2026 Annual Appraisal</option>
              <option>Q3 2026 Mid-Year Check-in</option>
              <option>Q2 2026 OKR Evaluation</option>
            </select>
            <button
              onClick={() => addToast({ type: 'success', message: 'New appraisal cycle launched for all teams.' })}
              className="btn btn-dark text-xs"
            >
              <Award size={14} /> Launch Cycle
            </button>
          </>
        }
      />

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-5">
          <span className="stat-label">Appraisal Completion</span>
          <div className="stat-value mt-2">
            <MotionCount to={78} suffix="%" />
          </div>
          <AnimatedProgressBar
            value={78}
            color="#20201E"
            bgTrack="bg-border"
            className="mt-3"
            delay={0.2}
          />
          <p className="text-[11px] text-text-secondary mt-2">
            <MotionCount to={32} /> of 41 reviews submitted
          </p>
        </div>

        <div className="card p-5">
          <span className="stat-label">Company Average Score</span>
          <div className="stat-value mt-2 flex items-center gap-2">
            <span><MotionCount to={4.52} decimals={2} /></span>
            <div className="flex text-gold">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < 4 ? '#F4C542' : 'none'} />
              ))}
            </div>
          </div>
          <p className="text-[11px] text-success font-semibold mt-2">↑ 0.18 vs previous cycle</p>
        </div>

        <div className="card p-5">
          <span className="stat-label">Top Quartile Performers</span>
          <div className="stat-value mt-2">
            <MotionCount to={12} />
          </div>
          <p className="text-[11px] text-text-secondary mt-2">Eligible for merit bonuses</p>
        </div>

        <div className="card p-5">
          <span className="stat-label">Company OKRs on Track</span>
          <div className="stat-value mt-2">
            <MotionCount to={91} suffix="%" />
          </div>
          <AnimatedProgressBar
            value={91}
            color="#5CB85C"
            bgTrack="bg-border"
            className="mt-3"
            delay={0.3}
          />
          <p className="text-[11px] text-success font-semibold mt-2">
            <MotionCount to={14} /> of 16 targets green
          </p>
        </div>
      </div>

      {/* Team OKRs & Goals */}
      <div className="card p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold">Priority Company OKRs</h3>
          <span className="text-xs text-text-secondary">Target Window: Oct 01 – Dec 31, 2026</span>
        </div>
        <div className="space-y-4">
          {teamGoals.map((goal, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-ivory border border-border">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div>
                  <h4 className="text-sm font-semibold text-text-primary">{goal.title}</h4>
                  <p className="text-xs text-text-secondary mt-0.5">Assigned to: {goal.owner} · Due {goal.dueDate}</p>
                </div>
                <span className={`badge ${
                  goal.status === 'Achieved' ? 'badge-success badge-dot' : 'badge-gold badge-dot'
                }`}>
                  {goal.status}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <AnimatedProgressBar
                    value={goal.progress}
                    color={goal.progress === 100 ? '#5CB85C' : '#F4C542'}
                    bgTrack="bg-border"
                    delay={0.2 + idx * 0.12}
                  />
                </div>
                <span className="text-xs font-bold text-charcoal w-12 text-right">
                  <MotionCount to={goal.progress} suffix="%" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Appraisals Table */}
      <div className="card p-0 overflow-hidden">
        <div className="p-4 border-b border-border-light flex items-center justify-between">
          <h3 className="text-sm font-semibold">Individual Appraisal Status</h3>
          <span className="badge badge-neutral text-xs">{reviewCycles.length} team members</span>
        </div>
        <DataTable
          columns={[
            {
              key: 'name',
              header: 'Employee',
              render: (val, row) => (
                <div className="flex items-center gap-3">
                  <div
                    className="avatar avatar-sm"
                    style={{ background: getAvatarColor(row.name) }}
                  >
                    <span className="text-white text-xs font-semibold">
                      {getInitials(row.name)}
                    </span>
                  </div>
                  <span className="text-sm font-semibold">{row.name}</span>
                </div>
              ),
            },
            {
              key: 'role',
              header: 'Role',
              render: (val) => <span className="text-sm text-text-secondary">{val}</span>,
            },
            {
              key: 'rating',
              header: 'Rating Band',
              render: (val) => <span className="badge badge-gold font-medium text-xs">{val}</span>,
            },
            {
              key: 'score',
              header: 'Score',
              render: (val) => (
                <span className="font-mono font-bold text-sm text-charcoal">
                  <MotionCount to={val} decimals={1} duration={0.9} /> / 5.0
                </span>
              ),
            },
            {
              key: 'goalsCompleted',
              header: 'OKRs Achieved',
              render: (_, row, index) => (
                <div className="flex items-center gap-2">
                  <span className="text-xs whitespace-nowrap">{row.goalsCompleted} of {row.totalGoals} goals</span>
                  <div className="w-16 hidden sm:block">
                    <AnimatedProgressBar
                      value={(row.goalsCompleted / row.totalGoals) * 100}
                      color="#F4C542"
                      bgTrack="bg-border-light"
                      height="h-1.5"
                      delay={0.25 + index * 0.08}
                    />
                  </div>
                </div>
              ),
            },
            {
              key: 'status',
              header: 'Appraisal State',
              render: (val) => (
                <span className={`badge ${
                  val === 'Completed'
                    ? 'badge-success badge-dot'
                    : 'badge-warning badge-dot'
                }`}>
                  {val}
                </span>
              ),
            },
          ]}
          data={reviewCycles}
          sortable
          actions={(row) => (
            <button
              onClick={() => addToast({ type: 'info', message: `Opening appraisal for ${row.name}` })}
              className="btn btn-secondary btn-sm"
            >
              View Review
            </button>
          )}
        />
      </div>
    </PageTransition>
  );
};

export default Performance;
