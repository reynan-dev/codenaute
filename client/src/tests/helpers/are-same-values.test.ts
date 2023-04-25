import { areSameValues } from 'helpers/are-same-values';

describe('areSameValues()', () => {
	describe('When all values in the two objects ARE strictly equals', () => {
		it('should return true', () => {
			const obj1 = { email: 'email@address.com', username: 'username' };
			const obj2 = { email: 'email@address.com', username: 'username' };

			expect(areSameValues(obj1, obj2)).toEqual(true);
		});
	});

	describe('When all values in the two objects ARE NOT strictly equals', () => {
		it('should return true', () => {
			const obj1 = { email: 'email@address.com', username: 'username' };
			const obj2 = { email: 'another.email@address.com', username: 'another.username' };

			expect(areSameValues(obj1, obj2)).toEqual(false);
		});
	});

	describe('When two identic keys in the 2 objects contain different values', () => {
		it('should return true', () => {
			const obj1 = { email: 'email@address.com', username: 'username' };
			const obj2 = { email: 'another.email@address.com', username: 'username' };

			expect(areSameValues(obj1, obj2)).toEqual(false);
		});
	});
});
