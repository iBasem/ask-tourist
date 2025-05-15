import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';

// Temporarily comment out MSW setup until we implement handlers
// import { server } from './mocks/server';

// Setup MSW server for testing
// These will be uncommented when we implement the full MSW setup
// beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
