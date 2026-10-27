/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Global State (Zustand)
   ══════════════════════════════════════════════════════════════ */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { employees as initialEmployees } from '../data/employees';

const useStore = create(
  persist(
    (set, get) => ({
      /* ── App State ── */
      sidebarOpen: false,
      currentModule: 'dashboard',
      splashDone: false,
      setSplashDone: (val) => set({ splashDone: val }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (val) => set({ sidebarOpen: val }),
      setCurrentModule: (mod) => set({ currentModule: mod }),

      /* ── Auth State ── */
      isAuthenticated: true,
      currentUser: {
        id: 'EMP001',
        name: 'Swafvan Hassan',
        email: 'swafvan.hassan@novapulse.ae',
        role: 'HR Lead & Admin',
        department: 'Design',
        location: 'Dubai, UAE',
      },
      login: (userData) =>
        set({
          isAuthenticated: true,
          currentUser: userData || {
            id: 'EMP001',
            name: 'Swafvan Hassan',
            email: 'swafvan.hassan@novapulse.ae',
            role: 'HR Lead & Admin',
            department: 'Design',
            location: 'Dubai, UAE',
          },
        }),
      logout: () =>
        set({
          isAuthenticated: false,
        }),

      /* ── Employees ── */
      employees: initialEmployees,
      addEmployee: (emp) =>
        set((s) => ({ employees: [emp, ...s.employees] })),
      updateEmployee: (id, data) =>
        set((s) => ({
          employees: s.employees.map((e) =>
            e.id === id ? { ...e, ...data } : e
          ),
        })),
      deleteEmployee: (id) =>
        set((s) => ({
          employees: s.employees.filter((e) => e.id !== id),
        })),

      /* ── Leave Requests ── */
      leaveRequests: [
        {
          id: 'LR001', employeeId: 'EMP003', employeeName: 'Lena Park',
          type: 'Annual Leave', startDate: '2026-10-28', endDate: '2026-11-01',
          days: 5, reason: 'Family visit to Seoul', status: 'Pending',
          appliedDate: '2026-10-22',
        },
        {
          id: 'LR002', employeeId: 'EMP006', employeeName: 'Kai Tanaka',
          type: 'Sick Leave', startDate: '2026-10-20', endDate: '2026-10-21',
          days: 2, reason: 'Medical appointment', status: 'Approved',
          appliedDate: '2026-10-19',
        },
        {
          id: 'LR003', employeeId: 'EMP008', employeeName: 'Omar Haddad',
          type: 'Annual Leave', startDate: '2026-11-10', endDate: '2026-11-15',
          days: 4, reason: 'Personal travel', status: 'Pending',
          appliedDate: '2026-10-21',
        },
        {
          id: 'LR004', employeeId: 'EMP001', employeeName: 'Swafvan Hassan',
          type: 'Sick Leave', startDate: '2026-10-15', endDate: '2026-10-15',
          days: 1, reason: 'Not feeling well', status: 'Approved',
          appliedDate: '2026-10-14',
        },
        {
          id: 'LR005', employeeId: 'EMP005', employeeName: 'Sofia Marin',
          type: 'Annual Leave', startDate: '2026-12-20', endDate: '2026-12-31',
          days: 8, reason: 'Christmas vacation', status: 'Rejected',
          appliedDate: '2026-10-10',
        },
      ],
      addLeaveRequest: (req) =>
        set((s) => ({ leaveRequests: [req, ...s.leaveRequests] })),
      updateLeaveRequest: (id, data) =>
        set((s) => ({
          leaveRequests: s.leaveRequests.map((r) =>
            r.id === id ? { ...r, ...data } : r
          ),
        })),

      /* ── Expense Claims ── */
      expenseClaims: [
        {
          id: 'EXP001', employeeId: 'EMP008', employeeName: 'Omar Haddad',
          category: 'Travel', description: 'Client meeting travel - Abu Dhabi',
          amount: 2450, date: '2026-10-18', status: 'Pending',
          receipt: 'receipt_001.pdf',
        },
        {
          id: 'EXP002', employeeId: 'EMP007', employeeName: 'Ines Duarte',
          category: 'Meals', description: 'Team lunch - recruitment event',
          amount: 890, date: '2026-10-15', status: 'Approved',
          receipt: 'receipt_002.pdf',
        },
        {
          id: 'EXP003', employeeId: 'EMP011', employeeName: 'Tariq Mansoor',
          category: 'Office Supplies', description: 'Ergonomic keyboard & mouse',
          amount: 650, date: '2026-10-12', status: 'Approved',
          receipt: 'receipt_003.pdf',
        },
      ],
      addExpenseClaim: (claim) =>
        set((s) => ({ expenseClaims: [claim, ...s.expenseClaims] })),
      updateExpenseClaim: (id, data) =>
        set((s) => ({
          expenseClaims: s.expenseClaims.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        })),

      /* ── Toasts ── */
      toasts: [],
      addToast: (toast) =>
        set((s) => ({
          toasts: [...s.toasts, { ...toast, id: Date.now() }],
        })),
      removeToast: (id) =>
        set((s) => ({
          toasts: s.toasts.filter((t) => t.id !== id),
        })),

      /* ── UI ── */
      activeModal: null,
      modalData: null,
      openModal: (name, data = null) => set({ activeModal: name, modalData: data }),
      closeModal: () => set({ activeModal: null, modalData: null }),
    }),
    {
      name: 'novapulse-hrms-store',
      partialize: (state) => ({
        employees: state.employees,
        leaveRequests: state.leaveRequests,
        expenseClaims: state.expenseClaims,
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
      }),
    }
  )
);

export default useStore;
