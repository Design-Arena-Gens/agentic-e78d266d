import React, { useState } from 'react';
import { Expense } from '@/types';
import { getCategoryIcon, getCategoryColor } from '@/lib/categories';
import { Trash2, Search, Filter } from 'lucide-react';
import { format } from 'date-fns';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export default function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'expense' | 'income'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = Array.from(new Set(expenses.map(e => e.category)));

  const filteredExpenses = expenses
    .filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || expense.type === filterType;
      const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
      return matchesSearch && matchesType && matchesCategory;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Transaction History</h2>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Type and Category Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="expense">Expenses</option>
              <option value="income">Income</option>
            </select>
          </div>
          <div className="flex-1">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Expense List */}
      {filteredExpenses.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg mb-2">No transactions found</p>
          <p className="text-sm">Add your first transaction to get started!</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[600px] overflow-y-auto">
          {filteredExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-4 flex-1">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${getCategoryColor(expense.category)}20` }}
                >
                  {getCategoryIcon(expense.category)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{expense.description}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>{expense.category}</span>
                    <span>•</span>
                    <span>{format(new Date(expense.date), 'MMM dd, yyyy')}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`text-lg font-semibold ${
                    expense.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this transaction?')) {
                      onDeleteExpense(expense.id);
                    }
                  }}
                  className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary */}
      {filteredExpenses.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
              <p className="text-xl font-bold text-gray-800">{filteredExpenses.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
              <p className="text-xl font-bold text-red-600">
                ${filteredExpenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Income</p>
              <p className="text-xl font-bold text-green-600">
                ${filteredExpenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
