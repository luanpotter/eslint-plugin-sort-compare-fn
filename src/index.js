const validateCompareFunction = (context) => {
  return {
    "CallExpression[arguments.length=1] > MemberExpression[property.name='sort'][computed=false]"(
      callee,
    ) {
      const sortCall = callee.parent;
      const compareFn = sortCall.arguments[0];
      if (compareFn.params.length !== 2) {
        context.report({ node: compareFn, messageId: 'invalidCompare' });
      }
    },
  };
};

module.exports = {
  rules: {
    "validate-compare-fn": {
      meta: {
        type: 'problem',
        docs: {
          description:
            'Require `Array#sort` calls to always provide a valid `compareFunction`',
          recommended: false,
          requiresTypeChecking: true,
        },
        messages: {
          invalidCompare: "Require a valid 'compare' argument. Use both arguments.",
        },
      },
      create: validateCompareFunction,
    },
  },
};