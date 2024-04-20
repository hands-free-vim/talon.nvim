"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paths_1 = require("./paths");
const rimraf_1 = require("rimraf");
function main() {
    (0, rimraf_1.sync)((0, paths_1.getCommunicationDirPath)(), { disableGlob: true });
}
main();
//# sourceMappingURL=uninstall.js.map