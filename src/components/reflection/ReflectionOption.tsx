import React from 'react';
import { cn } from '../../lib/utils.js';

export interface ReflectionOptionProps {
  key?: React.Key;
  id: string;
  name: string;
  value: string;
  label: string;
  selected: boolean;
  onSelect: (value: string) => void;
  className?: string;
}

export function ReflectionOption({
  id,
  name,
  value,
  label,
  selected,
  onSelect,
  className,
}: ReflectionOptionProps): React.JSX.Element {
  return (
    <label
      htmlFor={id}
      className={cn(
        'group relative flex items-start gap-3.5 p-4 rounded-xl border transition-all duration-150 cursor-pointer select-none text-left focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2',
        selected
          ? 'bg-blue-50/80 border-blue-400 text-blue-950 font-medium ring-1 ring-blue-300 shadow-xs'
          : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200/80 text-slate-800 hover:border-slate-300',
        className
      )}
    >
      {/* Visual Radio Disc */}
      <div className="flex items-center justify-center h-5 w-5 rounded-full border border-slate-300 bg-white group-hover:border-slate-400 mt-0.5 shrink-0 transition-colors">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={selected}
          onChange={() => onSelect(value)}
          className="sr-only"
          aria-checked={selected}
        />
        {selected && <div className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-in zoom-in-75 duration-150" />}
      </div>

      {/* Label Text */}
      <span className="text-sm sm:text-base leading-snug flex-1">{label}</span>
    </label>
  );
}
