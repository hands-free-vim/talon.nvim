local M = {}

function M.dump_table(o, depth, max_depth)
	local seen_tables = {}
	local function dump(o, depth, max_depth)
		depth = depth or 1
		if max_depth and depth > max_depth then
			return "{ ... }"
		end
		if seen_tables[o] then
			return "{ DUPLICATE }"
		end
		seen_tables[o] = true
		if type(o) == "table" then
			local s = "{ \n"
			for k, v in pairs(o) do
				if type(k) ~= "number" then
					k = '"' .. k .. '"'
				end
				s = s .. string.rep(" ", depth * 2) .. "[" .. k .. "] = " .. dump(v, depth + 1, max_depth) .. ",\n"
			end
			return s .. string.rep(" ", (depth - 1) * 2) .. "}"
		else
			return tostring(o)
		end
	end
	return dump(o, depth, max_depth)
end
return M
