"use strict";
/** @module hooks */ /** for typedoc */
var common_1 = require("../common/common.d");
var resolveContext_1 = require("../resolve/resolveContext.d");
var hof_1 = require("../common/hof.d");
/**
 * A [[TransitionHookFn]] which resolves all EAGER Resolvables in the To Path
 *
 * Registered using `transitionService.onStart({}, eagerResolvePath);`
 *
 * When a Transition starts, this hook resolves all the EAGER Resolvables, which the transition then waits for.
 *
 * See [[StateDeclaration.resolve]]
 */
var eagerResolvePath = function (trans) {
    return new resolveContext_1.ResolveContext(trans.treeChanges().to)
        .resolvePath("EAGER", trans)
        .then(common_1.noop);
};
exports.registerEagerResolvePath = function (transitionService) {
    return transitionService.onStart({}, eagerResolvePath, { priority: 1000 });
};
/**
 * A [[TransitionHookFn]] which resolves all LAZY Resolvables for the state (and all its ancestors) in the To Path
 *
 * Registered using `transitionService.onEnter({ entering: () => true }, lazyResolveState);`
 *
 * When a State is being entered, this hook resolves all the Resolvables for this state, which the transition then waits for.
 *
 * See [[StateDeclaration.resolve]]
 */
var lazyResolveState = function (trans, state) {
    return new resolveContext_1.ResolveContext(trans.treeChanges().to)
        .subContext(state)
        .resolvePath("LAZY", trans)
        .then(common_1.noop);
};
exports.registerLazyResolveState = function (transitionService) {
    return transitionService.onEnter({ entering: hof_1.val(true) }, lazyResolveState, { priority: 1000 });
};
//# sourceMappingURL=resolve.js.map