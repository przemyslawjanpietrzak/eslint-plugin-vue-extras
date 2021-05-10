/**
 * @fileoverview Prevent methods: {},
 * @author Przemyslaw Jan Beigert
 */
"use strict";

const rule = require("../../../lib/rules/no-empty-methods");
const { RuleTester } = require("eslint");

const template = (methods) => `
<template>
  <p>{{ greeting }} World!</p>
</template>

<script>
export default {
  ${methods}
};
</script>

`

const ruleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: { ecmaVersion: 2020, sourceType: 'module' }
});

ruleTester.run("no-empty-methods", rule, {

    valid: [
      template(''),
      template('methods: { method() {} }'),
    ],

    invalid: [
        {
            code: template('methods: {}'),
            errors: [{
                message: 'Remove empty methods object',
            }]
        }
    ]
});
