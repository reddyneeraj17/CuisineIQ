// Since we're using Next.js API routes, we'll store data in memory for this demo
// In a production environment, you'd want to use a proper database

interface DatabaseStore {
  dailySales: any[];
  expenses: any[];
  inventory: any[];
  employees: any[];
  settings: any;
}

class InMemoryDB {
  private store: DatabaseStore = {
    dailySales: [],
    expenses: [],
    inventory: [],
    employees: [],
    settings: null
  };

  getDailySales() {
    return this.store.dailySales;
  }

  addDailySales(data: any) {
    const newSale = {
      id: Date.now(),
      ...data,
      date: new Date().toISOString()
    };
    this.store.dailySales.push(newSale);
    return newSale;
  }

  // Add more methods as needed
}

export const db = new InMemoryDB();