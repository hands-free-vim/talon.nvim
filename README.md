# talon.nvim
   
## Installation

TBD

## Getting Started

### talon.setup() IS REQUIRED

It is a requirement to call `talon.setup()`. This is required due to autocmds setup.

### Basic Setup

If you aren't using a plugin manager that automatically calls setup for you, you will need this somewhere in your neovim config:

```lua
require("talon").setup({})
```

### Config

There is some optional behavior you can configure by passing a configuration to `talon.setup()`.

For example:

```lua
require("talon").setup( {
    settings = { cursorless = true },
})
```

In the example above, the output from the Fugitive plugin function will be appended to the window title on each update.

A completion list of currently supported options is:

TBD
