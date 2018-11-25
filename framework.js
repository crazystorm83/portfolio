(function (ns) {
    if (!ns)
        ns = window["ns"] = {};
    
    var __createNamespace = function (namespace) {
        var o = window;
        var namespaces = namespace.split(".");
        namespaces.forEach(function (v) {
            if (!o[v])
                o[v] = function () {};
            o = o[v];
        });
        return o;
    };

    ns.Class = function (namespace, variables) {
        variables = variables || {};
        var namespaces = namespace.split(".");
        var className = namespaces.pop();
        var c = __createNamespace(namespaces.join("."));
        
        if (!c[className]) {
            c[className] = function () {};

            for (var prop in variables)
                c[className].prototype[prop] = variables[prop];
        }

        return c[className];
    };

    ns.Create = function (namespace, variables) {
        var c = ns.Class(namespace, variables);
        var instance = new c();

        instance.init && instance.init();

        return instance;
    };

    ns.Inherits = function (selfNamespace, parentNamespace, variables) {
        var c = ns.Class(selfNamespace, variables);
        var p = ns.Class(parentNamespace);

        //자신의 함수와 부모의 함수가 겹치지 않으면 자신의 prototype 에 부모 함수를 넣어준다.
        //만약, 자신의 함수와 부모의 함수가 겹치면, 명시적으로 부모 함수를 호출해줘야 한다.
        /**
         * 부모
         * ns.Create("ns.modules.drag", { 
         *  init: function () { 
         *      console.log("parent init function"); 
         *  }
         * });
         * 자신
         * ns.Inherits("ns.modules.drag.table", "ns.modules.drag", { 
         *  init: function () { 
         *      //명시적으로 부모 함수 호출하며, 인자도 모두 넘겨준다.
         *      ns.modules.drag.prototype.init.apply(this, arguments);
         *      console.log("self init function");
         * });
         */
        for (var prop in p.prototype) {
            if (!c.prototype.hasOwnProperty(prop))
                c.prototype[prop] = p.prototype[prop];
        } 

        var instance = new c();
        instance.parent = p.prototype;
        instance.init && instance.init();

        return instance;
    };

})(window["ns"]);

var p = ns.Create("ns.modules.drag", {
    init: function () {
        console.log("ns.modules.drag init function");

        console.log(ns.modules.drag);
    },
    render: function () {
        console.log("ns.modules.drag render function");
    }
});

var c = ns.Inherits("ns.modules.drag.table", "ns.modules.drag", {
    init: function () {
        ns.modules.drag.prototype.init.apply(this, arguments);
        console.log("ns.modules.drag.table init function");
    }
});

var cc = ns.Inherits("ns.modules.drag.table.each", "ns.modules.drag.table", {
    init: function () {
        ns.modules.drag.table.prototype.init.apply(this, arguments);
        console.log("ns.modules.drag.table.each init function");
    }
})