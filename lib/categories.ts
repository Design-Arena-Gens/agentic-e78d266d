export const CATEGORIES = [
  { name: 'Food & Dining', icon: '🍔', color: '#FF6B6B' },
  { name: 'Transportation', icon: '🚗', color: '#4ECDC4' },
  { name: 'Bills & Utilities', icon: '⚡', color: '#FFE66D' },
  { name: 'Shopping', icon: '🛍️', color: '#A8E6CF' },
  { name: 'Entertainment', icon: '🎮', color: '#C7CEEA' },
  { name: 'Healthcare', icon: '💊', color: '#FFB4A2' },
  { name: 'Education', icon: '📚', color: '#B4A7D6' },
  { name: 'Housing', icon: '🏠', color: '#95E1D3' },
  { name: 'Income', icon: '💰', color: '#38B000' },
  { name: 'Other', icon: '📦', color: '#95A5A6' },
];

export const getCategoryColor = (categoryName: string): string => {
  const category = CATEGORIES.find(c => c.name === categoryName);
  return category ? category.color : '#95A5A6';
};

export const getCategoryIcon = (categoryName: string): string => {
  const category = CATEGORIES.find(c => c.name === categoryName);
  return category ? category.icon : '📦';
};

export const categorizeExpense = (description: string): string => {
  const desc = description.toLowerCase();

  // Food & Dining
  if (desc.match(/food|restaurant|lunch|dinner|breakfast|cafe|coffee|grocery|supermarket|meal/)) {
    return 'Food & Dining';
  }

  // Transportation
  if (desc.match(/transport|uber|lyft|taxi|bus|train|gas|fuel|parking|metro|subway/)) {
    return 'Transportation';
  }

  // Bills & Utilities
  if (desc.match(/electric|water|gas|internet|phone|utility|bill|subscription|netflix|spotify/)) {
    return 'Bills & Utilities';
  }

  // Shopping
  if (desc.match(/shop|store|mall|amazon|clothing|clothes|shoes|fashion/)) {
    return 'Shopping';
  }

  // Entertainment
  if (desc.match(/movie|cinema|concert|game|entertainment|theater|party|bar|club/)) {
    return 'Entertainment';
  }

  // Healthcare
  if (desc.match(/doctor|hospital|medicine|pharmacy|health|medical|dental|clinic/)) {
    return 'Healthcare';
  }

  // Education
  if (desc.match(/school|course|book|education|tuition|class|training|learn/)) {
    return 'Education';
  }

  // Housing
  if (desc.match(/rent|mortgage|property|housing|apartment|maintenance|repair/)) {
    return 'Housing';
  }

  // Income
  if (desc.match(/salary|income|wage|bonus|payment received|deposit/)) {
    return 'Income';
  }

  return 'Other';
};
