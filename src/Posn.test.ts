import { Posn } from './Posn';
import { expect, test } from 'vitest';

test('Posn', () => {
  expect(Posn.origin).toEqual(new Posn(0, 0));
  expect(Posn.origin.moved(1, 1)).toEqual(new Posn(1, 1));
  // Immutability
  expect(Posn.origin).toEqual(new Posn(0, 0));
});
