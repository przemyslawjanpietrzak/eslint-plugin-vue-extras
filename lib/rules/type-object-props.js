/**
 * @fileoverview force user to add type declaration to object props
 * @author Przemyslaw Jan Beigert
 */
'use strict';

const isLooksLike = require('../utils/isLooksLike');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
	meta: {
		docs: {
			description: 'force user to add type declaration to object props',
			category: 'Fill me in',
			recommended: false,
		},
		fixable: null,  // or "code" or "whitespace"
		schema: [
			// fill in your schema
		],
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

		return {
			ExportDefaultDeclaration(node) {
				if (node.declaration.type !== 'ObjectExpression') {
					return;
				}
				if (!Array.isArray(node.declaration.properties)) {
					return;
				}

				const props = node.declaration.properties.find(property =>
					isLooksLike(property.key, { type: 'Identifier', name: 'props'}) && property.value.type === 'ObjectExpression')

				if (!props) {
					return;
				}

				props.value.properties
					.filter(prop => prop.value.type === 'ObjectExpression')
					.map(prop => prop.value.properties.find(propValueProperty => {
						return isLooksLike(propValueProperty.key, { type: 'Identifier', name: 'type' })
					}))
					.forEach(prop => {
						if (!prop) {
							return;
						}
						if (isLooksLike(prop.value, { type: 'Identifier', name: 'Object' })) {
							context.report(prop, 'Object props has to be typed')
						}
						if (prop.value.type === 'TSAsExpression') {
							const { typeAnnotation } = prop.value;
							if (
								['TSAnyKeyword', 'TSTypeLiteral', 'TSUnknownKeyword', 'TSObjectKeyword'].includes(typeAnnotation.type)
								|| !typeAnnotation.typeName
								|| typeAnnotation.typeName.name !== 'Prop'
							) {
								context.report(prop, 'Object props should be typed like this: "type: Object as Prop<T>"')
							}
						}
					})

				// give me methods

			},
		};
	},
};
