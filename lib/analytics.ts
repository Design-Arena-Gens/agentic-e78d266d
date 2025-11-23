import { Expense, CategoryData, MonthlyReport } from '@/types';
import { startOfMonth, endOfMonth, isWithinInterval, startOfWeek, endOfWeek } from 'date-fns';
import { getCategoryColor } from './categories';

export const calculateMonthlyReport = (expenses: Expense[], date: Date = new Date()): MonthlyReport => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);

  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return isWithinInterval(expenseDate, { start: monthStart, end: monthEnd });
  });

  const totalIncome = monthlyExpenses
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = monthlyExpenses
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const categoryMap = new Map<string, number>();

  monthlyExpenses
    .filter(e => e.type === 'expense')
    .forEach(expense => {
      const current = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, current + expense.amount);
    });

  const categories: CategoryData[] = Array.from(categoryMap.entries())
    .map(([name, amount]) => ({
      name,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      color: getCategoryColor(name),
    }))
    .sort((a, b) => b.amount - a.amount);

  return {
    totalIncome,
    totalExpenses,
    netSavings: totalIncome - totalExpenses,
    categories,
    expenses: monthlyExpenses,
  };
};

export const calculateWeeklyReport = (expenses: Expense[], date: Date = new Date()): MonthlyReport => {
  const weekStart = startOfWeek(date);
  const weekEnd = endOfWeek(date);

  const weeklyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return isWithinInterval(expenseDate, { start: weekStart, end: weekEnd });
  });

  const totalIncome = weeklyExpenses
    .filter(e => e.type === 'income')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = weeklyExpenses
    .filter(e => e.type === 'expense')
    .reduce((sum, e) => sum + e.amount, 0);

  const categoryMap = new Map<string, number>();

  weeklyExpenses
    .filter(e => e.type === 'expense')
    .forEach(expense => {
      const current = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, current + expense.amount);
    });

  const categories: CategoryData[] = Array.from(categoryMap.entries())
    .map(([name, amount]) => ({
      name,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      color: getCategoryColor(name),
    }))
    .sort((a, b) => b.amount - a.amount);

  return {
    totalIncome,
    totalExpenses,
    netSavings: totalIncome - totalExpenses,
    categories,
    expenses: weeklyExpenses,
  };
};

export const getSpendingTrend = (expenses: Expense[], months: number = 6) => {
  const now = new Date();
  const data = [];

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const report = calculateMonthlyReport(expenses, date);

    data.push({
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      income: report.totalIncome,
      expenses: report.totalExpenses,
      savings: report.netSavings,
    });
  }

  return data;
};
