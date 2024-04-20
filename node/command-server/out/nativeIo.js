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
exports.NativeIo = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const constants_1 = require("constants");
const paths_1 = require("./paths");
const os_1 = require("os");
const promises_1 = require("fs/promises");
const constants_2 = require("./constants");
class InboundSignal {
    constructor(path) {
        this.path = path;
    }
    /**
     * Gets the current version of the signal. This version string changes every
     * time the signal is emitted, and can be used to detect whether signal has
     * been emitted between two timepoints.
     * @returns The current signal version or null if the signal file could not be
     * found
     */
    getVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (yield (0, promises_1.stat)(this.path)).mtimeMs.toString();
            }
            catch (err) {
                if (err.code !== "ENOENT") {
                    throw err;
                }
                return null;
            }
        });
    }
}
class NativeIo {
    constructor() {
        this.responseFile = null;
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const communicationDirPath = (0, paths_1.getCommunicationDirPath)();
            console.warn(`Creating communication dir ${communicationDirPath}`);
            (0, fs_1.mkdirSync)(communicationDirPath, { recursive: true, mode: 0o770 });
            const stats = (0, fs_1.lstatSync)(communicationDirPath);
            const info = (0, os_1.userInfo)();
            if (!stats.isDirectory() ||
                stats.isSymbolicLink() ||
                stats.mode & constants_1.S_IWOTH ||
                // On Windows, uid < 0, so we don't worry about it for simplicity
                (info.uid >= 0 && stats.uid !== info.uid)) {
                throw new Error(`Refusing to proceed because of invalid communication dir ${communicationDirPath}`);
            }
        });
    }
    prepareResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.responseFile) {
                throw new Error("response is already locked");
            }
            this.responseFile = yield (0, promises_1.open)((0, paths_1.getResponsePath)(), "wx");
        });
    }
    closeResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.responseFile) {
                throw new Error("response is not locked");
            }
            yield this.responseFile.close();
            this.responseFile = null;
        });
    }
    /**
     * Reads the JSON-encoded request from the request file, unlinking the file
     * after reading.
     * @returns A promise that resolves to a Response object
     */
    readRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            const requestPath = (0, paths_1.getRequestPath)();
            const stats = yield (0, promises_1.stat)(requestPath);
            const request = JSON.parse(yield (0, promises_1.readFile)(requestPath, "utf-8"));
            if (Math.abs(stats.mtimeMs - new Date().getTime()) > constants_2.NEOVIM_COMMAND_TIMEOUT_MS) {
                throw new Error("Request file is older than timeout; refusing to execute command");
            }
            return request;
        });
    }
    /**
     * Writes the response to the response file as JSON.
     * @param file The file to write to
     * @param response The response object to JSON-encode and write to disk
     */
    writeResponse(response) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.responseFile) {
                throw new Error("response is not locked");
            }
            yield this.responseFile.write(`${JSON.stringify(response)}\n`);
        });
    }
    getInboundSignal(name) {
        const signalDir = (0, paths_1.getSignalDirPath)();
        const path = (0, path_1.join)(signalDir, name);
        return new InboundSignal(path);
    }
}
exports.NativeIo = NativeIo;
//# sourceMappingURL=nativeIo.js.map