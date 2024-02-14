export const isValidDomain = (text = "") => {
  let err = "";
  if (!text) {
    err = "Domain Name Cannot be empty";
  } else {
    const pattern =
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    const isValid = pattern.test(text);
    if (!isValid) {
      err = "Invalid Domain Name";
    }
  }
  return err;
};

export const trimDomainName = (url) => {
  const domainRemovedURL = url.replace(/^https?:\/\/(?:www\.)?([^/]+).*/, "$1");

  if (domainRemovedURL == "") {
    const parsedUrl = new URL(url);
    let domain = parsedUrl.hostname;

    if (domain.startsWith("www.")) {
      domain = domain.slice(4); // Remove 'www.' if present
    }

    return domain;
  }

  return domainRemovedURL;
};

export const removeDomain = (url) => {
  const parsedUrl = new URL(url);
  let path = parsedUrl.pathname;

  // Remove the trailing slash if present
  path = path.endsWith("/") ? path.slice(0, -1) : path;

  return path;
};
