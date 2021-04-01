/**
 * @fileoverview use attr instead of :attr="true"
 * @author Przemyslaw Jan Beigert
 */
"use strict";

const utils = require('eslint-plugin-vue/lib/utils')

const isLooksLike = require('../utils/isLooksLike');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const getErrorMessage = (attr) => `Use ${attr} instead of :${attr}="true"`;

module.exports = {
    meta: {
        docs: {
            description: "use attr instead of :attr=\"true\"",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return utils.defineTemplateBodyVisitor(context, {
            'VAttribute'(node) {
                if (node.key.type !== 'VDirectiveKey') {
                    return;
                }
                if (node.value.type !== 'VExpressionContainer') {
                    return;
                }
                if (!isLooksLike(node.value.expression, { type: 'Literal', value: true, raw: 'true' })) {
                    return;
                }
                context.report(node, getErrorMessage(node.key.argument.name))
            }
        });
    }
};
