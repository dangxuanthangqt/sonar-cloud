import {
  getDataRequest,
  getDataRequestSchema,
  updateDataRequest,
} from './data-requests/response';
import { requestReportsHandler } from './reports/response';
import { keywordsHandler, updateKeywordRequest } from './keywords/response';
import { requestsViewHandler } from './requests-view/response';
import { signIn } from './sign-in/response';
import { signUp } from './sign-up/response';
import { getPlants, getVehicles } from './vehicles/response';

export const handlers = [
  getVehicles,
  getPlants,
  getDataRequestSchema,
  getDataRequest,
  updateDataRequest,
  updateKeywordRequest,
  signIn,
  signUp,
  ...requestsViewHandler,
  ...keywordsHandler,
  ...requestReportsHandler,
];
