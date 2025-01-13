"use strict";
"use client";
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
var useAwaitableNavigate_exports = {};
__export(useAwaitableNavigate_exports, {
  useAwaitableNavigate: () => useAwaitableNavigate
});
module.exports = __toCommonJS(useAwaitableNavigate_exports);
var import_navigation = require("next/navigation");
var import_react = require("react");
const useAwaitableNavigate = () => {
  const { push } = (0, import_navigation.useRouter)();
  const [isPending, startTransition] = (0, import_react.useTransition)();
  const clerkNavRef = (0, import_react.useRef)();
  const clerkNavPromiseBuffer = (0, import_react.useRef)([]);
  if (!clerkNavRef.current) {
    clerkNavRef.current = (to, opts) => {
      return new Promise((res) => {
        clerkNavPromiseBuffer.current.push(res);
        startTransition(() => {
          push(to, opts);
        });
      });
    };
  }
  (0, import_react.useEffect)(() => {
    var _a;
    if (isPending) {
      return;
    }
    if ((_a = clerkNavPromiseBuffer == null ? void 0 : clerkNavPromiseBuffer.current) == null ? void 0 : _a.length) {
      clerkNavPromiseBuffer.current.forEach((resolve) => resolve());
    }
    clerkNavPromiseBuffer.current = [];
  }, [isPending]);
  return clerkNavRef.current;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useAwaitableNavigate
});
//# sourceMappingURL=useAwaitableNavigate.js.map