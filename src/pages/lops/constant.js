export const lopsPartProperties = {
  partGroup: {
    properties: {
      parts: {
        originalRef: 'NumberMultipleValueControl',
        minLength: 10,
        maxLength: 10,
      },
    },
  },
  lopCriteriaGroup: {
    lopCriteriaList: {
      lopCriteria: {
        properties: {
          lop: {
            originalRef: 'IntegerControl',
            minLength: 6,
            maxLength: 8,
          },
          failureCode: {
            originalRef: 'StringControl',
            minLength: 2,
            maxLength: 2,
          },
        },
      },
    },
  },
};
