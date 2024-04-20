"use strict";
// import { Minimatch } from "minimatch";
// import * as vscode from "vscode";
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
const neovim_registry_1 = require("@cursorless/neovim-registry");
// import { handleCommand } from "@cursorless/cursorless-neovim";
class CommandRunner {
    constructor(io) {
        this.io = io;
        this.reloadConfiguration = this.reloadConfiguration.bind(this);
        this.runCommand = this.runCommand.bind(this);
        this.reloadConfiguration();
        // vscode.workspace.onDidChangeConfiguration(this.reloadConfiguration);
    }
    reloadConfiguration() {
        // const allowList = vscode.workspace
        //   .getConfiguration("command-server")
        //   .get<string[]>("allowList")!;
        // this.allowRegex = any(
        //   ...allowList.map((glob) => new Minimatch(glob).makeRe())
        // );
        // const denyList = vscode.workspace
        //   .getConfiguration("command-server")
        //   .get<string[]>("denyList")!;
        // this.denyRegex =
        //   denyList.length === 0
        //     ? null
        //     : any(...denyList.map((glob) => new Minimatch(glob).makeRe()));
        // this.backgroundWindowProtection = vscode.workspace
        //   .getConfiguration("command-server")
        //   .get<boolean>("backgroundWindowProtection")!;
    }
    /**
     * Reads a command from the request file and executes it.  Writes information
     * about command execution to the result of the command to the response file,
     * If requested, will wait for command to finish, and can also write command
     * output to response file.  See also documentation for Request / Response
     * types.
     */
    runCommand() {
        return __awaiter(this, void 0, void 0, function* () {
            console.warn("------------------------------------------------------------------------------");
            yield this.io.prepareResponse();
            let request;
            try {
                request = yield this.io.readRequest();
            }
            catch (err) {
                yield this.io.closeResponse();
                throw err;
            }
            const { commandId, args, uuid, returnCommandOutput, waitForFinish } = request;
            const warnings = [];
            try {
                // if (!vscode.window.state.focused) {
                //   if (this.backgroundWindowProtection) {
                //     throw new Error("This editor is not active");
                //   } else {
                //     warnings.push("This editor is not active");
                //   }
                // }
                // warnings.push("Neovim not implemented yet");
                if (!commandId.match(this.allowRegex)) {
                    throw new Error("Command not in allowList");
                }
                if (this.denyRegex != null && commandId.match(this.denyRegex)) {
                    throw new Error("Command in denyList");
                }
                // TODO: lookup table here to forward to cursorless or not?
                // this is if we want the command-server to support executing lua functions/commands
                // based on command ids for talon-vim.
                // Note: this might not be useful because we can do it directly with neovim RPC
                // const commandPromise = handleCommand(commandId, ...args);
                // const commandPromise = vscode.commands.executeCommand(commandId, ...args);
                const commandPromise = neovim_registry_1.neovimRegistry.executeCommand(commandId, ...args);
                let commandReturnValue = null;
                if (returnCommandOutput) {
                    commandReturnValue = yield commandPromise;
                }
                else if (waitForFinish) {
                    yield commandPromise;
                }
                yield this.io.writeResponse({
                    error: null,
                    uuid,
                    returnValue: commandReturnValue,
                    warnings,
                });
            }
            catch (err) {
                yield this.io.writeResponse({
                    error: err.message,
                    uuid,
                    warnings,
                });
            }
            yield this.io.closeResponse();
        });
    }
}
exports.default = CommandRunner;
//# sourceMappingURL=commandRunner.js.map