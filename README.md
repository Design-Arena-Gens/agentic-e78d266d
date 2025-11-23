# 💰 SmartSpend AI - Personal Finance Manager

An intelligent, AI-powered expense management web application that helps users track income, spending, and savings with personalized financial insights.

![SmartSpend AI](https://img.shields.io/badge/Next.js-14.2.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.3-38B2AC?style=for-the-badge&logo=tailwind-css)

---

## ✨ Features

### 🎯 Core Functionality
- **Smart Transaction Tracking** - Add expenses and income with intelligent auto-categorization
- **AI Financial Advisor** - Personalized insights and recommendations based on your spending patterns
- **Savings Goals** - Set, track, and achieve multiple financial goals with visual progress
- **Interactive Dashboard** - Real-time overview of your financial health
- **Comprehensive Reports** - Weekly/monthly analytics with beautiful charts
- **Export Capabilities** - Download reports as Excel or PDF

### 🤖 AI-Powered Features
- Automatic expense categorization based on descriptions
- Smart spending alerts and warnings
- Personalized savings recommendations
- Financial health score calculation
- Predictive insights and tips

### 📊 Visualization & Analytics
- 6-month spending trends
- Category distribution pie charts
- Income vs Expenses line charts
- Category-wise bar charts
- Progress tracking for goals

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Date Handling:** date-fns

### Data & Storage
- **Storage:** LocalStorage (Phase 1)
- **Future:** PostgreSQL with Prisma ORM

### Export Features
- **PDF:** jsPDF
- **Excel:** xlsx

---

## 📱 App Structure

```
smartspend-ai/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main application
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Dashboard.tsx       # Dashboard view
│   ├── ExpenseForm.tsx     # Transaction form
│   ├── ExpenseList.tsx     # Transaction list
│   ├── GoalsSection.tsx    # Savings goals
│   ├── AIAdvisor.tsx       # AI insights
│   └── ReportsSection.tsx  # Reports & analytics
├── lib/
│   ├── storage.ts          # LocalStorage utilities
│   ├── categories.ts       # Category definitions
│   ├── analytics.ts        # Report calculations
│   ├── ai-advisor.ts       # AI advice generation
│   └── export.ts           # Export functions
├── types/
│   └── index.ts            # TypeScript definitions
└── public/                 # Static assets
```

---

## 🎨 Features Breakdown

### 1. Dashboard
- Summary statistics (Income, Expenses, Savings, Goals)
- 6-month trend visualization
- Category spending distribution
- Top AI insights preview
- Active goals progress

### 2. Expenses
- Quick transaction entry form
- Expense/Income toggle
- Automatic category suggestions
- Transaction search and filtering
- Edit and delete capabilities
- Transaction history with totals

### 3. Savings Goals
- Create multiple goals
- Set priorities (Low/Medium/High)
- Track deadline and progress
- Quick fund allocation buttons
- Visual progress bars
- Completion celebrations

### 4. Reports
- Toggle between weekly/monthly views
- Export to Excel or PDF
- Category bar and pie charts
- 6-month trend analysis
- Detailed category breakdown

### 5. AI Advisor
- Financial health score (0-100)
- Personalized insights by type:
  - ⚠️ Warnings (overspending)
  - 💡 Tips (optimizations)
  - 🏆 Achievements (milestones)
- Smart recommendations
- Pro financial tips

---

## 📊 Categories

SmartSpend AI intelligently categorizes expenses into:

- 🍔 Food & Dining
- 🚗 Transportation
- ⚡ Bills & Utilities
- 🛍️ Shopping
- 🎮 Entertainment
- 💊 Healthcare
- 📚 Education
- 🏠 Housing
- 💰 Income
- 📦 Other

---

## 🎯 Target Audience

### Primary Users
1. **Young Professionals (25-35)** - Starting careers, managing lifestyle expenses
2. **Budget-Conscious Families (30-45)** - Household budgeting and planning
3. **Freelancers (25-40)** - Irregular income, multiple sources

### Use Cases
- Track daily expenses and income
- Analyze spending patterns
- Set and achieve savings goals
- Generate financial reports
- Improve financial literacy

---

## 🛣️ Roadmap

### ✅ Phase 1: MVP (Complete)
- Manual transaction entry
- Basic AI categorization
- Dashboard and reports
- Savings goals
- Export functionality
- LocalStorage persistence

### 🔄 Phase 2: Enhanced Intelligence (Next)
- Receipt OCR scanning
- User authentication
- Cloud database
- Bank account sync
- Advanced AI insights
- Multi-device sync

### 📋 Phase 3: Advanced Features
- Investment tracking
- Bill reminders
- Recurring transactions
- Shared accounts
- Expense predictions

### 🚀 Phase 4: Scale & Monetization
- Native mobile apps (iOS/Android)
- Premium subscription
- AI financial chatbot
- Tax preparation
- Multi-currency support

---

## 📈 Performance

- ⚡ Lightning-fast load times
- 📱 Mobile-first responsive design
- 🎨 Smooth 60fps animations
- 💾 Efficient client-side storage
- 🔄 Real-time updates

---

## 🔒 Privacy & Security

- All data stored locally in your browser
- No third-party data sharing
- No account required (Phase 1)
- Export your data anytime
- Future: End-to-end encryption

---

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Charts by [Recharts](https://recharts.org/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**SmartSpend AI** - Making personal finance management intelligent and effortless.
