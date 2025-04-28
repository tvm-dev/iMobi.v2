import { createHash } from 'crypto';

export function generateEmailCompare(compare: string): string {
  return createHash('sha256')
    .update(compare.trim().toLowerCase())
    .digest('hex');
}
