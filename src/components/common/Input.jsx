import React from 'react';

export function Input({
  label,
  error,
  helperText,
  id,
  className = '',
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full px-4 py-2.5 rounded-xl text-sm bg-navy-900 border ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500'
        } text-white placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20 ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400 mt-1 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400 mt-1">{helperText}</p>}
    </div>
  );
}

export function Textarea({
  label,
  error,
  helperText,
  id,
  rows = 4,
  className = '',
  ...props
}) {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        className={`w-full px-4 py-3 rounded-xl text-sm bg-navy-900 border ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-blue-500 focus:ring-blue-500'
        } text-white placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20 ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400 mt-1 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-400 mt-1">{helperText}</p>}
    </div>
  );
}
