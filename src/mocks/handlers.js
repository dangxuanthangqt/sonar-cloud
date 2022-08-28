import {
  getDataRequest,
  getDataRequestSchema,
  updateDataRequest,
} from './data-requests/response';
import { requestReportsHandler } from './reports/response';
import { keywordsHandler, updateKeywordRequest } from './keywords/response';
import { requestsViewHandler } from './requests-view/response';
import { getPlants, getVehicles, getVehicleSchema } from './vehicles/response';
import { signIn } from './sign-in/response';
import { signUp } from './sign-up/response';

export const handlers = [
  getVehicleSchema,
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
