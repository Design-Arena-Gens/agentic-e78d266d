import React from 'react';
import { AIAdvice, MonthlyReport, Expense } from '@/types';
import { Sparkles, AlertTriangle, Lightbulb, Award } from 'lucide-react';

interface AIAdvisorProps {
  advice: AIAdvice[];
  monthlyReport: MonthlyReport;
  expenses: Expense[];
}

export default function AIAdvisor({ advice, monthlyReport, expenses }: AIAdvisorProps) {
  const getAdviceIcon = (type: AIAdvice['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-orange-500" />;
      case 'tip':
        return <Lightbulb className="h-6 w-6 text-blue-500" />;
      case 'achievement':
        return <Award className="h-6 w-6 text-green-500" />;
    }
  };

  const getAdviceColor = (type: AIAdvice['type']) => {
    switch (type) {
      case 'warning':
        return 'border-l-orange-500 bg-orange-50';
      case 'tip':
        return 'border-l-blue-500 bg-blue-50';
      case 'achievement':
        return 'border-l-green-500 bg-green-50';
    }
  };

  // Quick Stats
  const totalExpenses = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
            <Sparkles className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">AI Financial Advisor</h1>
            <p className="text-blue-100 mt-1">Personalized insights powered by intelligent analysis</p>
          </div>
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sm opacity-90 mb-1">Financial Health Score</p>
            <p className="text-3xl font-bold">
              {savingsRate > 20 ? '🟢' : savingsRate > 10 ? '🟡' : '🔴'} {savingsRate > 0 ? Math.min(100, Math.round(savingsRate * 3)).toString() : '0'}/100
            </p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sm opacity-90 mb-1">Savings Rate</p>
            <p className="text-3xl font-bold">{savingsRate.toFixed(1)}%</p>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <p className="text-sm opacity-90 mb-1">Insights Generated</p>
            <p className="text-3xl font-bold">{advice.length}</p>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Your Personalized Insights</h2>

        {advice.length === 0 ? (
          <div className="text-center py-12">
            <Sparkles className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-lg text-gray-600 mb-2">No insights available yet</p>
            <p className="text-sm text-gray-400">Add some transactions to get personalized advice!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {advice.map((item) => (
              <div
                key={item.id}
                className={`border-l-4 ${getAdviceColor(item.type)} rounded-r-lg p-4 transition-all hover:shadow-md`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">{getAdviceIcon(item.type)}</div>
                  <div className="flex-1">
                    <p className="text-gray-800 leading-relaxed">{item.message}</p>
                    {item.category && (
                      <span className="inline-block mt-2 px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-600">
                        {item.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Smart Recommendations */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Smart Recommendations</h2>

        <div className="space-y-4">
          <RecommendationCard
            title="Track Daily Expenses"
            description="Log every purchase to identify spending patterns and opportunities for savings."
            icon="📊"
          />
          <RecommendationCard
            title="Set Budget Limits"
            description="Create category-specific budgets to control spending and avoid overspending."
            icon="🎯"
          />
          <RecommendationCard
            title="Build Emergency Fund"
            description="Aim to save 3-6 months of expenses for financial security and peace of mind."
            icon="🛡️"
          />
          <RecommendationCard
            title="Review Monthly Reports"
            description="Analyze your spending trends regularly to make informed financial decisions."
            icon="📈"
          />
        </div>
      </div>

      {/* Financial Tips */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">💡 Pro Tips</h3>
        <ul className="space-y-3">
          <li className="flex items-start space-x-2">
            <span className="text-2xl">•</span>
            <span>Use the 50/30/20 rule: 50% needs, 30% wants, 20% savings</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-2xl">•</span>
            <span>Automate your savings to build wealth consistently</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-2xl">•</span>
            <span>Review subscriptions monthly and cancel unused services</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-2xl">•</span>
            <span>Cook at home more often to reduce food expenses significantly</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

function RecommendationCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}
