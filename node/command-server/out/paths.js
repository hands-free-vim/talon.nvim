"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponsePath = exports.getRequestPath = exports.getSignalDirPath = exports.getCommunicationDirPath = void 0;
const os_1 = require("os");
const path_1 = require("path");
function getCommunicationDirPath() {
    const info = (0, os_1.userInfo)();
    // NB: On Windows, uid < 0, and the tmpdir is user-specific, so we don't
    // bother with a suffix
    const suffix = info.uid >= 0 ? `-${info.uid}` : "";
    return (0, path_1.join)((0, os_1.tmpdir)(), `neovim-command-server${suffix}`);
}
exports.getCommunicationDirPath = getCommunicationDirPath;
function getSignalDirPath() {
    return (0, path_1.join)(getCommunicationDirPath(), "signals");
}
exports.getSignalDirPath = getSignalDirPath;
function getRequestPath() {
    return (0, path_1.join)(getCommunicationDirPath(), "request.json");
}
exports.getRequestPath = getRequestPath;
function getResponsePath() {
    return (0, path_1.join)(getCommunicationDirPath(), "response.json");
}
exports.getResponsePath = getResponsePath;
//# sourceMappingURL=paths.js.map