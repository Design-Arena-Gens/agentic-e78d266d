import React from 'react';
import { MonthlyReport, SavingsGoal, AIAdvice } from '@/types';
import { TrendingUp, TrendingDown, DollarSign, PiggyBank, Award } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface DashboardProps {
  monthlyReport: MonthlyReport;
  weeklyReport: MonthlyReport;
  trendData: any[];
  goals: SavingsGoal[];
  aiAdvice: AIAdvice[];
}

export default function Dashboard({ monthlyReport, weeklyReport, trendData, goals, aiAdvice }: DashboardProps) {
  const savingsRate = monthlyReport.totalIncome > 0
    ? ((monthlyReport.netSavings / monthlyReport.totalIncome) * 100).toFixed(1)
    : '0';

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Income"
          value={`$${monthlyReport.totalIncome.toFixed(2)}`}
          icon={<DollarSign className="h-8 w-8" />}
          gradient="from-green-500 to-emerald-600"
          subtitle="This month"
        />
        <StatCard
          title="Total Expenses"
          value={`$${monthlyReport.totalExpenses.toFixed(2)}`}
          icon={<TrendingDown className="h-8 w-8" />}
          gradient="from-red-500 to-pink-600"
          subtitle="This month"
        />
        <StatCard
          title="Net Savings"
          value={`$${monthlyReport.netSavings.toFixed(2)}`}
          icon={<PiggyBank className="h-8 w-8" />}
          gradient="from-blue-500 to-cyan-600"
          subtitle={`${savingsRate}% savings rate`}
        />
        <StatCard
          title="Active Goals"
          value={goals.length.toString()}
          icon={<Award className="h-8 w-8" />}
          gradient="from-purple-500 to-indigo-600"
          subtitle={`${goals.filter(g => (g.currentAmount / g.targetAmount) * 100 >= 100).length} completed`}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trend */}
        <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">6-Month Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
              />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} name="Income" />
              <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} name="Expenses" />
              <Line type="monotone" dataKey="savings" stroke="#3B82F6" strokeWidth={2} name="Savings" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Spending by Category</h2>
          {monthlyReport.categories.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={monthlyReport.categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage.toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                >
                  {monthlyReport.categories.map((entry, index) => (
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
            <div className="flex items-center justify-center h-[250px] text-gray-400">
              No expense data yet
            </div>
          )}
        </div>
      </div>

      {/* AI Insights */}
      {aiAdvice.length > 0 && (
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-6 w-6" />
            <h2 className="text-lg font-semibold">AI Insights</h2>
          </div>
          <div className="space-y-3">
            {aiAdvice.map((advice) => (
              <div key={advice.id} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                <p className="text-sm">{advice.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Goals Progress */}
      {goals.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Savings Goals</h2>
          <div className="space-y-4">
            {goals.slice(0, 3).map((goal) => {
              const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
              return (
                <div key={goal.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-700">{goal.name}</span>
                    <span className="text-gray-600">
                      ${goal.currentAmount.toFixed(0)} / ${goal.targetAmount.toFixed(0)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, gradient, subtitle }: any) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      <div className={`bg-gradient-to-r ${gradient} p-4 text-white`}>
        {icon}
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
