export function isContainingEmptyValue<T>(arr: (T | undefined | null)[]): boolean {
	return !arr.every((element) => element !== undefined && element !== null && element !== '');
}
