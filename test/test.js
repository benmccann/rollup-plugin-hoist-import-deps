const fs = require('fs');
const test = require('ava');
const { rollup } = require('rollup');
const { Parser } = require('acorn');

const { hoistImportDeps } = require('../dist');

process.chdir(__dirname);

// Test with all output formats that support code splitting.
const FORMATS = ['es', 'system', 'cjs', 'amd'];
const METHODS = ['preload', 'import'];

test(`add __loadDeps wrapper if module has dynamic import`, t => {
  const plugin = hoistImportDeps();
  plugin.parse = code => {
    return Parser.parse(code, { sourceType: 'module', ecmaVersion: 11 });
  };
  plugin.warn = (...args) => {
    console.log(...args);
  };

  const { code, map } = plugin.transform(
    `import {a} from './a.js';
     async function t() {import ('./b.js')}`,
    'test.js',
  );
  t.is(
    code,
    `import {__loadDeps} from 'preloaddeps:import';\nimport {a} from './a.js';
     async function t() {__loadDeps(import ('./b.js'), "__IMPORT_DEPS__")}`,
  );
  t.not(map, null);
});

test(`don't add __loadDeps wrapper if module has no dynamic imports`, t => {
  const plugin = hoistImportDeps();
  let parseCalled = false;
  plugin.parse = code => {
    parseCalled = true;
    return Parser.parse(code, { sourceType: 'module', ecmaVersion: 11 });
  };
  plugin.warn = (...args) => {
    console.log(...args);
  };

  const ret = plugin.transform(
    `import {a} from './a.js';
     function t() {return 10;}`,
    'test.js',
  );

  // First pass saw there were no dynamic imports.
  // So AST parse was never called.
  t.is(ret, null);
  t.is(parseCalled, false);
});

test(`don't add __loadDeps wrapper if module has no (actual) dynamic imports`, t => {
  const plugin = hoistImportDeps();
  let parseCalled = false;
  plugin.parse = code => {
    parseCalled = true;
    return Parser.parse(code, { sourceType: 'module', ecmaVersion: 11 });
  };
  plugin.warn = (...args) => {
    console.log(...args);
  };

  const ret = plugin.transform(
    `import {a} from './a.js';
    /* Hey I'm a comment to trick the first pass - import('blah') */
     function t() {return 10;}`,
    'test.js',
  );

  // Code not transformed even though first pass thought there was a dynamic
  // import.
  t.is(ret, null);

  // AST parse was acyually called before realizing there were no dynamic
  // imports.
  t.is(parseCalled, true);
});

METHODS.forEach(method => {
  FORMATS.forEach(format => {
    test(`${format}:${method}:e2e`, async t => {
      // Produce output with plugin.
      const bundle = await rollup({
        input: './fixtures/simple/a.js',
        plugins: [hoistImportDeps({ method })],
        onwarn: _ => null,
      });
      await bundle.write({ format, dir: `./output/${format}/${method}` });

      // Compare with snapshot.
      t.snapshot(fs.readFileSync(`./output/${format}/${method}/a.js`).toString());

      // Load the output to sanity check the produced code.
      if (format == 'cjs') {
        const { threeXPlusOne } = require(`./output/cjs/${method}/a.js`);
        t.is(await threeXPlusOne(20), 61);
      }
    });
  });
});
