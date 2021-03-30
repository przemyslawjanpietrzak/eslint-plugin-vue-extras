/**
 * @fileoverview  Don't use "this" i a beforeRouteEnter method
 * @author Przemyslaw Jan Beigert
 */

const isLooksLike = require('../utils/isLooksLike');
const deepFind = require('../utils/deepFind');

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const isPropertyBeforeRouteMethod = (property) => {
    if (property.type !== 'method' && property.type !== 'Property') {
        return false
    }
    return isLooksLike(property.key, {type: 'Identifier', name: 'beforeRouteEnter'})
}

const isPropertyFunctionExpression = (property) => {
    return property.value.type === 'FunctionExpression'
};

const errorMessage = 'beforeRouteEnter does NOT have access to `this` component instance. https://router.vuejs.org/guide/advanced/navigation-guards.html#in-component-guards'

module.exports = {
    errorMessage,
    meta: {
        docs: {
            description: "Don't use this in a beforeRouteEnter method",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,
        schema: []
    },

    create: function (context) {
        return {
            ExportDefaultDeclaration(node) {
                const beforeRouteProperty = node.declaration.properties.find(isPropertyBeforeRouteMethod);
                if (!beforeRouteProperty) {
                    return;
                }

                if (!isPropertyFunctionExpression(beforeRouteProperty)) {
                    return;
                }

                if (deepFind(beforeRouteProperty.value.body, { type: 'ThisExpression' })) {
                    context.report(node, errorMessage);
                }
            },
        };
    }
};
