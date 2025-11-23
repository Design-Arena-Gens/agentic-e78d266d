import { Expense, AIAdvice, MonthlyReport, SavingsGoal } from '@/types';

export const generateAIAdvice = (
  monthlyReport: MonthlyReport,
  goals: SavingsGoal[]
): AIAdvice[] => {
  const advice: AIAdvice[] = [];
  const timestamp = new Date().toISOString();

  // Spending alerts
  if (monthlyReport.totalExpenses > monthlyReport.totalIncome) {
    advice.push({
      id: `warning-${Date.now()}-1`,
      type: 'warning',
      message: `⚠️ You're spending $${(monthlyReport.totalExpenses - monthlyReport.totalIncome).toFixed(2)} more than you earn this month. Consider reducing non-essential expenses.`,
      timestamp,
    });
  }

  // Category-specific advice
  monthlyReport.categories.forEach(category => {
    if (category.percentage > 40 && category.name !== 'Housing') {
      advice.push({
        id: `warning-${Date.now()}-${category.name}`,
        type: 'warning',
        message: `💸 ${category.name} accounts for ${category.percentage.toFixed(0)}% of your spending ($${category.amount.toFixed(2)}). Try to reduce this category.`,
        category: category.name,
        timestamp,
      });
    }
  });

  // Positive savings
  if (monthlyReport.netSavings > 0) {
    const savingsRate = (monthlyReport.netSavings / monthlyReport.totalIncome) * 100;
    if (savingsRate > 20) {
      advice.push({
        id: `achievement-${Date.now()}-1`,
        type: 'achievement',
        message: `🎉 Great job! You saved ${savingsRate.toFixed(0)}% of your income this month ($${monthlyReport.netSavings.toFixed(2)}). Keep it up!`,
        timestamp,
      });
    } else {
      advice.push({
        id: `tip-${Date.now()}-1`,
        type: 'tip',
        message: `💡 You saved $${monthlyReport.netSavings.toFixed(2)} this month. Try to increase your savings rate to 20% for better financial health.`,
        timestamp,
      });
    }
  }

  // Goals advice
  goals.forEach(goal => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;
    const remaining = goal.targetAmount - goal.currentAmount;

    if (progress >= 100) {
      advice.push({
        id: `achievement-${Date.now()}-goal-${goal.id}`,
        type: 'achievement',
        message: `🎯 Congratulations! You've reached your "${goal.name}" goal of $${goal.targetAmount.toFixed(2)}!`,
        timestamp,
      });
    } else if (progress >= 75) {
      advice.push({
        id: `tip-${Date.now()}-goal-${goal.id}`,
        type: 'tip',
        message: `🎯 You're ${progress.toFixed(0)}% of the way to "${goal.name}". Just $${remaining.toFixed(2)} more to go!`,
        timestamp,
      });
    } else {
      const daysUntil = Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
      if (daysUntil > 0 && monthlyReport.netSavings > 0) {
        const monthlyNeeded = remaining / Math.max(1, daysUntil / 30);
        if (monthlyNeeded > monthlyReport.netSavings) {
          advice.push({
            id: `tip-${Date.now()}-goal-${goal.id}`,
            type: 'tip',
            message: `💰 To reach "${goal.name}" by ${new Date(goal.deadline).toLocaleDateString()}, save $${monthlyNeeded.toFixed(2)}/month (currently saving $${monthlyReport.netSavings.toFixed(2)}/month).`,
            timestamp,
          });
        }
      }
    }
  });

  // General tips
  if (advice.length === 0) {
    advice.push({
      id: `tip-${Date.now()}-general`,
      type: 'tip',
      message: `💡 Pro tip: Track every expense to gain better control over your finances. Small purchases add up quickly!`,
      timestamp,
    });
  }

  return advice;
};

export const generateSmartInsights = (expenses: Expense[]): string[] => {
  const insights: string[] = [];

  // Find most expensive category
  const categoryTotals = new Map<string, number>();
  expenses.forEach(e => {
    if (e.type === 'expense') {
      categoryTotals.set(e.category, (categoryTotals.get(e.category) || 0) + e.amount);
    }
  });

  if (categoryTotals.size > 0) {
    const topCategory = Array.from(categoryTotals.entries())
      .sort((a, b) => b[1] - a[1])[0];
    insights.push(`Your top spending category is ${topCategory[0]} at $${topCategory[1].toFixed(2)}`);
  }

  // Average daily spending
  if (expenses.length > 0) {
    const totalExpenses = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
    const avgDaily = totalExpenses / 30;
    insights.push(`Your average daily spending is $${avgDaily.toFixed(2)}`);
  }

  return insights;
};
