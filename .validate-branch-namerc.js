module.exports = {
	pattern:
		'^(jk|rv|nc)/(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)/[a-z0-9._-]+$',
	errorMsg:
		'🤨 La branche que tu essaies de pusher ne respecte pas nos conventions, tu peux la renommer avec `git branch -m <nom-actuel> <nouveau-nom>`'
};
