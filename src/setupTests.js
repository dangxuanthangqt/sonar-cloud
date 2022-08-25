/* eslint-disable import/no-extraneous-dependencies */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from 'mocks/server';

import { configure as configureReact } from '@testing-library/react';
import { configure as configureDom } from '@testing-library/dom';

const MAX_TIMEOUT_INTERVAL = 10000;
jest.setTimeout(MAX_TIMEOUT_INTERVAL);

const MAX_ASYNC_TIMEOUT_INTERVAL = 5000;
configureReact({ asyncUtilTimeout: MAX_ASYNC_TIMEOUT_INTERVAL });
configureDom({ asyncUtilTimeout: MAX_ASYNC_TIMEOUT_INTERVAL });

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
