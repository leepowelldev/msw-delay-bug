import React from 'react';
import { App } from './App';
import { screen, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('https://mydomain.com', (_, res, ctx) => {
    return res(
      ctx.delay(), // This passes
      // ctx.delay(1000), // This fails
      ctx.json({
        message: 'success',
      })
    );
  })
);

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});

beforeEach(() => {
  server.resetHandlers();
});

test('data is fetched', async () => {
  render(<App />);

  await waitFor(
    () => {
      expect(screen.getByText('success')).toBeTruthy();
    },
    // Give a long timeout just to be sure
    { timeout: 10000 }
  );
});
