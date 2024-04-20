<!-- vim-markdown-toc GFM -->

- [talon.nvim](#talonnvim)
  - [Prerequisites](#prerequisites)
    - [Cursorless prerequisites](#cursorless-prerequisites)
  - [Installation](#installation)
    - [Lazy installation](#lazy-installation)
    - [Manual installation](#manual-installation)
  - [Configuration](#configuration)
    - [Basic Setup](#basic-setup)
    - [Cursorless Setup](#cursorless-setup)
      - [Prerequisites for Cursorless](#prerequisites-for-cursorless)

<!-- vim-markdown-toc -->

# talon.nvim

Neovim plugin to support Talon Voice and Cursorless

## Prerequisites

- neovim: https://neovim.io/

### Cursorless prerequisites

If you want to use Cursorless, you'll need the additional prerequisites:

- node: https://nodejs.org/en
- npm (generally part of node installation)

## Installation

NOTE: Atm you need to use the `beta` branch of this repository.

Ideally, you want to use a neovim plugin manager like [lazy.nvim](https://github.com/folke/lazy.nvim).

### Lazy installation

After the typical [lazy setup](https://github.com/folke/lazy.nvim?tab=readme-ov-file#-installation), you'll have to add the `talon.nvim` plugin to your `init.lua`. We also recommend the following other plugins for the best experience.

```lua
require('lazy').setup({
  -- Git related plugins
  'tpope/vim-fugitive',

  { 'hands-free-vim/talon.nvim', branch = "beta" },

  -- dependencies useful for neovim-talon
  'dhruvasagar/vim-zoom',
  'gcmt/taboo.vim',
  'vim-scripts/BufOnly.vim'
})
```

### Manual installation

This method is not recommended but you can try directly cloning the plugin into your nvim data folder:

```
git clone  https://github.com/hands-free-vim/talon.nvim
cd talon.nvim
git checkout beta
```

## Configuration

### Basic Setup

If you want to use Cursorless, skip to the following section.

If you aren't using a plugin manager that automatically calls setup for you (e.g. it is needed for lazy), you will need this somewhere in your neovim config:

```lua
require("talon").setup({})
```

NOTE: It is a requirement to call `talon.setup()` due to autocmds setup.

### Cursorless Setup

If you want to enable cursorless, you need to use the following instead:

```lua
require("talon").setup( {
    settings = { cursorless = true },
})
```

#### Prerequisites for Cursorless

1. Install the neovim node package globally

```
npm install -g neovim
```

2. Install the the Cursorless-related prerequisites from the `node` folder in `talon.nvim`

```
cd path/to/talon.nvim/node

cd command-server
npm install
cd ..

cd cursorless-neovim
npm install
cd ..

cd neovim-registry
npm install
cd ..
```

Now you should be able to start neovim and use Cursorless.

#### Configuration Notes

Notes for Linux installation:
- Some Linux package managers ship with a version of nvim too old for Lazy. If this is the case, [install nvim](https://github.com/neovim/neovim/blob/master/INSTALL.md) via another method
- Do not use the snap package of nvim
