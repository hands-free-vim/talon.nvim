<!-- vim-markdown-toc GFM -->

- [talon.nvim](#talonnvim)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Lazy installation](#lazy-installation)
    - [Manual installation](#manual-installation)
  - [Configuration](#configuration)
  - [Frequently asked questions](#frequently-asked-questions)
    - [nvim does not support Lazy?](#nvim-does-not-support-lazy)

<!-- vim-markdown-toc -->

# talon.nvim

Neovim plugin to support Talon Voice

## Prerequisites

- neovim: https://neovim.io/
- Talon voice: https://talonvoice.com/
- neovim-talon: https://github.com/hands-free-vim/neovim-talon

## Installation

### 1. Install the talon.nvim plugin

Ideally, you want to use a neovim plugin manager like [lazy.nvim](https://github.com/folke/lazy.nvim).

#### Option A: Lazy installation

After the typical [lazy setup](https://github.com/folke/lazy.nvim?tab=readme-ov-file#-installation), you'll have to add the `talon.nvim` plugin to your `init.lua`. We also recommend the following other plugins for the best experience.

```lua
require('lazy').setup({
  'hands-free-vim/talon.nvim',

  -- dependencies useful for neovim-talon
  'dhruvasagar/vim-zoom',
  'gcmt/taboo.vim',
})
```

#### Option B: Manual installation

This method is not recommended but you can try directly cloning the plugin into your nvim data folder:

```
git clone https://github.com/hands-free-vim/talon.nvim
```

### 2. Tell neovim to run the plugin

If you aren't using a plugin manager that automatically calls setup for you (e.g. it is needed for lazy), you will need this somewhere in your neovim config, e.g. in [init.lua](https://neovim.io/doc/user/lua-guide.html#lua-guide-config):

```lua
require("talon").setup()
```

## Frequently asked questions

### nvim does not support Lazy?

Some Linux package managers ship with a version of `nvim` too old for Lazy. If this is the case, [install nvim](https://github.com/neovim/neovim/blob/master/INSTALL.md) via another method.
