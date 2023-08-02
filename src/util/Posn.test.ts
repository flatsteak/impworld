import { Posn } from './Posn';
import { expect, test } from 'vitest';

test('Posn', () => {
  expect(Posn.origin).toEqual(new Posn(0, 0));
  expect(Posn.origin.moved(1, 1)).toEqual(new Posn(1, 1));
  // Immutability
  expect(Posn.origin).toEqual(new Posn(0, 0));

  expect(new Posn(10, 10).dividedBy(2)).toEqual(new Posn(5, 5));
  expect(new Posn(11, 10).dividedBy(3)).toEqual(new Posn(4, 3));
  expect(new Posn(10, 10).moved(3, -3)).toEqual(new Posn(13, 7));
});
