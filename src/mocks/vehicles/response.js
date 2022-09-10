import { rest } from 'msw';
import { API_URL } from 'services/constant';
import { faker } from '@faker-js/faker';
import addVehicleSchema from './add-vehicle-schema.json';
import { API_MOCK_DELAY } from '@/common/constants';

export const getVehicleSchema = rest.get(
  `${API_URL}api/v1/vehicles/schema`,
  (_, res, ctx) => res(ctx.delay(API_MOCK_DELAY), ctx.json(addVehicleSchema))
);

export const getVehicles = rest.get(
  `${API_URL}api/v1/vehicles`,
  (_, res, ctx) =>
    res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json({
        plants: {
          items: Array.from(
            { length: faker?.datatype?.number({ min: 1, max: 10 }) },
            () => faker?.company?.companyName()
          ),
        },
        vehicleInfo: {
          items: [
            {
              bodyDescription: faker.vehicle.vehicle(),
              family: faker.vehicle.vehicle(),
              fromYear: 2010,
              line: 'CV',
              series: faker.vehicle.vrm(),
              style: faker.vehicle.color(),
              toYear: 2020,
            },
            {
              bodyDescription: faker.vehicle.vehicle(),
              family: faker.vehicle.vehicle(),
              fromYear: 2010,
              line: 'CV',
              series: faker.vehicle.vrm(),
              style: faker.vehicle.color(),
              toYear: 2020,
            },
            {
              bodyDescription: faker.vehicle.vehicle(),
              family: faker.vehicle.vehicle(),
              fromYear: 2010,
              line: 'CV',
              series: faker.vehicle.vrm(),
              style: faker.vehicle.color(),
              toYear: 2020,
            },
            {
              bodyDescription: faker.vehicle.vehicle(),
              family: faker.vehicle.vehicle(),
              fromYear: 2010,
              line: 'CV',
              series: faker.vehicle.vrm(),
              style: faker.vehicle.color(),
              toYear: 2020,
            },
          ],
        },
      })
    )
);

export const getPlants = rest.get(`${API_URL}api/v1/plants`, (_, res, ctx) => {
  return res(
    ctx.delay(API_MOCK_DELAY),
    ctx.json(
      Array.from(
        { length: faker?.datatype?.number({ min: 1, max: 30 }) },
        () => {
          const id = faker.database.mongodbObjectId();
          const title = faker.company.companyName();
          return { id, title };
        }
      )
    )
  );
});

export const createVehicleRequest = rest.post(
  `${API_URL}api/requests/:id/vehicles`,
  (req, res, ctx) => {
    return res(
      ctx.delay(API_MOCK_DELAY),
      ctx.json('Create vehicle request successfully')
    );
  }
);

export const newVehiclesHandler = [createVehicleRequest];
