"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandRunner = exports.injectCommandRunner = void 0;
/**
 * This is the `commandRunner` singleton
 */
let cmdRunner_;
// const random = Math.random();
// console.warn(`commandRunner.singleton.ts: random=${random}`);
// console.warn(`commandRunner.singleton.ts: __filename=${__filename}`);
/**
 * Injects an {@link CommandRunner} object that can be used to issue commands.
 * This function should only be called from a select few places, eg extension
 * activation or when mocking a test.
 * @param commandRunner The CommandRunner to inject
 */
function injectCommandRunner(cmdRunner) {
    // console.warn(
    //   `commandRunner.singleton.ts: injectCommandRunner(): random=${random}`,
    // );
    cmdRunner_ = cmdRunner;
}
exports.injectCommandRunner = injectCommandRunner;
/**
 * Gets the singleton used to issue commands.
 * @throws Error if the commandRunner hasn't been injected yet.  Can avoid this by
 * constructing your objects lazily
 * @returns The commandRunner object
 */
function commandRunner() {
    // console.warn(
    //   `commandRunner.singleton.ts: commandRunner() random=${random}`,
    // );
    if (cmdRunner_ == null) {
        throw Error("Tried to access CommandRunner before it was injected");
    }
    return cmdRunner_;
}
exports.commandRunner = commandRunner;
//# sourceMappingURL=commandRunner.singleton.js.map