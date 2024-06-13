local M = {}

-- :lua print(require('talon.utils').is_platform_windows()
function M.is_platform_windows()
  return vim.uv.os_uname().version:find('Windows')
end

-- https://www.reddit.com/r/neovim/comments/tk1hby/get_the_path_to_the_current_lua_script_in_neovim/
-- https://pgl.yoyo.org/luai/i/debug.getinfo
-- https://www.gammon.com.au/scripts/doc.php?lua=debug.getinfo
-- e.g. :lua print(require('talon.utils').talon_nvim_path())
-- outputs: C:\Users\User\AppData\Local\nvim-data\lazy\talon.nvim
-- NOTE: Development cursorless-neovim is installed in: C:\Users\User\AppData\Local\nvim\rplugin\node\cursorless-neovim
function M.talon_nvim_path()
  --source_file=@C:/Users/User/AppData/Local/nvim-data/lazy/talon.nvim/lua/talon/utils.lua
  local str = debug.getinfo(1, 'S').source
  -- print(('source_file=%s'):format(str))
  -- skip as the file name is prefixed by "@"
  str = str:sub(2)
  -- print(('source_file2=%s'):format(str))
  if M.is_platform_windows() then
    str = str:gsub('/', '\\')
  end
  -- print(('source_file3=%s'):format(str))
  -- remove where our current file is located to get talon.nvim base path
  str = str:sub(0, -1 - #'lua/talon/utils.lua')
  -- print(('talon.nvim=%s'):format(str))
  return str
end

return M
