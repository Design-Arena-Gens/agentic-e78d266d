import React, { useState } from 'react';
import { SavingsGoal } from '@/types';
import { Target, Plus, Trash2, TrendingUp } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

interface GoalsSectionProps {
  goals: SavingsGoal[];
  onAddGoal: (goal: SavingsGoal) => void;
  onUpdateGoal: (id: string, updates: Partial<SavingsGoal>) => void;
  onDeleteGoal: (id: string) => void;
  currentSavings: number;
}

export default function GoalsSection({ goals, onAddGoal, onUpdateGoal, onDeleteGoal, currentSavings }: GoalsSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !targetAmount || !deadline) {
      alert('Please fill in all fields');
      return;
    }

    const newGoal: SavingsGoal = {
      id: Date.now().toString(),
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: 0,
      deadline,
      priority,
    };

    onAddGoal(newGoal);
    setName('');
    setTargetAmount('');
    setDeadline('');
    setPriority('medium');
    setShowForm(false);
  };

  const handleAddFunds = (goalId: string, amount: number) => {
    const goal = goals.find(g => g.id === goalId);
    if (goal) {
      onUpdateGoal(goalId, { currentAmount: goal.currentAmount + amount });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Savings Goals</h2>
            <p className="text-gray-600 mt-1">Track your financial objectives</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Goal</span>
          </button>
        </div>

        {/* Current Month Savings */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Available to Allocate</p>
              <p className="text-3xl font-bold mt-1">${currentSavings.toFixed(2)}</p>
              <p className="text-xs opacity-75 mt-1">This month's net savings</p>
            </div>
            <TrendingUp className="h-12 w-12 opacity-50" />
          </div>
        </div>
      </div>

      {/* Add Goal Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6 animate-slide-in">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Create New Goal</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Goal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="E.g., Emergency Fund, Vacation, New Car"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Amount</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex space-x-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Create Goal
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Goals List */}
      {goals.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <Target className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <p className="text-lg text-gray-600 mb-2">No savings goals yet</p>
          <p className="text-sm text-gray-400">Create your first goal to start tracking your progress!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
            const remaining = goal.targetAmount - goal.currentAmount;
            const daysLeft = differenceInDays(new Date(goal.deadline), new Date());
            const isCompleted = progress >= 100;

            const priorityColors = {
              low: 'from-gray-500 to-gray-600',
              medium: 'from-blue-500 to-blue-600',
              high: 'from-purple-500 to-purple-600',
            };

            return (
              <div key={goal.id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                <div className={`bg-gradient-to-r ${priorityColors[goal.priority]} p-4 text-white`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold">{goal.name}</h3>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this goal?')) {
                          onDeleteGoal(goal.id);
                        }
                      }}
                      className="text-white hover:text-red-200 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-sm opacity-90">
                    <span>Target: ${goal.targetAmount.toFixed(2)}</span>
                    <span>{daysLeft > 0 ? `${daysLeft} days left` : 'Expired'}</span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-gray-700">Progress</span>
                      <span className="text-gray-600">{progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`bg-gradient-to-r ${priorityColors[goal.priority]} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Amount Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Current</p>
                      <p className="text-lg font-bold text-gray-800">${goal.currentAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Remaining</p>
                      <p className="text-lg font-bold text-gray-800">${Math.max(0, remaining).toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Add Funds */}
                  {!isCompleted && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAddFunds(goal.id, 10)}
                          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          +$10
                        </button>
                        <button
                          onClick={() => handleAddFunds(goal.id, 50)}
                          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          +$50
                        </button>
                        <button
                          onClick={() => handleAddFunds(goal.id, 100)}
                          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                        >
                          +$100
                        </button>
                      </div>
                    </div>
                  )}

                  {isCompleted && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <p className="text-green-700 font-semibold">🎉 Goal Completed!</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
