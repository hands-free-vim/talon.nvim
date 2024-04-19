# talon.nvim

Neovim plugin to support Talon Voice and Cursorless
   
## Installation

TBD

## Getting Started

### Basic Setup (without cursorless)

If you aren't using a plugin manager that automatically calls setup for you, you will need this somewhere in your neovim config:

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
