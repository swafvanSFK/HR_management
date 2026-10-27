/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Toast Notifications
   ══════════════════════════════════════════════════════════════ */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react';
import useStore from '../../store/useStore';

const icons = {
  success: CheckCircle,
  warning: AlertCircle,
  error: XCircle,
  info: Info,
};

const Toast = ({ toast }) => {
  const removeToast = useStore((s) => s.removeToast);
  const Icon = icons[toast.type] || Info;

  useEffect(() => {
    const timer = setTimeout(() => removeToast(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className={`toast toast-${toast.type || 'info'}`}
    >
      <span className="toast-dot" />
      {toast.message}
    </motion.div>
  );
};

const ToastContainer = () => {
  const toasts = useStore((s) => s.toasts);

  return (
    <div className="toast-container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
