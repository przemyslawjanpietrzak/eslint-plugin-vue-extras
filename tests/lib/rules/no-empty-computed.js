/**
 * @fileoverview Prevent computed: {},
 * @author Przemyslaw Jan Beigert
 */
"use strict";

const rule = require("../../../lib/rules/no-empty-computed");
const { RuleTester } = require("eslint");

const template = (computed = '') => `
<template>
  <p>{{ greeting }} World!</p>
</template>

<script>
export default {
  ${computed}
};
</script>

`

const ruleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: { ecmaVersion: 2020, sourceType: 'module' }
});

ruleTester.run("no-empty-computed", rule, {

    valid: [
      template(),
      template('computed: { method() {} }'),
    ],

    invalid: [
        {
            code: template('computed: {}'),
            errors: [{
                message: 'Remove empty computed object',
            }],
            output: template(),
        },
        {
          code: template('computed: {},'),
          errors: [{
              message: 'Remove empty computed object',
          }],
          output: template(),
      }
    ]
});
