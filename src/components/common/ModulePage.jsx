/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Module Page Template
   Used for modules that share a common layout pattern
   ══════════════════════════════════════════════════════════════ */

import { motion } from 'framer-motion';
import PageTransition from '../../components/common/PageTransition';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.4 },
  }),
};

const ModulePage = ({ title, subtitle, children, stats, actions }) => (
  <PageTransition className="p-6">
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="text-sm text-text-secondary mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>

    {/* Stats Row */}
    {stats && (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="card p-4"
          >
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            {stat.change && (
              <div className={`text-[11px] font-medium mt-1 ${
                stat.change > 0 ? 'text-success' : 'text-danger'
              }`}>
                {stat.change > 0 ? '↑' : '↓'} {Math.abs(stat.change)}%
              </div>
            )}
          </motion.div>
        ))}
      </div>
    )}

    {children}
  </PageTransition>
);

export default ModulePage;
