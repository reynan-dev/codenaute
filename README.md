# Coder Monorepo

We use [pnpm](https://pnpm.io/workspaces) built-in support to manage our monorepository.

## Install dependencies

To install all dependencies, run:

`make install`

If you want to hard install all dependencies, run:

`make hard-install`

## Start applications

To start all applications, run:

`make start`

To start server application, run:

`make server`

To start client application, run:

`make client`

To start database, run:

`make database`

## Common workspace

Common worspace is used to share code between `client` <> `server`.

## Git hooks

We use [Husky](https://typicode.github.io/husky/) to ease git hooks.

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specs for our commit message and this is check on `pre-commit`.
We use the same prefixes for branch names and this is also checked on `pre-commit`.

### Commit types / Branch prefixes

Here is the list of commit types and branch prefixes you can chose from :

| Commit Type | Title                       | Description                                                                                            |
| ----------- | --------------------------- | :----------------------------------------------------------------------------------------------------- |
| `feat`      | ✨ Features                 | A new feature                                                                                          |
| `fix`       | 🐛 Bug Fixes                | A bug Fix                                                                                              |
| `docs`      | 📚 Documentation            | Documentation only changes                                                                             |
| `style`     | 💎 Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| `refactor`  | 📦 Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                              |
| `perf`      | 🚀 Performance Improvements | A code change that improves performance                                                                |
| `test`      | 🚨 Tests                    | Adding missing tests or correcting existing tests                                                      |
| `build`     | 🛠 Builds                    | Changes that affect the build system or external dependencies (example scopes: next, webpack, pnpm)    |
| `ci`        | ⚙️ Continuous Integrations  | Changes to our CI configuration files and scripts                                                      |
| `chore`     | ♻️ Chores                   | Other changes that don't modify src or test files                                                      |
| `revert`    | 🗑 Reverts                   | Reverts a previous commit                                                                              |

### Branch names

See the regex validating the branch naming [here](.husky/branch-naming).

**Structure :**

```
<user>/<type>/<short-description>
```

**Examples :**

```
rv/feat/signup-page
jk/ci/github-actions-setup
nc/fix/calendar-input-focus-not-working
```

### Commit messages

**Structure :**

```
<type>(optional scope): <description>
```

**Examples :**

```
ci(front): setup storybook tests
fix: send cors headers
feat(groups): add comment section
```

### Node version

We did set up a `.nvmrc` file to allow developers to quickly change and use the right node version. See [nvm](https://github.com/nvm-sh/nvm) package and [deeper shell integration](https://github.com/nvm-sh/nvm#deeper-shell-integration).
