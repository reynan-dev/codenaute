module.exports = {
  pattern:
    '^(main|staging|production)$|^(jk|rv|nc)$/^(refactor|feat|fix|docs|perf|test|build|ci|chore|revert)/.+$',
  errorMsg:
    '🤨 La branche que tu essaies de pusher ne respecte pas nos conventions, tu peux la renommer avec `git branch -m <nom-actuel> <nouveau-nom>`',
};
