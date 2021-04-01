/**
 * @fileoverview use attr instead of :attr=&#34;true&#34;
 * @author Przemyslaw Jan Beigert
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/use-attribute-shortcut");
const RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const template = (content) => `
<template>
  ${content}
</template>
`
var ruleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: { ecmaVersion: 2020, sourceType: 'module' }
});
ruleTester.run("use-attribute-shortcut", rule, {

    valid: [
        template('<div></div>'),
        template('<div attr></div>'),
        template('<div attr="false"></div>'),
        template('<div attr="true"></div>'),
        template('<div :attr="false"></div>'),
        template('<div attr="false" attr1></div>'),
    ],

    invalid: [
        {
            code: template('<div :attr="true"></div>'),
            errors: [{
                message: 'Use attr instead of :attr="true"',
            }]
        },
        {
            code: template('<div :attr1="false" :attr2="true"></div>'),
            errors: [{
                message: 'Use attr2 instead of :attr2="true"',
            }]
        }
    ]
});
