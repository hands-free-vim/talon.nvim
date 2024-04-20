"use strict";
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
exports.deactivate = exports.activate = void 0;
const nativeIo_1 = require("./nativeIo");
const commandRunner_1 = require("./commandRunner");
const commandRunner_singleton_1 = require("./singletons/commandRunner.singleton");
function activate( /* context: vscode.ExtensionContext */) {
    return __awaiter(this, void 0, void 0, function* () {
        const io = new nativeIo_1.NativeIo();
        yield io.initialize();
        const commandRunner = new commandRunner_1.default(io);
        let focusedElementType;
        (0, commandRunner_singleton_1.injectCommandRunner)(commandRunner);
        // context.subscriptions.push(
        //   vscode.commands.registerCommand(
        //     "command-server.runCommand",
        //     (focusedElementType_?: FocusedElementType) => {
        //       focusedElementType = focusedElementType_;
        //       return commandRunner.runCommand();
        //     }
        //   ),
        //   vscode.commands.registerCommand(
        //     "command-server.getFocusedElementType",
        //     () => focusedElementType ?? null
        //   )
        // );
        return {
            /**
             * The type of the focused element in vscode at the moment of the command being executed.
             */
            getFocusedElementType: () => focusedElementType,
            /**
             * These signals can be used as a form of IPC to indicate that an event has
             * occurred.
             */
            signals: {
                /**
                 * This signal is emitted by the voice engine to indicate that a phrase has
                 * just begun execution.
                 */
                prePhrase: io.getInboundSignal("prePhrase"),
            },
        };
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map