'use client';

import { useState, useEffect } from 'react';
import { Expense, SavingsGoal, AIAdvice } from '@/types';
import { storage } from '@/lib/storage';
import { calculateMonthlyReport, calculateWeeklyReport, getSpendingTrend } from '@/lib/analytics';
import { generateAIAdvice } from '@/lib/ai-advisor';
import Dashboard from '@/components/Dashboard';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import GoalsSection from '@/components/GoalsSection';
import AIAdvisor from '@/components/AIAdvisor';
import ReportsSection from '@/components/ReportsSection';
import Header from '@/components/Header';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses' | 'goals' | 'reports' | 'ai'>('dashboard');
  const [aiAdvice, setAiAdvice] = useState<AIAdvice[]>([]);

  useEffect(() => {
    setExpenses(storage.getExpenses());
    setGoals(storage.getGoals());
  }, []);

  useEffect(() => {
    const report = calculateMonthlyReport(expenses);
    const advice = generateAIAdvice(report, goals);
    setAiAdvice(advice);
  }, [expenses, goals]);

  const handleAddExpense = (expense: Expense) => {
    storage.addExpense(expense);
    setExpenses(storage.getExpenses());
  };

  const handleDeleteExpense = (id: string) => {
    storage.deleteExpense(id);
    setExpenses(storage.getExpenses());
  };

  const handleAddGoal = (goal: SavingsGoal) => {
    storage.addGoal(goal);
    setGoals(storage.getGoals());
  };

  const handleUpdateGoal = (id: string, updates: Partial<SavingsGoal>) => {
    storage.updateGoal(id, updates);
    setGoals(storage.getGoals());
  };

  const handleDeleteGoal = (id: string) => {
    storage.deleteGoal(id);
    setGoals(storage.getGoals());
  };

  const monthlyReport = calculateMonthlyReport(expenses);
  const weeklyReport = calculateWeeklyReport(expenses);
  const trendData = getSpendingTrend(expenses);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard
            monthlyReport={monthlyReport}
            weeklyReport={weeklyReport}
            trendData={trendData}
            goals={goals}
            aiAdvice={aiAdvice.slice(0, 3)}
          />
        )}

        {activeTab === 'expenses' && (
          <div className="space-y-8">
            <ExpenseForm onAddExpense={handleAddExpense} />
            <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
          </div>
        )}

        {activeTab === 'goals' && (
          <GoalsSection
            goals={goals}
            onAddGoal={handleAddGoal}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
            currentSavings={monthlyReport.netSavings}
          />
        )}

        {activeTab === 'reports' && (
          <ReportsSection
            monthlyReport={monthlyReport}
            weeklyReport={weeklyReport}
            trendData={trendData}
            expenses={expenses}
          />
        )}

        {activeTab === 'ai' && (
          <AIAdvisor
            advice={aiAdvice}
            monthlyReport={monthlyReport}
            expenses={expenses}
          />
        )}
      </main>
    </div>
  );
}
