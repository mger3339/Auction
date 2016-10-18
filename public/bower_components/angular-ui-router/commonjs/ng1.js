/**
 * Main entry point for angular 1.x build
 * @module ng1
 */
/** for typedoc */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./core.d"));
__export(require("./ng1/services.d"));
__export(require("./ng1/statebuilders/views.d"));
require("./ng1/directives/stateDirectives.d");
require("./ng1/stateFilters.d");
require("./ng1/directives/viewDirective.d");
require("./ng1/viewScroll.d");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = "ui.router";
//# sourceMappingURL=ng1.js.map