export const getLanguageNameFromExtension = (filename: string): string | null => {
	const extension = filename.split('.').pop()?.toLowerCase();

	if (!extension) {
		return null;
	}

	const languageMap: { [key: string]: string } = {
		ts: 'TypeScript',
		tsx: 'TypeScript',
		js: 'JavaScript',
		jsx: 'JavaScript',
		html: 'HTML',
		css: 'CSS',
		php: 'PHP',
		py: 'Python',
		rb: 'Ruby',
		java: 'Java',
		cs: 'C#',
		cpp: 'C++',
		h: 'C',
		astro: 'Astro',
		vue: 'JavaScript',
		svelte: 'JavaScript'
	};

	return languageMap[extension] || null;
};

// a11yDark, atomDark, base16AteliersulphurpoolLight, cb, coldarkCold, coldarkDark, coy, coyWithoutShadows, darcula, dark, dracula, duotoneDark, duotoneEarth, duotoneForest, duotoneLight, duotoneSea, duotoneSpace, funky, ghcolors, gruvboxDark, gruvboxLight, holiTheme, hopscotch, lucario, materialDark, materialLight, materialOceanic, nightOwl, nord, okaidia, oneDark, oneLight, pojoaque, prism, shadesOfPurple, solarizedDarkAtom, solarizedlight, synthwave84, tomorrow, twilight, vs, vscDarkPlus, xonokai, zTouch)
