# talon.nvim

Neovim plugin to support Talon Voice and Cursorless
   
## Installation

NOTE: Atm you need to use the `dev` branch of this repository.

Ideally, you want to use a neovim plugin manager like [lazy.nvim](https://github.com/folke/lazy.nvim).

### Lazy installation

After the typical [lazy setup](https://github.com/folke/lazy.nvim?tab=readme-ov-file#-installation), you'll have to add the `talon.nvim` plugin. We also recommend the following other plugins for the best experience.

```
require('lazy').setup({
  -- Git related plugins
  'tpope/vim-fugitive', 
  
  { 'hands-free-vim/talon.nvim', branch = "dev" },

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
git checkout dev
```

## Configuration

### Basic Setup (without cursorless)

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
