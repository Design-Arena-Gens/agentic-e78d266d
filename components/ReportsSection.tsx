import React, { useState } from 'react';
import { MonthlyReport, Expense } from '@/types';
import { Download, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { exportToExcel, exportToPDF } from '@/lib/export';
import { format } from 'date-fns';

interface ReportsSectionProps {
  monthlyReport: MonthlyReport;
  weeklyReport: MonthlyReport;
  trendData: any[];
  expenses: Expense[];
}

export default function ReportsSection({ monthlyReport, weeklyReport, trendData, expenses }: ReportsSectionProps) {
  const [reportType, setReportType] = useState<'monthly' | 'weekly'>('monthly');
  const currentReport = reportType === 'monthly' ? monthlyReport : weeklyReport;

  const handleExportExcel = () => {
    exportToExcel(expenses, `smartspend-expenses-${Date.now()}.xlsx`);
  };

  const handleExportPDF = () => {
    const month = format(new Date(), 'MMMM yyyy');
    exportToPDF(monthlyReport, month, `smartspend-report-${Date.now()}.pdf`);
  };

  // Prepare category bar chart data
  const categoryChartData = currentReport.categories.map(cat => ({
    name: cat.name,
    amount: cat.amount,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Financial Reports</h1>
            <p className="text-gray-600 mt-1">Comprehensive analysis of your finances</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExportExcel}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export Excel</span>
            </button>
            <button
              onClick={handleExportPDF}
              className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Report Type Toggle */}
        <div className="flex gap-2 mt-6">
          <button
            onClick={() => setReportType('monthly')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              reportType === 'monthly'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Monthly Report
          </button>
          <button
            onClick={() => setReportType('weekly')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              reportType === 'weekly'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Weekly Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Income"
          value={`$${currentReport.totalIncome.toFixed(2)}`}
          icon={<TrendingUp className="h-6 w-6" />}
          gradient="from-green-500 to-emerald-600"
          change={null}
        />
        <SummaryCard
          title="Total Expenses"
          value={`$${currentReport.totalExpenses.toFixed(2)}`}
          icon={<DollarSign className="h-6 w-6" />}
          gradient="from-red-500 to-pink-600"
          change={null}
        />
        <SummaryCard
          title="Net Savings"
          value={`$${currentReport.netSavings.toFixed(2)}`}
          icon={<Calendar className="h-6 w-6" />}
          gradient="from-blue-500 to-cyan-600"
          change={currentReport.totalIncome > 0 ? `${((currentReport.netSavings / currentReport.totalIncome) * 100).toFixed(1)}% rate` : null}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Spending by Category</h2>
          {categoryChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={100} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: any) => `$${value.toFixed(2)}`}
                />
                <Bar dataKey="amount" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-400">
              No data available
            </div>
          )}
        </div>

        {/* Category Pie Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Category Distribution</h2>
          {currentReport.categories.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={currentReport.categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage.toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {currentReport.categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  formatter={(value: any) => `$${value.toFixed(2)}`}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-400">
              No data available
            </div>
          )}
        </div>
      </div>

      {/* Trend Analysis */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">6-Month Financial Trend</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
              formatter={(value: any) => `$${value.toFixed(2)}`}
            />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} name="Income" dot={{ r: 5 }} />
            <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={3} name="Expenses" dot={{ r: 5 }} />
            <Line type="monotone" dataKey="savings" stroke="#3B82F6" strokeWidth={3} name="Savings" dot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Category Breakdown</h2>
        <div className="space-y-3">
          {currentReport.categories.map((category) => (
            <div key={category.name} className="flex items-center space-x-4">
              <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: category.color }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-700">{category.name}</span>
                  <span className="text-gray-900 font-semibold">${category.amount.toFixed(2)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${category.percentage}%`,
                      backgroundColor: category.color,
                    }}
                  />
                </div>
              </div>
              <span className="text-sm text-gray-600 font-medium w-12 text-right">
                {category.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon, gradient, change }: any) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`bg-gradient-to-r ${gradient} p-4 text-white`}>
        {icon}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        {change && <p className="text-xs text-gray-500 mt-1">{change}</p>}
      </div>
    </div>
  );
}
