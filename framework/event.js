(function (scope) {
    if (!scope["ns"])
        scope["ns"] = {};

    var __listener = {};

    var register = function (type, scope, fn, params) {
        if (__listener[type])
            __listener[type] = [];
        
        __listener.push({
            scope: scope,
            fn: fn,
            params: params
        });
        
        return this;
    };

    var unregister = function (type) {
        __listener[type] = null;
    }

    var once = function (type, scope, fn, params) {
        if (__listener[type])
            return;

        return register(type, scope, fn, params);
    }

    var call = function (type, params) {
        var listener = __listener[type];
        if (!listener)
            return;
        
        var returnValue;

        for (var i = 0, len = listener.length; i < len; i++) {
            var item = listener[i];
            returnValue = item.fn.call(item.scope, params);
            if (returnValue)
                break;
        }
        
        return returnValue;
    }

    var apply = function (type, params) {
        var listener = __listener[type];
        if (!listener)
            return;

        var returnValue;

        for (var i = 0, len = listener.length; i < len; i++) {
            var item = listener[i];
            returnValue = item.fn.apply(item.scope, params);
            if (returnValue)
                break
        }

        return returnValue;
    }

    scope["ns"]["event"] = this;
})(window);