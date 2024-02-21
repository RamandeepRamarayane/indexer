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

export const TEMP_CREDS = {
  type: "service_account",
  project_id: "bulk-indexer-401311",
  private_key_id: "d01ad1877452bd2c3e9269bd97c9170bd85697f6",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDSYGl8gpehnW3O\nOPamZ5SZagxn02ukWV37BfPYxsVbCBOPPbX9WcFualOBCocFZHd7axyu1NAcRfws\naID65POys5bdrfYgcSwnbQEWzcXPgvrvfGHgZtuNdsZtFuBJqKN4k5Vxjdvu5/ao\nMhW1gaNDHd/kN1mtHX7UpnT0nU7Ju5S2JxdMHiI9LAg9gZMWtStpTLUObsSkuoAL\neIdfXtR8wAAyYsKvG8PhkQqvkY/TWWYFiU4tAlNzBq6+G0mazhiogBe1UM1AT/8u\n0eiGYHp21ntFmOV7NZ2t4alSbNw0CSH2oplwSJZHcOmFx118ZP09jalvBbZ5FsYT\nomoyQDq7AgMBAAECggEADhSy6skI4iHZ4CQy6hdjvFL7SpW9ji4HGs6esCM5wWqM\neJluTWtNBZlrRmdQez1qu+GC9Xa8CTBr/QLvoxtg7lST4/mJUEmS5X6nxIF4XHfN\nWOsv1+e6iUDqbhHKaFO3wVHLfmK61kZDXaWgi1oGde8RdcJ4p5wiSZRsnpTK2bir\n3gqKpXmCIDAZJi01TY1rtNvByADST38IsJSZQdos8ivOFQK6b0GqWsIFgu3JR40+\nnqJQeTMoPkfhS6T4dU9dcZ/HilOq81aCK2DLcGo0qI6+d1zi0juhOf9b2VmJZBJF\nXMDowhAOJWWVunDNNeymx965yas2couTCUESWnvWoQKBgQDoFFZXho+bja7qA+7k\nxPjWTReBvPcvDzyTkYuf4Du5rGksXlBJtkP7q1HUTLLDSAtUnQpTTpeKF4tnMfDJ\nBKvcB0moxoBV1BAjq1ZPw8VV/xLPeCX8yqgTCy+GJKa+YSyLQMk+9E8sG9yq2o05\ns5a4hrT/BpfWPDNs69aGIRDKoQKBgQDoD2wnNyWsyKET7/WEKuIqFPkjkyVzxkLw\ncCmM+1U/nortz0wx1L2ouw3pNPO9B5VCHg+BII/C8Pc7yVANMMzl/l9sGJ4kqrKu\nnI0HMieGeDUufthqvWyg3RS3yFlvOxWy3jgLFf/hbvjwb0Jyh3qRIvWh86YogLPA\nDkHccqMD2wKBgFN8vXLPHWpAFeRpdc8mbL3rDcHGUMXFHW2YtjnVWKb6tvsXEprx\nzpMClnVhAg3uJOVTeRtu8mTjA2skNBKcc5a7qGvmvNQjbYrnYC1hp+O/1ux7tG60\nGLKBG5+OH83s9zFBJSRYjwK3IzLzXEqdqGLJUuNLY+PV1EoirRGjY38BAoGAUqCD\nKudo47/AEuBC9B9szf0PxIn1MObsGL5nHQq0jOV/pDNGdwu/yB9qUZoIG0ti6trX\nPGwCpC+2aDRC659vpYjQIyYU0QtyedfGI0TJbAjLLtX9auwtjI2LffC5X3CTRk/3\ndoMLzBH+U2XaK/tvOdRPz614gT1qQz0QWFT9FDcCgYEAku28pPrVuD15TOZV5V/d\nEh7njrIJS/kWwqd3rKyQ5xF1XjYoBZHJLasPgtCp76mFLM2K8JjOTWy4bs2dU+GK\nn8pn8R4TtDxWlU+mPjzWl3hSnKTXa3/zpJmz1CTMB+DQrDmOWyMZz+y+VvNAobWE\nmbmqiL7/WfRaW1c1CwEQR3o=\n-----END PRIVATE KEY-----\n",
  client_email: "bb-672@bulk-indexer-401311.iam.gserviceaccount.com",
  client_id: "107069354708137130149",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/bb-672%40bulk-indexer-401311.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
