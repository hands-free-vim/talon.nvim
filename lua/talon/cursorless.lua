local M = {}

function M.setup()
    -- these prints are useful when debugging since we need to attach to let neovim run at startup
    print("Setting up cursorless...")
    vim.api.nvim_call_function("CursorlessLoadExtension", {})
    vim.api.nvim_call_function("CommandServerLoadExtension", {})
    print("Setting up cursorless done")
end

return M
