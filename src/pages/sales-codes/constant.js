export const saleCodeProperties = {
  helpText: {
    type: 'string',
    readOnly: true,
  },
  permission: {
    originalRef: 'Permission',
  },
  salesCodeEnum: {
    enum: ['MATCH_ALL_SALES_CODE', 'MATCH_ANY_SALES_CODE'],
  },
  title: {
    type: 'string',
  },
};

export const salesCodeEnum = ['MATCH_ALL_SALES_CODE', 'MATCH_ANY_SALES_CODE'];
