/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Recruitment Management
   Kanban pipeline + table view
   ══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, LayoutGrid, List, MapPin, Clock, Briefcase, GripVertical } from 'lucide-react';
import { getInitials, getAvatarColor } from '../data/employees';
import PageTransition from '../components/common/PageTransition';
import DataTable from '../components/common/DataTable';
import PageHeader from '../components/common/PageHeader';

const stages = ['Applied', 'Reviewed', 'Interviewed', 'Shortlisted', 'Offered', 'Onboarded'];

const jobOpenings = [
  { id: 'JOB-01', title: 'Senior Backend Engineer', department: 'Engineering', location: 'Dubai', type: 'Full-time', applicants: 24, posted: '2 weeks ago' },
  { id: 'JOB-02', title: 'Product Manager', department: 'Product', location: 'Abu Dhabi', type: 'Full-time', applicants: 18, posted: '1 week ago' },
  { id: 'JOB-03', title: 'UX Designer', department: 'Design', location: 'Remote', type: 'Full-time', applicants: 31, posted: '3 days ago' },
  { id: 'JOB-04', title: 'Marketing Specialist', department: 'Marketing', location: 'Dubai', type: 'Contract', applicants: 12, posted: '5 days ago' },
];

const candidates = [
  { id: 'C01', name: 'Daniel Okonkwo', role: 'Senior Backend Engineer', stage: 'Applied', email: 'daniel.o@email.com', rating: 4 },
  { id: 'C02', name: 'Priya Sharma', role: 'Senior Backend Engineer', stage: 'Interviewed', email: 'priya.s@email.com', rating: 5 },
  { id: 'C03', name: 'Marcus Chen', role: 'UX Designer', stage: 'Reviewed', email: 'marcus.c@email.com', rating: 3 },
  { id: 'C04', name: 'Isabella Rossi', role: 'Product Manager', stage: 'Shortlisted', email: 'isabella.r@email.com', rating: 4 },
  { id: 'C05', name: 'Amir Khalidi', role: 'Senior Backend Engineer', stage: 'Interviewed', email: 'amir.k@email.com', rating: 4 },
  { id: 'C06', name: 'Yuki Watanabe', role: 'UX Designer', stage: 'Applied', email: 'yuki.w@email.com', rating: 3 },
  { id: 'C07', name: 'Elena Petrov', role: 'Marketing Specialist', stage: 'Offered', email: 'elena.p@email.com', rating: 5 },
  { id: 'C08', name: 'James Mensah', role: 'Senior Backend Engineer', stage: 'Applied', email: 'james.m@email.com', rating: 2 },
  { id: 'C09', name: 'Fatima Al-Zahra', role: 'Product Manager', stage: 'Reviewed', email: 'fatima.z@email.com', rating: 4 },
  { id: 'C10', name: 'Lucas Weber', role: 'UX Designer', stage: 'Onboarded', email: 'lucas.w@email.com', rating: 5 },
];

const stageColors = {
  Applied: '#85837B',
  Reviewed: '#5BC0DE',
  Interviewed: '#F4C542',
  Shortlisted: '#E8A838',
  Offered: '#5CB85C',
  Onboarded: '#20201E',
};

const Recruitment = () => {
  const [view, setView] = useState('kanban');
  const [search, setSearch] = useState('');

  const filtered = candidates.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageTransition className="p-6">
      {/* Header */}
      <PageHeader
        title="Recruitment"
        subtitle={`${jobOpenings.length} open positions · ${candidates.length} candidates`}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search candidates..."
        actions={
          <>
            <div className="pill-tabs">
              <button
                className={`pill-tab ${view === 'kanban' ? 'active' : ''}`}
                onClick={() => setView('kanban')}
                title="Kanban Board"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                className={`pill-tab ${view === 'table' ? 'active' : ''}`}
                onClick={() => setView('table')}
                title="List View"
              >
                <List size={14} />
              </button>
            </div>
            <button className="btn btn-dark">
              <Plus size={14} /> Post Job
            </button>
          </>
        }
      />

      {/* Job Openings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {jobOpenings.map((job, i) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <h4 className="text-sm font-semibold mb-1">{job.title}</h4>
            <div className="flex flex-wrap gap-2 text-[11px] text-text-secondary">
              <span className="flex items-center gap-1"><Briefcase size={10} />{job.department}</span>
              <span className="flex items-center gap-1"><MapPin size={10} />{job.location}</span>
            </div>
            <div className="flex items-center justify-between mt-3">
              <span className="badge badge-gold">{job.applicants} applicants</span>
              <span className="text-[10px] text-text-secondary">{job.posted}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Kanban View */}
      {view === 'kanban' && (
        <div className="flex gap-3 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageCandidates = filtered.filter(c => c.stage === stage);
            return (
              <div key={stage} className="min-w-55 flex-1">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="w-2 h-2 rounded-full" style={{ background: stageColors[stage] }} />
                  <span className="text-xs font-semibold">{stage}</span>
                  <span className="text-[10px] text-text-secondary ml-auto">{stageCandidates.length}</span>
                </div>
                <div className="space-y-2">
                  {stageCandidates.map((cand, i) => (
                    <motion.div
                      key={cand.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="card p-3 cursor-pointer hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="avatar avatar-sm" style={{ background: getAvatarColor(cand.name) }}>
                          <span className="text-white text-[9px] font-semibold">{getInitials(cand.name)}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold truncate">{cand.name}</p>
                          <p className="text-[10px] text-text-secondary truncate">{cand.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {[1,2,3,4,5].map(star => (
                            <div key={star} className={`w-3 h-3 rounded-full ${star <= cand.rating ? 'bg-gold' : 'bg-border'}`} />
                          ))}
                        </div>
                        <GripVertical size={12} className="text-[#D4D1C8]" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {view === 'table' && (
        <div className="card p-0 overflow-hidden">
          <DataTable
            data={filtered}
            columns={[
              {
                key: 'name',
                header: 'Candidate',
                sortable: true,
                render: (val, cand) => (
                  <div className="flex items-center gap-3">
                    <div className="avatar avatar-sm" style={{ background: getAvatarColor(cand.name) }}>
                      <span className="text-white text-[9px] font-semibold">{getInitials(cand.name)}</span>
                    </div>
                    <span className="text-sm font-medium">{cand.name}</span>
                  </div>
                ),
              },
              { key: 'role', header: 'Position', className: 'text-sm text-text-secondary', sortable: true },
              {
                key: 'stage',
                header: 'Stage',
                sortable: true,
                render: (val) => (
                  <span className="badge" style={{ background: stageColors[val] + '20', color: stageColors[val] }}>
                    {val}
                  </span>
                ),
              },
              {
                key: 'rating',
                header: 'Rating',
                sortable: true,
                render: (val) => (
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className={`w-2.5 h-2.5 rounded-full ${star <= val ? 'bg-gold' : 'bg-border'}`}
                      />
                    ))}
                  </div>
                ),
              },
              { key: 'email', header: 'Email', className: 'text-sm text-text-secondary' },
            ]}
            sortable
            pagination
            pageSize={8}
            emptyMessage="No candidates match the filter"
          />
        </div>
      )}
    </PageTransition>
  );
};

export default Recruitment;
