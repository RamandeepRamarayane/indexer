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
  getDomainInfo: "/api/domain/overview?domain_name=",
  autoIndexUpdate: "/api/autoindex",
  overview: "/api/user/overview",
  // Pages
  getPages: "/api/pages?domain_name=",
  addPages: "/api/pages",
  indexPages: "/api/pages/index",

  // sitemap
  addSiteMap: "/api/sitemaps",
  syncSiteMap: "/api/sitemaps/sync",
  getSiteMaps: "/api/sitemaps",
  deleteSiteMap: "/api/sitemaps/delete",

  //domain credential
  addCredentials: "/api/auth/add-credentials",
  deleteCredentials: "/api/auth/delete-credentials",
  getCredentials: "/api/auth/get-credentials",

  //plans
  fetchUserPlan: "/api/user/plan",
  fetchPlans: "/api/subscription/plans",
  payment: "/api/subscription/create-session",
};
