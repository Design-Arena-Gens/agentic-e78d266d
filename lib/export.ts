import { Expense, MonthlyReport } from '@/types';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';

export const exportToExcel = (expenses: Expense[], filename: string = 'expenses.xlsx') => {
  const data = expenses.map(expense => ({
    Date: new Date(expense.date).toLocaleDateString(),
    Type: expense.type,
    Category: expense.category,
    Description: expense.description,
    Amount: expense.amount,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Expenses');

  XLSX.writeFile(workbook, filename);
};

export const exportToPDF = (report: MonthlyReport, month: string, filename: string = 'financial-report.pdf') => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.text('SmartSpend AI - Financial Report', 20, 20);

  doc.setFontSize(14);
  doc.text(month, 20, 30);

  // Summary
  doc.setFontSize(12);
  doc.text('Financial Summary', 20, 45);

  doc.setFontSize(10);
  doc.text(`Total Income: $${report.totalIncome.toFixed(2)}`, 20, 55);
  doc.text(`Total Expenses: $${report.totalExpenses.toFixed(2)}`, 20, 62);
  doc.text(`Net Savings: $${report.netSavings.toFixed(2)}`, 20, 69);

  // Categories
  doc.setFontSize(12);
  doc.text('Spending by Category', 20, 85);

  let yPos = 95;
  doc.setFontSize(10);
  report.categories.forEach((category, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    doc.text(
      `${category.name}: $${category.amount.toFixed(2)} (${category.percentage.toFixed(1)}%)`,
      20,
      yPos
    );
    yPos += 7;
  });

  // Recent transactions
  doc.addPage();
  doc.setFontSize(12);
  doc.text('Recent Transactions', 20, 20);

  yPos = 30;
  doc.setFontSize(9);
  report.expenses.slice(0, 30).forEach((expense, index) => {
    if (yPos > 270) {
      doc.addPage();
      yPos = 20;
    }
    const date = new Date(expense.date).toLocaleDateString();
    doc.text(`${date} - ${expense.description} - $${expense.amount.toFixed(2)}`, 20, yPos);
    yPos += 6;
  });

  doc.save(filename);
};
