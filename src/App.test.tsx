import React from 'react';
import { App } from './App';
import { screen, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer();

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  server.resetHandlers();
});

test('data is fetched with no delay', async () => {
  server.use(
    rest.get('https://mydomain.com', (_, res, ctx) => {
      return res(
        ctx.json({
          message: 'success',
        })
      );
    })
  );

  render(<App />);

  await waitFor(
    () => {
      expect(screen.getByText('success')).toBeTruthy();
    },
    // Give a long timeout just to be sure
    { timeout: 10000 }
  );
});

test('data is fetched with short delay', async () => {
  server.use(
    rest.get('https://mydomain.com', (_, res, ctx) => {
      return res(
        ctx.delay(),
        ctx.json({
          message: 'success',
        })
      );
    })
  );

  render(<App />);

  await waitFor(
    () => {
      expect(screen.getByText('success')).toBeTruthy();
    },
    // Give a long timeout just to be sure
    { timeout: 10000 }
  );
});

test('data is fetched with long delay', async () => {
  server.use(
    rest.get('https://mydomain.com', (_, res, ctx) => {
      return res(
        ctx.delay(1000),
        ctx.json({
          message: 'success',
        })
      );
    })
  );

  render(<App />);

  await waitFor(
    () => {
      expect(screen.getByText('success')).toBeTruthy();
    },
    // Give a long timeout just to be sure
    { timeout: 10000 }
  );
});
