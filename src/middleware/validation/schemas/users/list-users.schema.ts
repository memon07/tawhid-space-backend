import { ListUsersQuery } from '@/types/user';
import { parsePaginationValue } from './common';

export const parseListUsersQuery = (query: unknown): ListUsersQuery => {
  const record = (typeof query === 'object' && query !== null ? query : {}) as Record<string, unknown>;

  const page = parsePaginationValue(record.page, 'page', 1);
  const limit = parsePaginationValue(record.limit, 'limit', 20);

  return {
    page,
    limit: Math.min(limit, 100)
  };
};
