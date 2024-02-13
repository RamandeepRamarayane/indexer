export const PROD = false;
export const TEST_PORT = 3000;

const TEST_URL = `https://nonprod-api.bulkindexer.net`;

export const BACKEND_URL = PROD ? `http://localhost:${TEST_PORT}` : TEST_URL;
