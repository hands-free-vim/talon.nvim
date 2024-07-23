describe('talon.nvim tests', function()
  local utils = require('talon.utils')

  describe('talon_nvim_path()', function()
    it('Returns the current nvim path', function()
      local current_path = utils.talon_nvim_path()
      local expected_path = 'foo'
      assert(current_path == expected_path)
    end)
  end)
end)
