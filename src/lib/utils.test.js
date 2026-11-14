/*
    Vit Tests. Tests functions in our repo and what we have so far.
*/
import { describe, it, expect } from 'vitest';
import { peso, signed, cx } from './utils.js';

describe('Application utilities', () => {
  it('formats amounts as Philippine pesos', () => {
    expect(peso(1200)).toBe('₱1,200.00');
  });

  it('formats negative amounts correctly', () => {
    expect(signed(-50)).toBe('−₱50.00');
  });

  it('combines valid CSS classes', () => {
    expect(cx('flex', false, 'hidden', null))
      .toBe('flex hidden');
  });
});
