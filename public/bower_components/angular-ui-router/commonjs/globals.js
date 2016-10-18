"use strict";
/** @module core */ /** */
var stateParams_1 = require("./params/stateParams.d");
var queue_1 = require("./common/queue.d");
var common_1 = require("./common/common.d");
/**
 * Global mutable state
 */
var Globals = (function () {
    function Globals(transitionService) {
        var _this = this;
        this.params = new stateParams_1.StateParams();
        this.transitionHistory = new queue_1.Queue([], 1);
        this.successfulTransitions = new queue_1.Queue([], 1);
        var beforeNewTransition = function ($transition$) {
            _this.transition = $transition$;
            _this.transitionHistory.enqueue($transition$);
            var updateGlobalState = function () {
                _this.successfulTransitions.enqueue($transition$);
                _this.$current = $transition$.$to();
                _this.current = _this.$current.self;
                common_1.copy($transition$.params(), _this.params);
            };
            $transition$.onSuccess({}, updateGlobalState, { priority: 10000 });
            var clearCurrentTransition = function () { if (_this.transition === $transition$)
                _this.transition = null; };
            $transition$.promise.then(clearCurrentTransition, clearCurrentTransition);
        };
        transitionService.onBefore({}, beforeNewTransition);
    }
    return Globals;
}());
exports.Globals = Globals;
//# sourceMappingURL=globals.js.map