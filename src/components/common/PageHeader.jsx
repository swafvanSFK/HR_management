

import { Search, X } from 'lucide-react';

export default function PageHeader({
  title,
  subtitle,
  badge,
  search,
  onSearchChange,
  searchPlaceholder = 'Search records...',
  showSearch = false,
  actions,
  className = '',
  children,
}) {
  const hasSearch = showSearch || onSearchChange !== undefined;

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 ${className}`}>
      {/* Title & Subtitle */}
      <div className="min-w-0">
        <div className="flex items-center gap-2.5">
          <h1 className="page-title text-2xl sm:text-[32px] font-light tracking-tight text-charcoal leading-tight">
            {title}
          </h1>
          {badge && (
            <span className="badge badge-neutral text-xs font-medium">
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-text-secondary mt-1 leading-normal max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Controls: Search + Actions */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
        {hasSearch && (
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none select-none"
            />
            <input
              type="text"
              value={search ?? ''}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="pl-9 pr-8 py-2 rounded-full bg-white text-xs w-56 sm:w-64 shadow-2xs focus:outline-none focus:border-charcoal placeholder:text-text-secondary transition-all"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange && onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-secondary hover:text-charcoal p-0.5 rounded-full transition-colors"
                title="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>
        )}

        {actions}
        {children}
      </div>
    </div>
  );
}
