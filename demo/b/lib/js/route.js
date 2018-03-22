;(function () {
    'use strict';
    var _global;
    Function.prototype.bind = Function.prototype.bind || function (context) {
        var that = this;
        return function () {
            return that.apply(context, arguments);
        }
    };

    function extend(subClass, superClass) {
        var o = function () {
            this.constructor = subClass;
        };

        o.prototype = superClass.prototype;

        subClass.prototype = new o();

        return subClass.prototype;
    }

    function getCb(addr, hashList) {
        for (var key in hashList) {
            if (key === addr) {
                return hashList[key];
            }
        }
        return false;
    }

    function loadScript(url) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        document.body.appendChild(script);
    }

    function loadStyles(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    }

    function removeStyles(url) {
        var name = url.split('/');
        var link = document.getElementsByTagName('link');
        for (var i = 0; i < link.length; i++) {
            var getName = link[i].href.split('/');
            if (getName[getName.length - 1] === name[name.length - 1]) {
                link[i].remove();
            }
        }
    }

    function removeScript(url) {
        var name = url.split('/');
        var script = document.getElementsByTagName('script');
        for (var i = 0; i < script.length; i++) {
            var getName = script[i].src.split('/');
            if (getName[getName.length - 1] === name[name.length - 1]) {
                script[i].remove();
            }
        }
    }

    function firstNode(obj) {
        if (obj.firstElementChild) {
            return obj.firstElementChild;
        } else {
            return obj.firstChild;
        }
    }

    var Router = function () {
        this.hashList = {};
        this.index = null;
        this.key = '|';
        var self = this;
        window.onhashchange = function () {
            self.reload();
        };
    };

    Router.prototype = {
        add: function (address, callback) {
            this.hashList[address] = callback;
        },
        remove: function (address) {
            delete this.hashList[address];
        },
        init: function (index) {
            this.index = index;
            return this;
        },
        go: function (address) {
            window.location.hash = '#' + this.key + address;
        },
        reload: function () {
            var self = this;
            var hash = window.location.hash.replace('#' + self.key, '');
            var addr = hash.split('/')[0];
            var cb = getCb(addr, self.hashList);
            if (cb != false) {
                var arr = hash.split('/');
                arr.shift();
                cb.apply(self, arr);
            } else {
                self.index && self.go(self.index);
            }
        },
        start: function () {
            this.reload();
        }
    };


    var RouteConfig = function (option) {
        if (typeof option === 'object' && option.box) {
            this.box = option.box;
        } else {
            this.box = document.getElementById('xo-container');
        }

        Router.call(this);
    };

    var RouteConfigG = extend(RouteConfig, Router);

    RouteConfigG.when = function (option) {
        var box = this.box;
        var jsUrl = option.jsUrl;
        var cssUrl = option.cssUrl;
        var htmlUrl = option.htmlUrl;
        var name = option.name;
        Router.prototype.add.call(this, name, function () {
            var node = firstNode(box);
            if (node) {
                box.removeChild(node);
                removeScript(jsUrl);
                removeStyles(cssUrl);
            }
            $.ajax({
                url: htmlUrl,
                beforeSend: function () {
                    console.log('正在读取网页' + htmlUrl);
                    $(box).html('<div>正在加载页面...</div>');
                },
                success: function (response) {
                    $(box).html(response);
                },
                complete: function () {
                    loadScript(jsUrl);
                    loadStyles(cssUrl);
                    console.log('加载网页' + htmlUrl + '结束');
                },
                error: function (msg) {
                    console.log(msg);
                },
                dataType: 'html'
            })
        });
        return this;
    };

    _global = (function () {
        return this || (0, eval)('this');
    }());

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = Router;
        module.exports = RouteConfig;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return Router;
        });
        define(function () {
            return RouteConfig;
        });
    } else {
        !('Router' in _global) && (_global.Router = Router);
        !('RouteConfig' in _global) && (_global.RouteConfig = RouteConfig);
    }
}());