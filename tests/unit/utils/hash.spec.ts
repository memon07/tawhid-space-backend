import { sha256 } from '@/utils/hash';

describe('sha256', () => {
  it('returns deterministic hash', () => {
    const first = sha256('sample-token');
    const second = sha256('sample-token');

    expect(first).toBe(second);
    expect(first).toHaveLength(64);
  });
});
