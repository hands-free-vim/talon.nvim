"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  neovimRegistry: () => neovimRegistry
});
module.exports = __toCommonJS(src_exports);

// src/NeovimRegistry.ts
var import_node_events = require("node:events");
var NeovimRegistry = class {
  constructor() {
    this.apis = /* @__PURE__ */ new Map();
    this.commands = /* @__PURE__ */ new Map();
    this.eventEmitter = new import_node_events.EventEmitter();
  }
  registerExtensionApi(extensionId, api) {
    this.apis.set(extensionId, api);
  }
  getExtensionApi(extensionId) {
    return this.apis.get(extensionId);
  }
  registerCommand(commandId, callback) {
    this.commands.set(commandId, callback);
  }
  async executeCommand(commandId, ...rest) {
    return await this.commands.get(commandId)(...rest);
  }
  onEvent(eventName, listener) {
    return this.eventEmitter.on(eventName, listener);
  }
  emitEvent(eventName, ...args) {
    return this.eventEmitter.emit(eventName, ...args);
  }
};

// src/index.ts
var neovimRegistry = new NeovimRegistry();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  neovimRegistry
});
//# sourceMappingURL=index.js.map
