export const PROD = true;
export const TEST_PORT = 3000;
export const BACKEND_URL = PROD
  ? `http://localhost:${TEST_PORT}`
  : `http://localhost:${TEST_PORT}`;
