import {
  getDataRequest,
  getDataRequestSchema,
  updateDataRequest,
} from './data-requests/response';
import { requestReportsHandler } from './reports/response';
import { keywordsHandler, updateKeywordRequest } from './keywords/response';
import { requestsViewHandler } from './requests-view/response';
import { getPlants, getVehicles, getVehicleSchema } from './vehicles/response';

export const handlers = [
  getVehicleSchema,
  getVehicles,
  getPlants,
  getDataRequestSchema,
  getDataRequest,
  updateDataRequest,
  updateKeywordRequest,
  ...requestsViewHandler,
  ...keywordsHandler,
  ...requestReportsHandler,
];
