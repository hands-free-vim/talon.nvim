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

local function move_split_to_tab(direction)
  if direction ~= 'next' and direction ~= 'previous' then
    -- FIXME: Warn user that the direction is invalid
    return
  end
  -- Make sure there is more than one window
  local last_tab_num = vim.fn.tabpagenr('$')
  if vim.fn.winnr('$') == 1 and last_tab_num == 1 then
    return
  end
  local cur_buf = vim.fn.bufnr('%')

  vim.api.nvim_win_close(0, true)

  if direction == 'next' then
    if vim.fn.tabpagenr() <= last_tab_num then
      -- If closing the window didn't close the tab, then go to next tab
      if last_tab_num == vim.fn.tabpagenr('$') then
        vim.cmd('tabnext')
      end
      --- FIXME: It would be nice to keep orientation?
      vim.cmd('split')
    else
      -- Open a tab after the current tab.
      vim.cmd('tabnew')
    end
  else -- direction == 'previous'
    if vim.fn.tabpagenr() ~= 1 then
      -- If closing the window didn't close the tab, then go to prev tab
      if last_tab_num == vim.fn.tabpagenr('$') then
        vim.cmd('tabprevious')
      end
      --- FIXME: It would be nice to keep orientation?
      vim.cmd('split')
    else
      -- Open a tab before the current tab.
      vim.cmd('0tabnew')
    end
  end
  vim.cmd('buffer ' .. cur_buf)
end

function M.move_split_to_previous_tab()
  move_split_to_tab('previous')
end

function M.move_split_to_next_tab()
  move_split_to_tab('next')
end

return M
