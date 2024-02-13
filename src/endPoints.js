export const endPoints = {
  // Auth
  login: "/api/auth/login",
  register: "/api/auth/register",
  verify: "/api/auth/verify-email",
  loginViaToken: "/api/user/loginViaToken",

  //Domains
  addDomains: "/api/domain",
  deleteDomains: "/api/domain/delete",
  getDomains: "/api/domain",

  // sitemap
  addSiteMap: "/api/sitemaps",
  syncSiteMap: "/api/sitemaps/sync",
  getSiteMaps: "/api/sitemaps",

  //domain credential
  addCredentials: "/api/auth/add-credentials",
  deleteCredentials: "/api/auth/delete-credentials",
  getCredentials: "/api/auth/get-credentials",
};
