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
