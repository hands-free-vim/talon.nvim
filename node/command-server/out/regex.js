"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.any = void 0;
/**
 * Creates a new regex that is the disjunction of its arguments.
 * Based on https://stackoverflow.com/a/9215436
 * @param args Regexes to combine
 * @returns A regex that will match any of the given Regexes
 */
function any(...args) {
    const components = args.map((arg) => arg.source);
    return new RegExp("(?:" + components.join(")|(?:") + ")");
}
exports.any = any;
//# sourceMappingURL=regex.js.map