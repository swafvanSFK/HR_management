import { useState } from 'react';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import { FileText, Download, Phone, Mail, MapPin, Calendar, Cake } from 'lucide-react';
import useStore from '../store/useStore';
import { getInitials, getAvatarColor } from '../data/employees';
import PageTransition from '../components/common/PageTransition';
import { MotionCount } from '../components/animations';

const teamMembers = [
  { id: 'TM01', name: 'Mira Okafor', role: 'Product Designer', hours: '142.0', pay: '$6,250', workPercent: 85, overtime: 4, leave: 11, pto: '18 / 25', ptoPercent: 72, budget: '$1,100 / $1,200', budgetPercent: 91, plan: '142 / 168', planPercent: 84, birthday: '1995-04-12', started: '2022-03-01' },
  { id: 'TM02', name: 'Jonah Reyes', role: 'Frontend Engineer', hours: '128.5', pay: '$5,400', workPercent: 76, overtime: 1, leave: 23, pto: '10 / 25', ptoPercent: 40, budget: '$650 / $1,200', budgetPercent: 54, plan: '128 / 168', planPercent: 76, birthday: '1993-11-08', started: '2023-06-15' },
  { id: 'TM03', name: 'Lena Park', role: 'Product Manager', hours: '131.5', pay: '$5,973', active: true, workPercent: 79, overtime: 2, leave: 20, pto: '14 / 25', ptoPercent: 56, budget: '$980 / $1,200', budgetPercent: 81, plan: '132 / 168', planPercent: 78, birthday: '1994-07-21', started: '2023-01-10' },
  { id: 'TM04', name: 'Theo Brandt', role: 'Platform Engineer', hours: '136.0', pay: '$5,800', workPercent: 81, overtime: 3, leave: 16, pto: '16 / 25', ptoPercent: 64, budget: '$820 / $1,200', budgetPercent: 68, plan: '136 / 168', planPercent: 81, birthday: '1992-09-14', started: '2021-11-01' },
  { id: 'TM05', name: 'Sofia Marin', role: 'Brand Designer', hours: '124.0', pay: '$5,100', workPercent: 74, overtime: 0, leave: 26, pto: '8 / 25', ptoPercent: 32, budget: '$450 / $1,200', budgetPercent: 37, plan: '124 / 168', planPercent: 74, birthday: '1996-02-28', started: '2023-08-20' },
  { id: 'TM06', name: 'Kai Tanaka', role: 'Data Analyst', hours: '140.0', pay: '$6,100', workPercent: 83, overtime: 5, leave: 12, pto: '20 / 25', ptoPercent: 80, budget: '$1,050 / $1,200', budgetPercent: 87, plan: '140 / 168', planPercent: 83, birthday: '1995-12-05', started: '2022-09-01' },
];

// Calendar days configuration for September 2026
const calendarDays = [
  { day: 1, type: 'leave', label: 'Leave' },
  { day: 2, type: 'work', label: '7.5h' },
  { day: 3, type: 'work', label: '7.5h' },
  { day: 4, type: 'work', label: '8.0h' },
  { day: 5, type: 'weekend' },
  { day: 6, type: 'weekend' },
  { day: 7, type: 'work', label: '8.0h' },
  { day: 8, type: 'work', label: '7.5h' },
  { day: 9, type: 'work', label: '7.5h' },
  { day: 10, type: 'work', label: '7.0h' },
  { day: 11, type: 'work', label: '8.0h' },
  { day: 12, type: 'weekend' },
  { day: 13, type: 'weekend' },
  { day: 14, type: 'work', label: '7.5h' },
  { day: 15, type: 'overtime', label: '10.5h' },
  { day: 16, type: 'work', label: '7.5h' },
  { day: 17, type: 'leave', label: 'Leave' },
  { day: 18, type: 'work', label: '7.0h' },
  { day: 19, type: 'weekend' },
  { day: 20, type: 'weekend' },
  { day: 21, type: 'leave', label: 'Leave' },
  { day: 22, type: 'work', label: '7.5h' },
  { day: 23, type: 'work', label: '8.0h' },
  { day: 24, type: 'work', label: '7.0h' },
  { day: 25, type: 'leave', label: 'Leave' },
  { day: 26, type: 'weekend' },
  { day: 27, type: 'weekend' },
  { day: 28, type: 'work', label: '8.0h' },
  { day: 29, type: 'work', label: '7.5h' },
  { day: 30, type: 'empty' },
];

const Payroll = () => {
  const addToast = useStore((s) => s.addToast);
  const [selectedMember, setSelectedMember] = useState('TM03'); // Lena Park default
  const [selectedDay, setSelectedDay] = useState(29);

  const currentMember = teamMembers.find((m) => m.id === selectedMember) || teamMembers[2];

  return (
    <PageTransition className="w-full pt-2">
      {/* ── Top Payroll Header & Telemetry ── */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-[34px] font-light text-charcoal leading-none">
            <MotionCount to={parseFloat(currentMember.hours)} decimals={1} duration={0.8} />
          </span>
          <span className="text-xl font-light text-text-secondary">hrs /</span>
          <span className="text-[30px] font-normal text-charcoal leading-none">
            <MotionCount to={parseInt(currentMember.pay.replace(/[^0-9]/g, ''))} prefix="$" duration={0.9} />
          </span>
        </div>
        <span className="text-xs font-semibold text-text-secondary">
          {dayjs('2026-09-01').format('MMMM YYYY')}
        </span>
      </div>

      {/* ── Work Hours Progress Row ── */}
      <div className="flex items-center gap-4 mb-5 text-xs">
        {/* Main Work Hours Bar */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex justify-between text-[11px] text-text-secondary">
            <span>Work hours</span>
            <span className="font-medium text-charcoal">{currentMember.workPercent}% logged</span>
          </div>
          <div className="h-6 rounded-full bg-cream overflow-hidden flex items-center p-0.5 relative shadow-inner">
            <motion.div key={`work-bar-${currentMember.id}`} initial={{ width: 0 }} animate={{ width: `${currentMember.workPercent}%` }} transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], }} className="h-full bg-gold rounded-full flex items-center px-3 font-semibold text-[10px] text-charcoal shadow-xs relative overflow-hidden">
              {/* Shimmer Light Reflection Sweep */}
              <motion.div initial={{ x: '-100%' }} animate={{ x: '200%' }} transition={{ repeat: Infinity, repeatDelay: 3.5, duration: 1.6, ease: 'easeInOut', }} className="absolute inset-0 bg-linear-to-r from-transparent via-white/35 to-transparent w-full pointer-events-none" />
              <span className="relative z-10">{currentMember.workPercent}%</span>
            </motion.div>
          </div>
        </div>

        {/* Overtime Pill */}
        <motion.div key={`ot-${currentMember.id}`} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35, delay: 0.15 }} className="flex flex-col gap-1 w-20">
          <span className="text-[11px] text-text-secondary">Overtime</span>
          <div className="h-6 bg-[#1C1B18] text-white rounded-full flex items-center justify-center font-semibold text-[10px] shadow-xs">
            {currentMember.overtime}%
          </div>
        </motion.div>

        {/* Leave Pill */}
        <motion.div key={`leave-${currentMember.id}`} initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.35, delay: 0.22 }} className="flex flex-col gap-1 w-24">
          <span className="text-[11px] text-text-secondary">Leave</span>
          <div className="h-6 bg-[#CFCBBE] text-charcoal rounded-full flex items-center justify-center font-semibold text-[10px] shadow-xs">
            {currentMember.leave}%
          </div>
        </motion.div>
      </div>

      {/* ── 3-Column Content Layout ── */}
      <div className="grid grid-cols-12 gap-5 items-start">
        {/* ══ LEFT: Team Members List ══ */}
        <div className="col-span-12 lg:col-span-3">
          <div className="card p-3 bg-white rounded-2xl border border-border shadow-sm space-y-1">
            <h3 className="text-xs font-semibold text-text-secondary px-2 py-1 uppercase tracking-wider">
              Team
            </h3>
            {teamMembers.map((member) => {
              const active = member.id === selectedMember;
              return (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member.id)}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all ${active ? 'bg-[#1C1B18] text-white shadow-xs' : 'hover:bg-ivory text-charcoal'}`}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                    style={{ background: active ? '#4A4843' : getAvatarColor(member.name) }}
                  >
                    {getInitials(member.name)}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-semibold leading-tight truncate ${active ? 'text-white' : 'text-charcoal'}`}>
                      {member.name}
                    </p>
                    <p className={`text-[10px] truncate ${active ? 'text-white/60' : 'text-text-secondary'}`}>
                      {member.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══ CENTER: Calendar Grid (1 to 30) ══ */}
        <div className="col-span-12 lg:col-span-6">
          <div className="card p-4 bg-white rounded-2xl border border-border shadow-sm">
            {/* Days of Week Header formatted with dayjs */}
            <div className="grid grid-cols-7 text-center pb-2 text-[11px] font-medium text-text-secondary border-b border-border-light">
              {[1, 2, 3, 4, 5, 6, 7].map((dayIndex) => (
                <span key={dayIndex}>
                  {dayjs().day(dayIndex).format('ddd')}
                </span>
              ))}
            </div>

            {/* 30 Day Tiles Grid */}
            <motion.div
              key={`cal-grid-${selectedMember}`}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.015,
                    delayChildren: 0.05,
                  },
                },
              }}
              className="grid grid-cols-7 gap-2 pt-3"
            >
              {calendarDays.map((item, idx) => {
                const isSelected = selectedDay === item.day;
                const isInteractive = item.type !== 'weekend' && item.type !== 'empty';

                return (
                  <motion.div
                    key={item.day || idx}
                    variants={{
                      hidden: { opacity: 0, y: 12, scale: 0.9 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          type: 'spring',
                          stiffness: 320,
                          damping: 24,
                        },
                      },
                    }}
                    whileHover={
                      isInteractive
                        ? {
                            scale: 1.05,
                            y: -2,
                            boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
                            transition: { duration: 0.15 },
                          }
                        : {}
                    }
                    whileTap={isInteractive ? { scale: 0.97 } : {}}
                    onClick={() => {
                      if (isInteractive) {
                        setSelectedDay(item.day);
                        if (item.label) {
                          addToast({
                            type: 'info',
                            message: `${dayjs(`2026-09-${String(item.day).padStart(2, '0')}`).format('MMM D')}: ${item.label} (${item.type.toUpperCase()})`,
                          });
                        }
                      }
                    }}
                    className={`h-19.5 rounded-xl border p-2 flex flex-col justify-between transition-all select-none relative ${
                      isInteractive ? 'cursor-pointer' : ''
                    } ${
                      isSelected
                        ? 'border-[#1C1B18] bg-white shadow-sm ring-2 ring-[#1C1B18] -translate-y-0.5 z-10'
                        : item.type === 'weekend'
                        ? 'border-transparent bg-[#FAF9F5] opacity-60'
                        : 'border-border-light bg-white hover:border-[#D4D1C8]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-medium ${isSelected ? 'text-[#1C1B18] font-bold' : 'text-text-secondary'}`}>
                        {item.day}
                      </span>
                      {isSelected && (
                        <motion.span
                          layoutId="selectedDayIndicator"
                          className="w-1.5 h-1.5 rounded-full bg-[#1C1B18]"
                        />
                      )}
                    </div>

                    {/* Status Pill Inside Day */}
                    {item.label && (
                      <div className="text-center">
                        <motion.span
                          initial={{ scale: 0.7, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: 0.12 + idx * 0.012,
                            type: 'spring',
                            stiffness: 400,
                            damping: 22,
                          }}
                          className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold shadow-2xs ${
                            item.type === 'work'
                              ? 'bg-gold/40 text-charcoal'
                              : item.type === 'overtime'
                              ? 'bg-[#1C1B18] text-white'
                              : 'bg-border text-text-secondary'
                          }`}
                        >
                          {item.label}
                        </motion.span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Signature Footer Pill Matching Reference */}
            <div className="flex items-center justify-between pt-4 border-t border-border-light mt-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1B18] text-white text-xs font-medium shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                Payroll, person by person
              </div>
              <span className="text-xs text-text-secondary">30 Days Logged</span>
            </div>
          </div>
        </div>

        {/* ══ RIGHT: Employee Detail Card ══ */}
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <div className="card p-4 bg-white rounded-2xl border border-border shadow-sm text-center">
            {/* Avatar Circle */}
            <div
              className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-xl font-bold text-white shadow-xs mb-2"
              style={{ background: getAvatarColor(currentMember.name) }}
            >
              {getInitials(currentMember.name)}
            </div>
            <h3 className="text-base font-semibold text-charcoal leading-tight">
              {currentMember.name}
            </h3>
            <p className="text-xs text-text-secondary font-normal">
              {currentMember.role} · Product
            </p>

            {/* Metadata Rows */}
            <div className="mt-4 pt-3 border-t border-border-light text-left text-xs space-y-2 text-text-secondary">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Cake size={12} /> Birthday</span>
                <span className="font-medium text-charcoal">
                  {dayjs(currentMember.birthday).format('MMM D')}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Phone size={12} /> Phone</span>
                <span className="font-medium text-charcoal">+82 10 4471 0932</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Mail size={12} /> Email</span>
                <span className="font-medium text-charcoal">lena@coterie.work</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><MapPin size={12} /> Based in</span>
                <span className="font-medium text-charcoal">Seoul</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Calendar size={12} /> Started</span>
                <span className="font-medium text-charcoal">
                  {dayjs(currentMember.started).format('MMM YYYY')}
                </span>
              </div>
            </div>

            {/* Documents Pills */}
            <div className="mt-4 pt-3 border-t border-border-light text-left">
              <span className="text-[11px] font-semibold text-text-secondary block mb-2">Documents</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addToast({ type: 'success', message: 'Downloading Contract.pdf' })}
                  className="flex-1 flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-border bg-[#FAF9F5] hover:bg-white text-[11px] font-medium text-charcoal transition-all shadow-2xs"
                >
                  <span className="flex items-center gap-1"><FileText size={11} /> Contract.pdf</span>
                  <Download size={11} className="text-text-secondary" />
                </button>
                <button
                  onClick={() => addToast({ type: 'success', message: 'Downloading Payslip-09.pdf' })}
                  className="flex-1 flex items-center justify-between px-2.5 py-1.5 rounded-xl border border-border bg-[#FAF9F5] hover:bg-white text-[11px] font-medium text-charcoal transition-all shadow-2xs"
                >
                  <span className="flex items-center gap-1"><FileText size={11} /> Payslip-09...</span>
                  <Download size={11} className="text-text-secondary" />
                </button>
              </div>
            </div>

            {/* This Month Metrics */}
            <div className="mt-4 pt-3 border-t border-border-light text-left space-y-2.5 text-xs">
              <span className="text-[11px] font-semibold text-text-secondary block">This month</span>

              {/* Paid time off */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-text-secondary">Paid time off</span>
                  <span className="font-semibold text-charcoal">{currentMember.pto}</span>
                </div>
                <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    key={`pto-${currentMember.id}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${currentMember.ptoPercent}%` }}
                    transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-gold h-full rounded-full"
                  />
                </div>
              </div>

              {/* Learning budget */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-text-secondary">Learning budget</span>
                  <span className="font-semibold text-charcoal">{currentMember.budget}</span>
                </div>
                <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    key={`lb-${currentMember.id}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${currentMember.budgetPercent}%` }}
                    transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#1C1B18] h-full rounded-full"
                  />
                </div>
              </div>

              {/* Hours vs plan */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-text-secondary">Hours vs plan</span>
                  <span className="font-semibold text-charcoal">{currentMember.plan}</span>
                </div>
                <div className="w-full bg-border h-1.5 rounded-full overflow-hidden">
                  <motion.div
                    key={`plan-${currentMember.id}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${currentMember.planPercent}%` }}
                    transition={{ duration: 0.85, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-[#1C1B18] h-full rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Payroll;
