# Welcome to CODENAUTE 🧑🚀

We use [pnpm](https://pnpm.io/workspaces) built-in support to manage our monorepository.

## IDE configuration

It is highly recommended to be working with VSCode, an IDE that does not need to be presented. Internally, we use a set of code extensions enabling a minimum of code standardization, making the life of many developers more enjoyable. Those extensions are given in `.vscode/extensions.json`, and can be downloaded directly via the VSCode extension store. This goes hand and hand with properly configured VSCode workspace settings, available in `.vscode/settings.json`.

## Requirements

To use this repository, you need to have the following tools installed:

- [Node.js](https://nodejs.org/en/) (v16.17.1)
- [pnpm](https://pnpm.io/installation) (v8.0.0)
- [Makefile](https://perso.univ-lyon1.fr/jean-claude.iehl/Public/educ/Makefile.html)
- [Docker](https://docs.docker.com/get-docker/) (v20.10.8)
- [Docker Compose](https://docs.docker.com/compose/install/) (v1.29.2)

## Install dependencies

To install all dependencies, run:

```
make install
```

If you want to **hard install** all dependencies, you can run:

```
make hard-install
```

## First start of applications

After install all dependencies, we need to start the applications.

First run :

```
make start-database
```

Then we need to initialize the database, you can do it running:

```
make init-database
```

Now you are ready !

As a developer, to work on the project on everyday, you will certainly want to start the applications seperately in **debug mode** :

Run `make start-client` and `make start-server` in two differents terminals.

You can also see logs of database by running `make start-database`.

If you want to just launch all in quiet mode, run :

```
make start-all
```

## Common workspace

Common workspace is used to share code between `client` <> `server`.

## Git hooks

We use [Husky](https://typicode.github.io/husky/) to ease git hooks.

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specs for our commit message and this is check on `commit-msg`.

We use the same prefixes for branch names and this is also checked on `branch-naming`.

We also follow the prettier specs for code formatting and this is checked on `pre-commit`.

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

### Prettier

To maintain some minimal standards within our codebase, we rely on [prettier](https://prettier.io/) that is configured through `.prettierrc`. We use `.prettierignore` to avoid conflicts with some configuration files that would otherwise be broken by using prettier. Make sure prettier is correctly used in VSCode by installing the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

### Node version

We did set up a `.nvmrc` file to allow developers to quickly change and use the right node version. See [nvm](https://github.com/nvm-sh/nvm) package and [deeper shell integration](https://github.com/nvm-sh/nvm#deeper-shell-integration).

## How to deploy

To deploy the application, we need to create a new PR comparing `main` to base `production`.It's mandatory write the `description` with `release template` and put a label, to undestand the labels we can base on this table:

| Label name      | Description                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| `release/major` | ✨ Modify the first number of version, used to delivery big features. Example: v**X**.0.0                  |
| `release/minor` | 📚 Modify the second number of version, used to delivery smalls features or refactors. Example: v1.**X**.0 |
| `release/patch` | 🐛 Modify the third number of version, used to fix some bugs. Example: v1.0.**X**                          |

After merged this pull request, will be launch workflows to create tags and release notes and the workflow to deploy into production.
