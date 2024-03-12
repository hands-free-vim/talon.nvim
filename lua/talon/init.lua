local TalonGroup = vim.api.nvim_create_augroup("Talon", { clear = true })

-- Accomodate the long titlestring values
vim.o.titlelen = 2048
vim.o.title = true
-- Allow infinite scrollback in terminal
vim.o.scrollback = -1
-- Good for terminal, otherwise have both lualine TERMINAL and -- TERMINAL in cmd line
-- FIXME: needs an option
vim.o.cmdheight = 0

-- FIXME: Add a test for if fugitive is installed
-- FIXME: remove TERM-N probably
local update_title = function()
    local mode = vim.api.nvim_get_mode().mode
    local prefix = "VIM MODE:" .. mode .. " RPC:%{v:servername} FILETYPE:%y"
    -- FIXME: Make an option for user to suffix to this
    local suffix = " (%f) %t"

    if mode == "t" then
        vim.o.titlestring = prefix .. " TERM:" .. vim.b.term_title .. suffix
    -- Adding TERM-N: to 'nt' allows us to trigger special app-specific functionality in NORMAL mode
    -- from terminal applications
    elseif mode == "nt" then
        vim.o.titlestring = prefix .. " TERM-N:" .. vim.b.term_title .. suffix
    else
        vim.o.titlestring = prefix .. suffix
    end
    vim.cmd("redraw")
end

local function setup()
    -- Update the title when the mode or text changes. This ensures Talon can detect the mode
    vim.api.nvim_create_autocmd({ "ModeChanged", "TextChangedT", "FileType" }, {
        callback = update_title,
        group = TalonGroup,
        pattern = "*",
    })

    -- Cursorless and Talon vim editing can rely heavily on rows, so we enable it by default
    vim.api.nvim_create_autocmd("BufWinEnter", {
        callback = function()
            vim.o.number = true
        end,
        group = TalonGroup,
        pattern = "*",
    })

    -- This highlights yanked text momentarily, which is a very useful indicator for confirming
    -- yank worked, especially before we have cursorless hats
    vim.api.nvim_create_autocmd("TextYankPost", {
        callback = function()
            vim.highlight.on_yank()
        end,
        group = TalonGroup,
        pattern = "*",
    })

    -- These next few allow us to switch back to terminal mode after leaving and reentering a terminal buffer, but only
    -- if the original terminal buffer was in terminal mode at the time we left. It's mostly useful of your using
    -- splits and regularly switching out of a terminal
    vim.api.nvim_create_autocmd("TermLeave", {
        pattern = "term://*",
        callback = function()
            local cursor = vim.api.nvim_win_get_cursor(0)
            -- Store the cursor, so we can check if we should switch back to terminal mode
            vim.api.nvim_buf_set_var(0, "terminal_cursor_line", cursor[1])
        end,
        group = TalonGroup,
    })

    vim.api.nvim_create_autocmd("BufLeave", {
        pattern = "term://*",
        callback = function()
            -- We can't trust vim.fn.mode() here, because in order to switch
            -- splits we will end up having to switch to normal mode in the
            -- process, and then back to terminal mode.
            -- Instead, we check whether or not the cursor is on the last line
            -- of the buffer, implying we came from the terminal line
            local cursor = vim.api.nvim_win_get_cursor(0)
            local ok, terminal_cursor_line =
                pcall(vim.api.nvim_buf_get_var, 0, "terminal_cursor_line")
            if ok then
                if cursor[1] == terminal_cursor_line then
                    vim.api.nvim_buf_set_var(0, "terminal_mode", 1)
                end
            end
        end,
        group = TalonGroup,
    })

    vim.api.nvim_create_autocmd({ "BufEnter", "BufWinEnter" }, {
        pattern = "term://*",
        callback = function()
            local ok, terminal_cursor_line =
                pcall(vim.api.nvim_buf_get_var, 0, "terminal_mode")
            if ok then
                if terminal_cursor_line == 1 then
                    vim.api.nvim_buf_set_var(0, "terminal_mode", 0)
                    vim.cmd("startinsert")
                end
            end
        end,
        group = TalonGroup,
    })

    -- FIXME: The next two needs to move to a formatting area tied to an option
    -- If you ever need to edit a .talon file in vim, create the type of association
    vim.api.nvim_create_autocmd({ "BufNewFile", "BufFilePre", "BufRead" }, {
        callback = function()
            vim.b.filetype = "talon"
        end,
        group = TalonGroup,
        pattern = "*.talon",
    })

    vim.api.nvim_create_autocmd("FileType", {
        callback = function()
            -- The following allows commenting with comments.nvim
            vim.bo.commentstring = "# %s"
            vim.bo.cindent = false
        end,
        group = TalonGroup,
        pattern = "talon",
    })
end

local M = {
    setup = setup,
}

return M
