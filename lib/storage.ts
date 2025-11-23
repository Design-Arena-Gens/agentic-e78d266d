import { Expense, SavingsGoal } from '@/types';

const EXPENSES_KEY = 'smartspend_expenses';
const GOALS_KEY = 'smartspend_goals';

export const storage = {
  getExpenses: (): Expense[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(EXPENSES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveExpenses: (expenses: Expense[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
  },

  addExpense: (expense: Expense): void => {
    const expenses = storage.getExpenses();
    expenses.push(expense);
    storage.saveExpenses(expenses);
  },

  deleteExpense: (id: string): void => {
    const expenses = storage.getExpenses().filter(e => e.id !== id);
    storage.saveExpenses(expenses);
  },

  updateExpense: (id: string, updatedExpense: Partial<Expense>): void => {
    const expenses = storage.getExpenses();
    const index = expenses.findIndex(e => e.id === id);
    if (index !== -1) {
      expenses[index] = { ...expenses[index], ...updatedExpense };
      storage.saveExpenses(expenses);
    }
  },

  getGoals: (): SavingsGoal[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(GOALS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveGoals: (goals: SavingsGoal[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(GOALS_KEY, JSON.stringify(goals));
  },

  addGoal: (goal: SavingsGoal): void => {
    const goals = storage.getGoals();
    goals.push(goal);
    storage.saveGoals(goals);
  },

  updateGoal: (id: string, updatedGoal: Partial<SavingsGoal>): void => {
    const goals = storage.getGoals();
    const index = goals.findIndex(g => g.id === id);
    if (index !== -1) {
      goals[index] = { ...goals[index], ...updatedGoal };
      storage.saveGoals(goals);
    }
  },

  deleteGoal: (id: string): void => {
    const goals = storage.getGoals().filter(g => g.id !== id);
    storage.saveGoals(goals);
  },
};
