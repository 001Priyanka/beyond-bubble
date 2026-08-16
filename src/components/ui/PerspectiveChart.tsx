import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import { Table, BarChart2, PieChart as PieIcon } from 'lucide-react';
import { cn } from '../../lib/utils.js';

export interface PerspectiveDataPoint {
  category: string;
  count: number;
  percentage: number;
  color: string;
  description: string;
}

export interface PerspectiveChartProps {
  title: string;
  description?: string;
  data: PerspectiveDataPoint[];
  chartType?: 'bar' | 'pie';
  className?: string;
}

export function PerspectiveChart({
  title,
  description,
  data,
  chartType: initialType = 'bar',
  className,
  ...props
}: PerspectiveChartProps & React.HTMLAttributes<HTMLDivElement>) {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [chartType, setChartType] = useState<'bar' | 'pie'>(initialType);

  return (
    <div
      className={cn('bg-white border border-slate-200 rounded-xl p-5 shadow-xs text-left', className)}
      {...props}
    >
      {/* Header with Accessibility Toggle */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h4 className="text-sm font-bold text-slate-900 leading-snug">{title}</h4>
          {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => { setViewMode('chart'); setChartType('bar'); }}
            className={cn(
              'px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1',
              viewMode === 'chart' && chartType === 'bar'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            )}
            aria-label="View as bar chart"
          >
            <BarChart2 className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Bars</span>
          </button>
          <button
            type="button"
            onClick={() => { setViewMode('chart'); setChartType('pie'); }}
            className={cn(
              'px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1',
              viewMode === 'chart' && chartType === 'pie'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            )}
            aria-label="View as donut chart"
          >
            <PieIcon className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Donut</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={cn(
              'px-2 py-1 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1',
              viewMode === 'table'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-500 hover:text-slate-900'
            )}
            aria-label="View as accessible data table"
          >
            <Table className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Table</span>
          </button>
        </div>
      </div>

      {/* Visual Chart or Accessible Table View */}
      {viewMode === 'chart' ? (
        <div className="h-56 w-full pt-2">
          {chartType === 'bar' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis
                  dataKey="category"
                  tick={{ fontSize: 11, fill: '#475569' }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis tick={{ fontSize: 11, fill: '#475569' }} unit="%" />
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as PerspectiveDataPoint;
                      return (
                        <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-lg">
                          <div className="font-bold">{item.category}</div>
                          <div className="text-slate-300 mt-0.5">Share: {item.percentage}% ({item.count} items)</div>
                          <div className="text-slate-400 text-[10px] mt-1 italic">{item.description}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="percentage" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="percentage"
                  nameKey="category"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-pie-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload as PerspectiveDataPoint;
                      return (
                        <div className="bg-slate-900 text-white text-xs p-2 rounded-lg shadow-md">
                          <span className="font-bold">{item.category}:</span> {item.percentage}%
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      ) : (
        /* Accessible Table Fallback */
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700">
                <th className="p-2 font-semibold">Perspective Category</th>
                <th className="p-2 font-semibold text-right">Items Seen</th>
                <th className="p-2 font-semibold text-right">Share (%)</th>
                <th className="p-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/60">
                  <td className="p-2 font-medium flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: row.color }}
                      aria-hidden="true"
                    />
                    <span>{row.category}</span>
                  </td>
                  <td className="p-2 text-right font-mono text-slate-600">{row.count}</td>
                  <td className="p-2 text-right font-mono font-bold text-slate-900">{row.percentage}%</td>
                  <td className="p-2 text-slate-500 text-[11px]">{row.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
