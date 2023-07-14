function formatCode(code: string) {
	// Replace special characters with their HTML entities
	code = code
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');

	// Add indentation using CSS styles
	code = code
		.replace(/\n/g, '<br>')
		.replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
		.replace(/ {2}/g, '&nbsp;&nbsp;');

	// Wrap the code in <pre> tags for preserving whitespace
	code = '<pre>' + code + '</pre>';

	return code;
}
