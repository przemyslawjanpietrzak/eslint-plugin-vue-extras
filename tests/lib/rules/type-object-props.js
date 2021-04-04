/**
 * @fileoverview force user to add type declaration to object props
 * @author Przemyslaw Jan Beigert
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/type-object-props"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const template = prop => `
<script lang="ts">
import { Prop } from 'vue/types/options';

export default {
	props: {
		prop: {
			${prop}
		}
	}
}
</script>  
`;

var ruleTester = new RuleTester({
    parser: require.resolve('vue-eslint-parser'),
    parserOptions: { ecmaVersion: 2020, sourceType: 'module', parser: '@typescript-eslint/parser', }
});
ruleTester.run("type-complex-props", rule, {

    valid: [
        `
<script lang="ts">
export default {
}
</script>  	
    	`,
    	`
<script lang="ts">
export default {
	props: {}
}
</script>  	
    	`,
        template(''),
    	template('type: Object as Prop<{}>'),
        template('type: String'),
        template('type: Number'),
        template('type: Boolean'),
        template('type: [String, Number, Boolean]'),
    ],

    invalid: [
        {
            code: template('type: Object'),
            errors: [{
                message: 'Object props has to be typed',
            }]
        },
        {
            code: template('type: Object as any'),
            errors: [{
                message: 'Object props should be typed like this: "type: Object as Prop<T>"',
            }]
        },
        {
        	code: template('type: Object as {}'),
            errors: [{
                message: 'Object props should be typed like this: "type: Object as Prop<T>"',
            }]
        },
        {
            code: template('type: Object as unknown'),
            errors: [{
                message: 'Object props should be typed like this: "type: Object as Prop<T>"',
            }]
        },
        {
            code: template('type: Object as string'),
            errors: [{
                message: 'Object props should be typed like this: "type: Object as Prop<T>"',
            }]
        }
    ]
});
