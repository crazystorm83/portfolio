ns.generator = {
    layout: (function () {
        var __list = [];
        var __item;
        var add = function (layoutType, id, name) {
            __item = {
                type: layoutType,
                id: id,
                name: name
            };
            __list.push(__item);
            return this;
        };

        var className = function (className) {
            if (!__item.className)
                __item.className = [];
            if (!__item.className.includes(className))
                __item.className.push(className);
        };

        var style = function () {

        };

        var text = function () {

        };

        var value = function () {

        };

        var selectedItem = function () {

        };

        var checkedItem = function () {

        };

        return {
            add: add    
        };
    })(),
    control: (function () {
        return {

        };
    })()
}