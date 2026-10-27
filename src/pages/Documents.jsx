/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Document Repository & Compliance
   ══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, UploadCloud, Download, Eye, AlertTriangle,
  CheckCircle, Shield, Clock, Search, Filter, Plus, X
} from 'lucide-react';
import useStore from '../store/useStore';
import PageTransition from '../components/common/PageTransition';
import PageHeader from '../components/common/PageHeader';
import { AnimatedTableRow, MotionCount } from '../components/animations';

const initialDocs = [
  { id: 'DOC01', title: 'UAE Employment Contract', employee: 'Daniel Okonkwo', type: 'Contract', issueDate: '2023-01-15', expiryDate: '2026-01-14', status: 'Expiring Soon', size: '2.4 MB' },
  { id: 'DOC02', title: 'Residence Visa Stamping', employee: 'Lena Park', type: 'Visa', issueDate: '2024-03-01', expiryDate: '2027-03-01', status: 'Valid', size: '1.8 MB' },
  { id: 'DOC03', title: 'Emirates ID Biometrics', employee: 'Kai Tanaka', type: 'ID Card', issueDate: '2023-09-12', expiryDate: '2025-09-12', status: 'Expired', size: '920 KB' },
  { id: 'DOC04', title: 'Non-Disclosure Agreement', employee: 'Sofia Marin', type: 'Legal', issueDate: '2023-04-10', expiryDate: 'Perpetual', status: 'Valid', size: '1.1 MB' },
  { id: 'DOC05', title: 'Degree Attestation Certificate', employee: 'Omar Haddad', type: 'Education', issueDate: '2022-08-20', expiryDate: 'N/A', status: 'Valid', size: '3.6 MB' },
  { id: 'DOC06', title: 'Corporate Health Insurance Card', employee: 'Swafvan Hassan', type: 'Insurance', issueDate: '2026-01-01', expiryDate: '2026-12-31', status: 'Expiring Soon', size: '640 KB' },
];

const Documents = () => {
  const addToast = useStore((s) => s.addToast);
  const [docs, setDocs] = useState(initialDocs);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDoc, setNewDoc] = useState({
    title: '',
    employee: 'Daniel Okonkwo',
    type: 'Contract',
    expiryDate: '',
  });

  const filtered = docs.filter((d) => {
    const matchSearch = d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.employee.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedType === 'All' || d.type === selectedType;
    return matchSearch && matchType;
  });

  const handleUpload = (e) => {
    e.preventDefault();
    if (!newDoc.title) {
      addToast({ type: 'warning', message: 'Please enter a document title' });
      return;
    }
    const created = {
      id: `DOC0${docs.length + 1}`,
      title: newDoc.title,
      employee: newDoc.employee,
      type: newDoc.type,
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: newDoc.expiryDate || 'N/A',
      status: 'Valid',
      size: '1.2 MB',
    };
    setDocs([created, ...docs]);
    addToast({ type: 'success', message: `${newDoc.title} uploaded successfully` });
    setShowUploadModal(false);
    setNewDoc({ title: '', employee: 'Daniel Okonkwo', type: 'Contract', expiryDate: '' });
  };

  return (
    <PageTransition className="p-6">
      {/* Page Header with Integrated Search & Action */}
      <PageHeader
        title="Document Repository"
        subtitle="Visas, contracts, passports, attested degrees, and compliance expiry tracker"
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search documents or employee..."
        actions={
          <button onClick={() => setShowUploadModal(true)} className="btn btn-dark">
            <UploadCloud size={14} /> Upload Document
          </button>
        }
      />

      {/* Compliance Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="stat-label">Total Active Documents</span>
            <div className="w-8 h-8 rounded-lg bg-cream text-charcoal flex items-center justify-center">
              <FileText size={16} />
            </div>
          </div>
          <div className="stat-value mt-2">
            <MotionCount to={docs.length} duration={1.0} />
          </div>
          <p className="text-xs text-success mt-1">100% cloud encrypted</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="stat-label">Expiring in 60 Days</span>
            <div className="w-8 h-8 rounded-lg bg-warning-soft text-warning flex items-center justify-center">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="stat-value mt-2 text-warning">
            <MotionCount to={2} duration={1.0} />
          </div>
          <p className="text-xs text-text-secondary mt-1">Requires renewal workflows</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between">
            <span className="stat-label">Expired Documents</span>
            <div className="w-8 h-8 rounded-lg bg-danger-soft text-danger flex items-center justify-center">
              <Shield size={16} />
            </div>
          </div>
          <div className="stat-value mt-2 text-danger">
            <MotionCount to={1} duration={1.0} />
          </div>
          <p className="text-xs text-danger font-semibold mt-1">Immediate action needed</p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-4">
        {['All', 'Contract', 'Visa', 'ID Card', 'Legal', 'Insurance'].map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`pill-tab text-xs py-1 px-3 ${selectedType === type ? 'active' : ''}`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Document List */}
      <div className="card p-0 overflow-hidden">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Employee</th>
                <th>Category</th>
                <th>Issue Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>File Size</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((doc, index) => (
                <AnimatedTableRow key={doc.id} index={index}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-ivory border border-border flex items-center justify-center text-charcoal">
                        <FileText size={15} />
                      </div>
                      <span className="text-sm font-semibold text-text-primary">{doc.title}</span>
                    </div>
                  </td>
                  <td className="text-sm font-medium">{doc.employee}</td>
                  <td>
                    <span className="badge badge-neutral text-xs">{doc.type}</span>
                  </td>
                  <td className="text-xs text-text-secondary">{doc.issueDate}</td>
                  <td className="text-xs font-medium text-text-primary">{doc.expiryDate}</td>
                  <td>
                    <span className={`badge ${
                      doc.status === 'Valid'
                        ? 'badge-success badge-dot'
                        : doc.status === 'Expiring Soon'
                        ? 'badge-warning badge-dot'
                        : 'badge-danger badge-dot'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="text-xs text-text-secondary">{doc.size}</td>
                  <td className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => addToast({ type: 'info', message: `Previewing ${doc.title}` })}
                        className="btn btn-ghost btn-icon"
                        title="Preview"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        onClick={() => addToast({ type: 'success', message: `Downloading ${doc.title}` })}
                        className="btn btn-ghost btn-icon"
                        title="Download"
                      >
                        <Download size={15} />
                      </button>
                    </div>
                  </td>
                </AnimatedTableRow>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="modal-content max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3 className="text-lg font-semibold">Upload Document</h3>
                <button onClick={() => setShowUploadModal(false)} className="btn btn-ghost btn-icon">
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleUpload} className="modal-body space-y-4">
                <div>
                  <label className="text-xs font-semibold text-text-secondary">Document Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Passport Copy - 2026"
                    className="input w-full mt-1"
                    value={newDoc.title}
                    onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-text-secondary">Category</label>
                  <select
                    className="input w-full mt-1"
                    value={newDoc.type}
                    onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
                  >
                    <option value="Contract">Employment Contract</option>
                    <option value="Visa">Residence Visa</option>
                    <option value="ID Card">Emirates ID / National ID</option>
                    <option value="Legal">Legal NDA / Policy</option>
                    <option value="Insurance">Health Insurance</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-text-secondary">Expiry Date</label>
                  <input
                    type="date"
                    className="input w-full mt-1"
                    value={newDoc.expiryDate}
                    onChange={(e) => setNewDoc({ ...newDoc, expiryDate: e.target.value })}
                  />
                </div>

                {/* Drag and Drop Zone */}
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-gold transition-colors cursor-pointer bg-ivory">
                  <UploadCloud size={28} className="mx-auto text-text-secondary mb-2" />
                  <p className="text-xs font-semibold text-text-primary">Click to select PDF or image</p>
                  <p className="text-[10px] text-text-secondary mt-0.5">Max size 25MB (PDF, PNG, JPG)</p>
                </div>

                <div className="modal-footer pt-2">
                  <button type="button" onClick={() => setShowUploadModal(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-dark">
                    Save Document
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
};

export default Documents;
