import { prisma } from '@/lib/db';
import { ExpenseData, ExpenseFormData } from '@/lib/types';

export async function getExpenses(): Promise<ExpenseData[]> {
  const expenses = await prisma.expense.findMany({
    orderBy: {
      date: 'desc',
    },
    take: 10,
  });

  return expenses.map(expense => ({
    id: expense.id,
    amount: expense.amount,
    category: expense.category,
    description: expense.description || '',
    date: expense.date,
  }));
}

export async function createExpense(data: ExpenseFormData): Promise<ExpenseData> {
  const expense = await prisma.expense.create({
    data: {
      amount: data.amount,
      category: data.category as any, // Cast to ExpenseCategory enum
      description: data.description,
      date: new Date(),
    },
  });

  return {
    id: expense.id,
    amount: expense.amount,
    category: expense.category,
    description: expense.description || '',
    date: expense.date,
  };
}