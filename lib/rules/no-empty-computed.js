/**
 * @fileoverview Prevent "computed: {}"
 * @author Przemyslaw Jan Beigert
 */
"use strict";

const isLooksLike = require('../utils/isLooksLike');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const isPropertyComputed = (property) => {
    if (property.type !== 'Property') {
        return false
    }
    if (!isLooksLike(property.key, {type: 'Identifier', name: 'computed'})) {
      return false;
    }

    return isLooksLike(property.value, { type: 'ObjectExpression' });
}

const isComputedObjectEmpty = (computedPropertyValue) => {
    if (!Array.isArray(computedPropertyValue.properties)) {
        return false
    }

    return computedPropertyValue.properties.length === 0;
}

module.exports = {
    meta: {
        docs: {
            description: "Prevent \"computed: {}\"",
            category: "Clean code",
            recommended: true
        },
        fixable: "whitespace",  // or "code" or "whitespace"
        schema: []
    },

    create(context) {
        return {
            ExportDefaultDeclaration(node) {
                if (!node.declaration.properties) {
                    return;
                }
                const computedProperty = node.declaration.properties.find(isPropertyComputed);
                if (!computedProperty) {
                    return;
                }
                if (isComputedObjectEmpty(computedProperty.value)) {
                    context.report({
                        node: computedProperty, 
                        message: 'Remove empty computed object',
                        fix(fixer) {
                            return fixer.replaceText(computedProperty, '');
                        }
                    });
                }
            }
        };
    }
};
