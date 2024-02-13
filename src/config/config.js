export const PROD = true;
export const TEST_PORT = 3000;

const TEST_URL = `https://nonprod-api.bulkindexer.net`;

export const BACKEND_URL = PROD ? TEST_URL : TEST_URL;
