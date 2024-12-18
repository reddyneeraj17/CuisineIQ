import { db } from '@/lib/db';

export class ApiError extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function executeQuery<T>(
  queryFn: () => Promise<T>,
  errorMessage = 'Database operation failed'
): Promise<T> {
  try {
    return await queryFn();
  } catch (error) {
    console.error(`${errorMessage}:`, error);
    throw new ApiError(errorMessage);
  }
}

export function executeSqliteQuery<T>(
  query: string,
  params: any[] = []
): T {
  try {
    const stmt = db.prepare(query);
    return stmt.get(...params) as T;
  } catch (error) {
    console.error('SQLite query failed:', error);
    throw new ApiError('Database operation failed');
  }
}