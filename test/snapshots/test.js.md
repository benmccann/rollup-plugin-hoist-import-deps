# Snapshot report for `test/test.js`

The actual snapshot is saved in `test.js.snap`.

Generated by [AVA](https://avajs.dev).

## amd:simple

> Snapshot 1

    `define(['require', 'exports'], function (require, exports) { 'use strict';␊
    ␊
      function _interopNamespace(e) {␊
        if (e && e.__esModule) { return e; } else {␊
          var n = {};␊
          if (e) {␊
            Object.keys(e).forEach(function (k) {␊
              var d = Object.getOwnPropertyDescriptor(e, k);␊
              Object.defineProperty(n, k, d.get ? d : {␊
                enumerable: true,␊
                get: function () {␊
                  return e[k];␊
                }␊
              });␊
            });␊
          }␊
          n['default'] = e;␊
          return n;␊
        }␊
      }␊
    ␊
      function __loadDeps(baseImport, ...deps) {␊
        for (const dep of deps) {␊
          new Promise(function (resolve, reject) { require([dep], function (m) { resolve(_interopNamespace(m)); }, reject) });␊
        }␊
        return baseImport;␊
      }␊
    ␊
      async function threeXPlusOne(x) {␊
        const { inc } = await __loadDeps(new Promise(function (resolve, reject) { require(['./b-23769139'], resolve, reject) }), "./d-379ef899");␊
        const { double } = await __loadDeps(new Promise(function (resolve, reject) { require(['./c-46e8526d'], resolve, reject) }), "./d-379ef899");␊
        const { add } = await __loadDeps(new Promise(function (resolve, reject) { require(['./d-379ef899'], resolve, reject) }), );␊
    ␊
        return add(double(x), inc(x));␊
      }␊
    ␊
      exports.threeXPlusOne = threeXPlusOne;␊
    ␊
      Object.defineProperty(exports, '__esModule', { value: true });␊
    ␊
    });␊
    `

## cjs:simple

> Snapshot 1

    `'use strict';␊
    ␊
    Object.defineProperty(exports, '__esModule', { value: true });␊
    ␊
    function _interopNamespace(e) {␊
      if (e && e.__esModule) { return e; } else {␊
        var n = {};␊
        if (e) {␊
          Object.keys(e).forEach(function (k) {␊
            var d = Object.getOwnPropertyDescriptor(e, k);␊
            Object.defineProperty(n, k, d.get ? d : {␊
              enumerable: true,␊
              get: function () {␊
                return e[k];␊
              }␊
            });␊
          });␊
        }␊
        n['default'] = e;␊
        return n;␊
      }␊
    }␊
    ␊
    function __loadDeps(baseImport, ...deps) {␊
      for (const dep of deps) {␊
        Promise.resolve().then(function () { return _interopNamespace(require(dep)); });␊
      }␊
      return baseImport;␊
    }␊
    ␊
    async function threeXPlusOne(x) {␊
      const { inc } = await __loadDeps(Promise.resolve().then(function () { return require('./b-d594e081.js'); }), "./d-8dae6cb4.js");␊
      const { double } = await __loadDeps(Promise.resolve().then(function () { return require('./c-fe6fc73f.js'); }), "./d-8dae6cb4.js");␊
      const { add } = await __loadDeps(Promise.resolve().then(function () { return require('./d-8dae6cb4.js'); }), );␊
    ␊
      return add(double(x), inc(x));␊
    }␊
    ␊
    exports.threeXPlusOne = threeXPlusOne;␊
    `

## es:simple

> Snapshot 1

    `function __loadDeps(baseImport, ...deps) {␊
      for (const dep of deps) {␊
        import(dep);␊
      }␊
      return baseImport;␊
    }␊
    ␊
    async function threeXPlusOne(x) {␊
      const { inc } = await __loadDeps(import('./b-467ea706.js'), "./d-a66d9c36.js");␊
      const { double } = await __loadDeps(import('./c-9955d0a0.js'), "./d-a66d9c36.js");␊
      const { add } = await __loadDeps(import('./d-a66d9c36.js'), );␊
    ␊
      return add(double(x), inc(x));␊
    }␊
    ␊
    export { threeXPlusOne };␊
    `

## system:simple

> Snapshot 1

    `System.register([], function (exports, module) {␊
      'use strict';␊
      return {␊
        execute: function () {␊
    ␊
          exports('threeXPlusOne', threeXPlusOne);␊
    ␊
          function __loadDeps(baseImport, ...deps) {␊
            for (const dep of deps) {␊
              module.import(dep);␊
            }␊
            return baseImport;␊
          }␊
    ␊
          async function threeXPlusOne(x) {␊
            const { inc } = await __loadDeps(module.import('./b-1114c87a.js'), "./d-37823b91.js");␊
            const { double } = await __loadDeps(module.import('./c-5e1e2ead.js'), "./d-37823b91.js");␊
            const { add } = await __loadDeps(module.import('./d-37823b91.js'), );␊
    ␊
            return add(double(x), inc(x));␊
          }␊
    ␊
        }␊
      };␊
    });␊
    `