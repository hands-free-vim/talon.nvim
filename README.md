<div align="center">

# talon.nvim

##### Control neovim using Talon Voice and Cursorless

</div>

## TOC

## The Problems

1. Maintaining your own talon-specific neovim settings is tedious
2. Using a normal terminal from Talon is not great UX; it's not easy to access history, etc
3. Editing with neovim by dictating characters is tedious (in our opinion)
4. No cursorless in neovim

## The Solutions

1. All settings related to Talon and neovim terminal use in one plugin
2. Use neovim as your terminal! Easy shell history buffer access
3. Support automatic title updates to allow [talon-vim](https://github.com/hands-free-vim/talon-vim) use
4. Introduce cursorless into neovim ([eventually](https://github.com/cursorless-dev/cursorless/pull/2256))

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

A completion list of currentl supported options is:

TBD
