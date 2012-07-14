// Generated by CoffeeScript 1.3.3
var Hoodie,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Hoodie = (function(_super) {

  __extends(Hoodie, _super);

  Hoodie.prototype.modules = {
    my: {
      localStore: "LocalStore",
      config: "Config",
      account: "Account",
      remoteStore: "RemoteStore"
    }
  };

  function Hoodie(baseUrl) {
    this.baseUrl = baseUrl != null ? baseUrl : '';
    this.baseUrl = this.baseUrl.replace(/\/+$/, '');
    this._loadModules();
  }

  Hoodie.prototype.request = function(type, path, options) {
    var defaults;
    if (options == null) {
      options = {};
    }
    defaults = {
      type: type,
      url: "" + this.baseUrl + path,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      dataType: 'json'
    };
    return $.ajax($.extend(defaults, options));
  };

  Hoodie.prototype.defer = $.Deferred;

  Hoodie.prototype.isPromise = function(obj) {
    return typeof obj.done === 'function' && typeof obj.fail === 'function';
  };

  Hoodie.prototype._loadModules = function(context, modules) {
    var instanceName, moduleName, namespace, _results;
    if (context == null) {
      context = this;
    }
    if (modules == null) {
      modules = this.modules;
    }
    _results = [];
    for (instanceName in modules) {
      moduleName = modules[instanceName];
      if (typeof moduleName === 'string') {
        _results.push(context[instanceName] = new Hoodie[moduleName](this));
      } else {
        namespace = instanceName;
        context[namespace] = {};
        _results.push(this._loadModules(context[namespace], modules[namespace]));
      }
    }
    return _results;
  };

  return Hoodie;

})(Events);
