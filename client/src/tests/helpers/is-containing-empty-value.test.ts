import { isContainingEmptyValue } from "helpers/is-containing-empty-value";

describe('isContainingEmptyValue()', () => {
	describe('When all array values are neither undefined, nor null, nor empty string', () => {
		it('should return false', () => {
			const arr = ['dog', 'cat', 1, false, true];

			expect(isContainingEmptyValue(arr)).toEqual(false);
		});
	});
	describe('When all array values are either undefined, or null, or empty string', () => {
		it('should return true', () => {
			const arr = ['', null, undefined];

			expect(isContainingEmptyValue(arr)).toEqual(true);
		});
	});
	describe('When one value is either undefined, or null, or empty string', () => {
		it('should return true', () => {
			const arr = ['', 1, 'dog', true];

			expect(isContainingEmptyValue(arr)).toEqual(true);
		});
	});
});
