import { startOfDay, endOfDay } from 'date-fns';
import { db } from '@/lib/db';
import type { DailySales, SalesByCategoryInput } from '@/lib/types/sales';

export async function getDailySales(date: Date = new Date()): Promise<DailySales[]> {
  const sales = db.getDailySales();
  const start = startOfDay(date);
  const end = endOfDay(date);
  
  return sales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate >= start && saleDate <= end;
  });
}

export async function createDailySales(data: SalesByCategoryInput): Promise<void> {
  Object.entries(data).forEach(([category, amount]) => {
    db.addDailySales({ category, amount });
  });
}

export async function getSalesStats() {
  const sales = db.getDailySales();
  const today = new Date();
  const todaySales = sales.filter(sale => {
    const saleDate = new Date(sale.date);
    return saleDate >= startOfDay(today) && saleDate <= endOfDay(today);
  });

  const totalSales = todaySales.reduce((sum, sale) => sum + sale.amount, 0);
  const orderCount = todaySales.length;

  const categoryTotals = todaySales.reduce((acc, sale) => {
    acc[sale.category] = (acc[sale.category] || 0) + sale.amount;
    return acc;
  }, {} as Record<string, number>);

  const bestCategory = Object.entries(categoryTotals).reduce((best, [category, amount]) => {
    if (!best || amount > best.amount) {
      return { name: category, amount };
    }
    return best;
  }, null as null | { name: string, amount: number });

  return {
    totalSales,
    bestCategory: bestCategory || { name: 'N/A', amount: 0 },
    averageOrder: orderCount ? totalSales / orderCount : 0
  };
}