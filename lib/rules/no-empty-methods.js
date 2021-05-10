/**
 * @fileoverview Prevent "methods: {}"
 * @author Przemyslaw Jan Beigert
 */
"use strict";

const isLooksLike = require('../utils/isLooksLike');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const isPropertyMethods = (property) => {
    if (property.type !== 'Property') {
        return false
    }
    if (!isLooksLike(property.key, {type: 'Identifier', name: 'methods'})) {
      return false;
    }

    return isLooksLike(property.value, { type: 'ObjectExpression' });
}

const isMethodsObjectEmpty = (methodsPropertyValue) => {
    if (!Array.isArray(methodsPropertyValue.properties)) {
        return false
    }

    return methodsPropertyValue.properties.length === 0;
}

module.exports = {
    meta: {
        docs: {
            description: "Prevent \"methods: {}\"",
            category: "Clean code",
            recommended: true
        },
        fixable: null, 
        schema: []
    },

    create(context) {
        return {
            ExportDefaultDeclaration(node) {
                if (!node.declaration.properties) {
                    return;
                }
                const methodsProperty = node.declaration.properties.find(isPropertyMethods);
                if (!methodsProperty) {
                    return;
                }
                if (isMethodsObjectEmpty(methodsProperty.value)) {
                    context.report(methodsProperty, 'Remove empty methods object');
                }
            }
        };
    }
};
