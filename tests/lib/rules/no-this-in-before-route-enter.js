/**
 * @fileoverview  Don&#39;t use &#34;this&#34; i a beforeRouteEnter method
 * @author Przemyslaw Jan Beigert
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-this-in-before-route-enter");
var RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: { ecmaVersion: 2020, sourceType: 'module' }
})
ruleTester.run("no-this-in-before-route-enter", rule, {
    valid: [],
    invalid: [
        {
            code: `
<template>
  <p>{{ greeting }} World!</p>
</template>

<script>
export default {
  data () {
    return {
      greeting: "Hello"
    };
  },
  beforeRouteEnter: function() {
    this.xxx();
  }
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>`,
            errors: [{
                message: rule.errorMessage,
            }]
        },
        {
            code: `
<template>
  <p>{{ greeting }} World!</p>
</template>

<script>
export default {
  data () {
    return {
      greeting: "Hello"
    };
  },
  beforeRouteEnter() {
    this.xxx();
  }
};
</script>

<style scoped>
p {
  font-size: 2em;
  text-align: center;
}
</style>`,
            errors: [{
                message: rule.errorMessage,
            }]
        },
//         {
//             code: `
// <template>
//   <p>{{ greeting }} World!</p>
// </template>
//
// <script>
// export default {
//   data () {
//     return {
//       greeting: "Hello"
//     };
//   },
//   beforeRouteEnter() {
//     this.attr = this.method();
//   }
// };
// </script>
//
// <style scoped>
// p {
//   font-size: 2em;
//   text-align: center;
// }
// </style>`,
//             errors: [{
//                 // message: rule.errorMessage,
//             }]
//         }
    ]
});
