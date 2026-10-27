/* ══════════════════════════════════════════════════════════════
   NovaPulse HRMS – Reusable Enterprise DataTable Component
   Simple usage: <DataTable headers={headers} data={items} />
   Custom usage: <DataTable columns={columns} data={items} sortable pagination ... />
   Features:
   - Auto-resolves column keys from objects or 'col1', 'col2' etc.
   - Built-in status badge formatting for known status values
   - AnimatedTableRow integration for smooth staggered animations
   - Sorting, pagination, empty state, and row click callbacks
   ══════════════════════════════════════════════════════════════ */

import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, ChevronLeft, ChevronRight, Inbox, Check } from 'lucide-react';
import AnimatedTableRow from '../animations/AnimatedTableRow';

// Status badge helper
const isStatusValue = (val) => {
  if (typeof val !== 'string') return false;
  const statuses = [
    'active', 'valid', 'approved', 'ready', 'settled', 'completed', 'paid', 'on track', 'achieved',
    'pending', 'in review', 'expiring soon', 'in renewal', 'lease renewal', 'in progress', 'processing',
    'away', 'on leave', 'rejected', 'expired', 'new', 'unpaid', 'cancelled', 'terminated'
  ];
  return statuses.includes(val.toLowerCase().trim());
};

const getStatusBadgeClass = (val) => {
  const s = String(val).toLowerCase().trim();
  if (['active', 'valid', 'approved', 'ready', 'settled', 'completed', 'paid', 'on track', 'achieved'].some(x => s.includes(x))) {
    return 'badge-success badge-dot';
  }
  if (['pending', 'in review', 'expiring soon', 'in renewal', 'lease renewal', 'in progress', 'processing'].some(x => s.includes(x))) {
    return 'badge-warning badge-dot';
  }
  if (['away', 'on leave', 'unpaid'].some(x => s.includes(x))) {
    return 'badge-gold badge-dot';
  }
  if (['rejected', 'expired', 'cancelled', 'terminated'].some(x => s.includes(x))) {
    return 'badge-danger badge-dot';
  }
  return 'badge-neutral badge-dot';
};

export default function DataTable({
  headers,
  columns,
  data = [],
  sortable = false,
  pagination = false,
  pageSize = 10,
  onRowClick,
  rowClassName,
  emptyMessage = 'No records found',
  className = '',
  tableClassName = 'table',
  compact = false,
  showIndex = false,
  actions,
  selectable = false,
  selectedIds = [],
  onToggleSelect,
  onToggleSelectAll,
  rowKey = 'id',
}) {
  // Normalize columns
  const normalizedColumns = useMemo(() => {
    if (columns && columns.length > 0) {
      return columns.map((col, idx) => ({
        key: col.key || `col_${idx}`,
        header: col.header || col.label || col.title || '',
        align: col.align || (idx === columns.length - 1 ? 'right' : 'left'),
        render: col.render,
        className: col.className || '',
        sortable: col.sortable !== undefined ? col.sortable : sortable,
        width: col.width,
      }));
    }

    if (headers && headers.length > 0) {
      return headers.map((h, idx) => {
        const isHeaderObj = typeof h === 'object' && h !== null;
        const headerText = isHeaderObj ? h.label || h.header || '' : h;
        const key = isHeaderObj ? h.key : (data[0] && `col${idx + 1}` in data[0] ? `col${idx + 1}` : Object.keys(data[0] || {})[idx] || `col_${idx}`);
        
        return {
          key,
          header: headerText,
          align: (isHeaderObj && h.align) || (idx === headers.length - 1 ? 'right' : 'left'),
          render: isHeaderObj ? h.render : null,
          className: (isHeaderObj && h.className) || '',
          sortable: (isHeaderObj && h.sortable) || sortable,
          width: isHeaderObj ? h.width : undefined,
        };
      });
    }

    // Auto-detect from first data object
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      return keys.map((key, idx) => ({
        key,
        header: key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()),
        align: idx === keys.length - 1 ? 'right' : 'left',
        render: null,
        className: '',
        sortable,
      }));
    }

    return [];
  }, [columns, headers, data, sortable]);

  // Sorting state
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' | 'desc'

  const handleSort = (key) => {
    if (!sortable) return;
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  // Sorted data
  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      
      const comparison = typeof aVal === 'number' && typeof bVal === 'number'
        ? aVal - bVal
        : String(aVal).localeCompare(String(bVal));
        
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [data, sortKey, sortOrder]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = pagination ? Math.max(1, Math.ceil(sortedData.length / pageSize)) : 1;

  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, pagination, currentPage, pageSize]);

  const isAllSelected = data.length > 0 && selectedIds.length === data.length;
  const isSomeSelected = selectedIds.length > 0 && !isAllSelected;

  return (
    <div className={`w-full ${className}`}>
      <div className="table-container overflow-x-auto">
        <table className={`${tableClassName} ${compact ? 'table-compact' : ''}`}>
          <thead>
            <tr>
              {selectable && (
                <th className="w-10 py-2.5 px-3">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onToggleSelectAll) onToggleSelectAll();
                    }}
                    className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                      isAllSelected
                        ? 'bg-[#1C1B18] border-[#1C1B18] text-white'
                        : isSomeSelected
                        ? 'bg-gold border-gold text-[#1C1B18]'
                        : 'border-[#D4D1C8] bg-white hover:border-charcoal'
                    }`}
                    title={isAllSelected ? 'Deselect all' : 'Select all'}
                  >
                    {isAllSelected && <Check size={11} strokeWidth={3} />}
                    {isSomeSelected && <span className="w-2 h-0.5 bg-[#1C1B18] rounded-full" />}
                  </div>
                </th>
              )}
              {showIndex && <th className="w-12 text-center">#</th>}
              {normalizedColumns.map((col, idx) => {
                const isSortable = col.sortable;
                const isSorted = sortKey === col.key;

                return (
                  <th
                    key={col.key || idx}
                    style={{ width: col.width }}
                    className={`${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${
                      isSortable ? 'cursor-pointer hover:text-charcoal select-none' : ''
                    } ${col.className}`}
                    onClick={() => isSortable && handleSort(col.key)}
                  >
                    <div className={`inline-flex items-center gap-1.5 ${col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : 'justify-start'}`}>
                      <span>{col.header}</span>
                      {isSortable && (
                        <span className="text-text-secondary">
                          {isSorted ? (
                            sortOrder === 'asc' ? <ChevronUp size={13} /> : <ChevronDown size={13} />
                          ) : (
                            <ChevronsUpDown size={12} className="opacity-40" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
              {actions && <th className="text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={normalizedColumns.length + (showIndex ? 1 : 0) + (actions ? 1 : 0) + (selectable ? 1 : 0)}
                  className="py-12 text-center text-text-secondary"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#FAF9F5] border border-border flex items-center justify-center text-text-secondary">
                      <Inbox size={18} />
                    </div>
                    <span className="text-xs font-medium">{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIdx) => {
                const computedRowClass = typeof rowClassName === 'function' ? rowClassName(row, rowIdx) : rowClassName || '';
                const clickableClass = onRowClick ? 'cursor-pointer' : '';
                const rowIdValue = row[rowKey] ?? row.id ?? rowIdx;
                const isChecked = selectable && selectedIds.includes(rowIdValue);

                return (
                  <AnimatedTableRow
                    key={rowIdValue}
                    index={rowIdx}
                    isSelected={isChecked}
                    onClick={() => onRowClick && onRowClick(row, rowIdx)}
                    className={`hover:bg-[#FDFBF7] transition-colors ${
                      isChecked ? 'bg-highlight-row text-charcoal' : ''
                    } ${clickableClass} ${computedRowClass}`}
                  >
                    {selectable && (
                      <td className="w-10 py-3 px-3">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onToggleSelect) onToggleSelect(rowIdValue, e);
                          }}
                          className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-[#1C1B18] border-[#1C1B18] text-white shadow-xs'
                              : 'border-[#D4D1C8] bg-white hover:border-charcoal'
                          }`}
                          title={isChecked ? 'Deselect row' : 'Select row'}
                        >
                          {isChecked && <Check size={10} strokeWidth={3} />}
                        </div>
                      </td>
                    )}
                    {showIndex && (
                      <td className="w-12 text-center text-xs text-text-secondary font-mono">
                        {(currentPage - 1) * pageSize + rowIdx + 1}
                      </td>
                    )}

                    {normalizedColumns.map((col, colIdx) => {
                      const value = row[col.key];

                      let renderedCell;
                      if (typeof col.render === 'function') {
                        renderedCell = col.render(value, row, rowIdx);
                      } else if (isStatusValue(value)) {
                        renderedCell = (
                          <span className={`badge ${getStatusBadgeClass(value)}`}>
                            {value}
                          </span>
                        );
                      } else if (colIdx === 0 && !row.renderCol0) {
                        renderedCell = (
                          <span className="font-semibold text-sm text-text-primary">
                            {value ?? '—'}
                          </span>
                        );
                      } else {
                        renderedCell = (
                          <span className="text-sm text-[#5C5950]">
                            {value ?? '—'}
                          </span>
                        );
                      }

                      return (
                        <td
                          key={col.key || colIdx}
                          className={`${
                            col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                          } ${col.className}`}
                        >
                          {renderedCell}
                        </td>
                      );
                    })}

                    {actions && (
                      <td className="text-right">
                        {typeof actions === 'function' ? actions(row, rowIdx) : actions}
                      </td>
                    )}
                  </AnimatedTableRow>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-border-light text-xs text-text-secondary">
          <span>
            Showing {(currentPage - 1) * pageSize + 1} to{' '}
            {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} records
          </span>
          <div className="flex items-center gap-1.5">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center text-charcoal disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAF9F5] transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2 font-medium text-charcoal">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="w-7 h-7 rounded-lg bg-white border border-border flex items-center justify-center text-charcoal disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FAF9F5] transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
