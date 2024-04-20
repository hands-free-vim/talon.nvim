"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const extension_1 = require("./extension");
const commandRunner_singleton_1 = require("./singletons/commandRunner.singleton");
// import { injectContext } from "./singletons/context.singleton";
// const random = Math.random();
// console.warn(`index.ts: random=${random}`);
// console.warn(`index.ts: __filename=${__filename}`);
/**
 * Extension entrypoint called by node-client on command-server startup.
 * - Register the functions that are exposed to neovim.
 *   Note that these function need to start with a capital letter to be callable from neovim.
 */
function entry(plugin) {
    // Contrary to cursorless-neovim, setting "dev" to "false" is not really relevant
    // because it will only apply to the index.js file, because the files are not rolled up into a single file
    // so the other files will be imported at run time and will not be reloaded. 
    // That being said it doesn't hurt to set it to "false" anyway
    plugin.setOptions({ dev: false });
    plugin.registerFunction("CommandServerTest", () => test(plugin), {
        sync: false,
    });
    plugin.registerFunction("CommandServerLoadExtension", () => __awaiter(this, void 0, void 0, function* () { return yield loadExtension(plugin); }), { sync: false });
    plugin.registerFunction("CommandServerRunCommand", () => runCommand(), { sync: false });
}
exports.default = entry;
/**
 * Test that command-server is loaded
 */
function test(plugin) {
    const currentDate = new Date();
    const currentDateStr = currentDate.toLocaleString();
    console.warn("test(): " + currentDateStr);
}
/**
 * Load the command-server.
 */
function loadExtension(plugin) {
    return __awaiter(this, void 0, void 0, function* () {
        console.warn("loadExtension(command-server): start");
        // console.warn(
        //   `index.ts: loadExtension(): random=${random}`,
        // );
        yield (0, extension_1.activate)();
        console.warn("loadExtension(command-server): done");
    });
}
function runCommand() {
    return __awaiter(this, void 0, void 0, function* () {
        console.warn("runCommand(command-server): start");
        // console.warn(
        //   `index.ts: runCommand(): random=${random}`,
        // );
        (0, commandRunner_singleton_1.commandRunner)().runCommand();
        console.warn("runCommand(command-server): done");
    });
}
//# sourceMappingURL=index.js.map