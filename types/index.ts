export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'expense' | 'income';
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
}

export interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface MonthlyReport {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  categories: CategoryData[];
  expenses: Expense[];
}

export interface AIAdvice {
  id: string;
  type: 'warning' | 'tip' | 'achievement';
  message: string;
  category?: string;
  timestamp: string;
}
