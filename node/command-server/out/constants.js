"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NEOVIM_COMMAND_TIMEOUT_MS = exports.STALE_TIMEOUT_MS = void 0;
// How old a request file needs to be before we declare it stale and are willing
// to remove it
exports.STALE_TIMEOUT_MS = 60000;
// The amount of time that client is expected to wait for VSCode to perform a
// command, in seconds
exports.NEOVIM_COMMAND_TIMEOUT_MS = 3000;
//# sourceMappingURL=constants.js.map