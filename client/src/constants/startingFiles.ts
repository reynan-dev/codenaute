export const FILES = {
	vanilla: {
		'/index.html': {
			code: '<!DOCTYPE html>\n<html>\n\n<head>\n  <title>Parcel Sandbox</title>\n  <meta charset="UTF-8" />\n</head>\n\n<body>\n  <div id="app">Thanks for choosing CodingSpace</div>\n\n  <script src="src/index.js">\n  </script>\n</body>\n\n</html>'
		},
		'/src/styles.css': {
			code: 'body {\n  font-family: sans-serif; background-color: grey\n}\n'
		},
		'/src/index.js': {
			code: 'import "./styles.css";'
		}
	}
};
