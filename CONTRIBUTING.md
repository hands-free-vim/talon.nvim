# Contributor Guidelines

- [Contributor Guidelines](#contributor-guidelines)
  - [Setup](#setup)
    - [pre-commit](#pre-commit)
    - [VSCode](#vscode)
  - [Conventional Commits](#conventional-commits)
  - [Linting](#linting)
    - [luacheck](#luacheck)

We are happy to accept contributions to this project! See the setup section for getting started. We try to follow the
[conventional commits](https://www.conventionalcommits.org/en/) practice wherever possible.

## Setup

### pre-commit

Most users will want to run `pre-commit install` to ensure the commit hooks are installed. You will need both [stylua](https://github.com/JohnnyMorganz/StyLua)
and [luacheck](https://github.com/mpeterv/luacheck) installed for these checks to work.

If you are using [nix](https://nixos.org/) and [direnv](https://github.com/direnv/direnv), you can simply alternatively run `direnv allow`, which will install all the underyling dependencies.

### VSCode

The `.vscode/` folder has settings and extension recommendations. It is best to install these to avoid
run into linting errors only when making a commit.

## Conventional Commits

Do your best to follow the default set of conventional commits naming, as described
[here](https://www.conventionalcommits.org/en/v1.0.0/#summary). The following is a brief summary of what category you
should use, if you aren't exactly sure which label to use.

- _fix_: Commits related to fixing bugs or errors in the codebase.
- _feat_: Commits related to adding new features or functionality to the project.
- _build_: Commits related to build system or external dependencies (e.g., flake.nix).
- _chore_: Commits related to chores (e.g., linting), maintenance tasks, or general upkeep of the project that do not fit into other categories.
- _ci_: Commits related to continuous integration configuration and scripts.
- _docs_: Commits related to documentation (e.g., README, API documentation, inline code comments).
- _style_: Commits related to code style, formatting, or whitespace changes; no production code change.
- _refactor_: Commits that neither fix a bug nor add a feature but make changes to the codebase (e.g., renaming a
  variable, deleting code). If your cleanup includes additional inline doc changes, still include it under _refactor_.
- _perf_: Commits related to performance improvements.
- _test_: Commits related to adding missing tests or correcting existing tests.

## Linting

We make use of `pre-commit`. See earlier for installation steps. Below are some tips about how to work around common
linting errors you may run into, but can't actually fix.

### luacheck

Sometimes you'll get a warning for something that isn't valid. A good example of this is getting a warning for a
line being too long, when the line is a URI that you can't shorten. In this case you can use the [inline command](https://luacheck.readthedocs.io/en/stable/inline.html)
functionality to disable a check for a specific line.

For example:

```lua
-- luacheck:ignore 631
-- https://github.com/nvim-treesitter/nvim-treesitter-textobjects/blob/master/lua/nvim-treesitter/textobjects/select.lua#L114
```
