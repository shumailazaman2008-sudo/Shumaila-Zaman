// Phase 0 Security TDD Test Suite verifying all Dirty Dozen payloads return PERMISSION_DENIED
export interface SecurityTestCase {
  id: number;
  name: string;
  collection: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  expectedResult: 'PERMISSION_DENIED';
}

export const DIRTY_DOZEN_TESTS: SecurityTestCase[] = [
  { id: 1, name: 'Identity Spoofing on Order Create', collection: 'orders', operation: 'create', expectedResult: 'PERMISSION_DENIED' },
  { id: 2, name: 'Shadow Field Injection on UserProfile', collection: 'users', operation: 'update', expectedResult: 'PERMISSION_DENIED' },
  { id: 3, name: 'Unverified Email Admin Spoof', collection: 'orders', operation: 'list', expectedResult: 'PERMISSION_DENIED' },
  { id: 4, name: 'PII Blanket Read on Another User', collection: 'users', operation: 'get', expectedResult: 'PERMISSION_DENIED' },
  { id: 5, name: 'Unscoped List Scraping on Orders', collection: 'orders', operation: 'list', expectedResult: 'PERMISSION_DENIED' },
  { id: 6, name: 'Oversized String / ID Poisoning', collection: 'orders', operation: 'create', expectedResult: 'PERMISSION_DENIED' },
  { id: 7, name: 'Unbounded Wishlist Array (>10 items)', collection: 'users', operation: 'update', expectedResult: 'PERMISSION_DENIED' },
  { id: 8, name: 'Forged Client Timestamp on Create', collection: 'orders', operation: 'create', expectedResult: 'PERMISSION_DENIED' },
  { id: 9, name: 'Immortal Field (total / ownerId) Mutation', collection: 'orders', operation: 'update', expectedResult: 'PERMISSION_DENIED' },
  { id: 10, name: 'Terminal State (statusStep == 5) Mutation', collection: 'orders', operation: 'update', expectedResult: 'PERMISSION_DENIED' },
  { id: 11, name: 'Value Type Poisoning on statusStep', collection: 'orders', operation: 'update', expectedResult: 'PERMISSION_DENIED' },
  { id: 12, name: 'State Shortcut on Order Create (statusStep != 0)', collection: 'orders', operation: 'create', expectedResult: 'PERMISSION_DENIED' },
];
