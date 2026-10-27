/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Attendance Management
   Daily punches, shift schedules, overtime tracker & biometrics
   ══════════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock, Play, Square, MapPin, Calendar, CheckCircle2,
  AlertTriangle, Filter, Download, ArrowUpRight, UserCheck
} from 'lucide-react';
import useStore from '../store/useStore';
import { getInitials, getAvatarColor } from '../data/employees';
import PageTransition from '../components/common/PageTransition';
import PageHeader from '../components/common/PageHeader';
import { AnimatedTableRow, MotionCount } from '../components/animations';

const initialPunches = [
  { id: 'ATT01', name: 'Daniel Okonkwo', role: 'Head of Engineering', dept: 'Engineering', punchIn: '08:48 AM', punchOut: '--:--', status: 'On Time', hours: '5h 22m', location: 'Dubai HQ' },
  { id: 'ATT02', name: 'Swafvan Hassan', role: 'VP, People & Culture', dept: 'Human Resources', punchIn: '09:05 AM', punchOut: '--:--', status: 'Late', hours: '5h 05m', location: 'Dubai HQ' },
  { id: 'ATT03', name: 'Sofia Marin', role: 'Lead Product Designer', dept: 'Design', punchIn: '08:30 AM', punchOut: '05:30 PM', status: 'Completed', hours: '8h 30m', location: 'Remote' },
  { id: 'ATT04', name: 'Kai Tanaka', role: 'Principal Architect', dept: 'Engineering', punchIn: '08:55 AM', punchOut: '--:--', status: 'On Time', hours: '5h 15m', location: 'Dubai HQ' },
  { id: 'ATT05', name: 'Ines Duarte', role: 'Talent Acquisition Lead', dept: 'Human Resources', punchIn: '09:12 AM', punchOut: '--:--', status: 'Late', hours: '4h 58m', location: 'Abu Dhabi Branch' },
  { id: 'ATT06', name: 'Lucas Weber', role: 'DevOps Engineer', dept: 'Engineering', punchIn: '--:--', punchOut: '--:--', status: 'On Leave', hours: '0h 00m', location: 'Annual Leave' },
];

const Attendance = () => {
  const addToast = useStore((s) => s.addToast);
  const [clockedIn, setClockedIn] = useState(true);
  const [clockTime, setClockTime] = useState('08:48 AM');
  const [elapsedSecs, setElapsedSecs] = useState(19320); // 5h 22m
  const [punches, setPunches] = useState(initialPunches);
  const [selectedDept, setSelectedDept] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    let timer;
    if (clockedIn) {
      timer = setInterval(() => setElapsedSecs((s) => s + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [clockedIn]);

  const formatElapsed = (sec) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleClock = () => {
    if (clockedIn) {
      setClockedIn(false);
      addToast({ type: 'info', message: 'Clocked out at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    } else {
      setClockedIn(true);
      setClockTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      addToast({ type: 'success', message: 'Clocked in successfully!' });
    }
  };

  const filteredPunches = punches.filter((p) => {
    const matchDept = selectedDept === 'All' || p.dept === selectedDept;
    const matchSearch = !search ||
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.role?.toLowerCase().includes(search.toLowerCase()) ||
      p.dept?.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <PageTransition className="p-6">
      {/* Page Header */}
      <PageHeader
        title="Attendance & Time Tracker"
        subtitle="Real-time check-ins, biometric synchronization, and shift hours"
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Filter employees or shifts..."
        actions={
          <button className="btn btn-secondary text-xs">
            <Download size={14} /> Export Timesheets
          </button>
        }
      />

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Live Clock Card */}
        <div className="card p-5 bg-charcoal text-white flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white/60 tracking-wider uppercase">My Live Shift</span>
            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${
              clockedIn ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${clockedIn ? 'bg-success animate-pulse' : 'bg-danger'}`} />
              {clockedIn ? 'Clocked In' : 'Clocked Out'}
            </span>
          </div>

          <div className="my-4">
            <div className="text-3xl font-mono font-bold text-gold">
              {formatElapsed(elapsedSecs)}
            </div>
            <p className="text-xs text-white/60 mt-1 flex items-center gap-1">
              <Clock size={12} /> Since {clockTime} · Standard Shift (9h)
            </p>
          </div>

          <button
            onClick={handleToggleClock}
            className={`btn w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-all ${
              clockedIn
                ? 'bg-danger text-white hover:bg-[#c9302c]'
                : 'bg-gold text-charcoal hover:bg-gold-hover'
            }`}
          >
            {clockedIn ? <><Square size={14} /> Clock Out</> : <><Play size={14} /> Clock In</>}
          </button>
        </div>

        {/* Present Today */}
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="stat-label">Present Today</span>
            <div className="w-8 h-8 rounded-lg bg-success-soft text-success flex items-center justify-center">
              <UserCheck size={16} />
            </div>
          </div>
          <div className="stat-value mt-3">
            <MotionCount to={94.2} decimals={1} suffix="%" duration={1.0} />
          </div>
          <p className="text-xs text-success font-medium mt-1 flex items-center gap-1">
            <span>↑ 2.1%</span> vs yesterday (48/51 active)
          </p>
        </div>

        {/* Late Check-ins */}
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="stat-label">Late Arrivals</span>
            <div className="w-8 h-8 rounded-lg bg-warning-soft text-warning flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="stat-value mt-3 text-warning">
            <MotionCount to={3} duration={1.0} />
          </div>
          <p className="text-xs text-text-secondary mt-1">Within 15-min grace window</p>
        </div>

        {/* Average Hours */}
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="stat-label">Avg. Work Hours</span>
            <div className="w-8 h-8 rounded-lg bg-cream text-charcoal flex items-center justify-center">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div className="stat-value mt-3">
            <MotionCount to={8.4} decimals={1} suffix="h" duration={1.0} />
          </div>
          <p className="text-xs text-text-secondary mt-1">Target: 8.0h / day</p>
        </div>
      </div>

      {/* Attendance Punch Table */}
      <div className="card p-0 overflow-hidden">
        <div className="p-4 border-b border-border-light flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">Today's Punch Logs</span>
            <span className="badge badge-neutral text-xs">{filteredPunches.length} entries</span>
          </div>

          <div className="flex items-center gap-2">
            {['All', 'Engineering', 'Human Resources', 'Design'].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDept(d)}
                className={`pill-tab text-xs py-1 px-3 ${selectedDept === d ? 'active' : ''}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Department</th>
                <th>Punch In</th>
                <th>Punch Out</th>
                <th>Duration</th>
                <th>Work Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPunches.map((item, index) => (
                <AnimatedTableRow key={item.id} index={index}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div
                        className="avatar avatar-sm"
                        style={{ background: getAvatarColor(item.name) }}
                      >
                        <span className="text-white text-xs font-semibold">
                          {getInitials(item.name)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text-primary">{item.name}</p>
                        <p className="text-xs text-text-secondary">{item.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-text-secondary">{item.dept}</td>
                  <td className="text-sm font-medium font-mono text-text-primary">{item.punchIn}</td>
                  <td className="text-sm font-medium font-mono text-text-secondary">{item.punchOut}</td>
                  <td className="text-sm font-semibold">{item.hours}</td>
                  <td>
                    <span className="inline-flex items-center gap-1 text-xs text-text-secondary">
                      <MapPin size={12} /> {item.location}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${
                      item.status === 'On Time' || item.status === 'Completed'
                        ? 'badge-success badge-dot'
                        : item.status === 'Late'
                        ? 'badge-warning badge-dot'
                        : 'badge-neutral badge-dot'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </AnimatedTableRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageTransition>
  );
};

export default Attendance;
