import moment, { diff } from "moment";

export const textShortner = (data, limit) => {
  if (data.length <= limit) {
    return data;
  } else {
    return data.substring(0, limit) + "...";
  }
};

export const debounceWrapper = (func, time, timeoutRef) => {
  if (timeoutRef) {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      func();
    }, time);
  }
};

export function grade(quality, wordCount, seoScore = 0) {
  if (quality >= 7 && quality <= 10) {
    return "A";
  } else if (quality >= 5 && quality <= 6.5) {
    return "B";
  } else if (quality >= 3.5 && quality <= 4.5) {
    return "C";
  } else if (quality >= 2.5 && quality <= 3) {
    return "D";
  } else if (quality >= 1.5 && quality <= 2) {
    return "E";
  } else if (quality >= 0 && quality <= 1 && wordCount && wordCount != 0) {
    return "F";
  } else if (seoScore > 0) {
    return seoScore;
  } else {
    return "-";
  }
}

export function numberWithCommas(num) {
  return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
}

export function mobileViewportReset() {
  if (window.metaTagViewport) {
    const initialScale = 0.25 + Math.random() * 0.01;
    if (window.metaTagViewport.isConnected)
      document.head.removeChild(window.metaTagViewport);
    window.metaTagViewport.setAttribute(
      "content",
      `width=1500,initial-scale=${initialScale},maximum-scale=0.25,minimum-scale=0.25`
    );
    document.head.appendChild(window.metaTagViewport);
    document.head.removeChild(window.metaTagViewport);

    window.metaTagViewport.setAttribute(
      "content",
      `width=1500,initial-scale=${initialScale},maximum-scale=0.5,minimum-scale=0.2`
    );
    document.head.appendChild(window.metaTagViewport);
    document.scrollingElement.scrollTop = 0;
  }
}

export const isMobile = () => {
  return navigator.userAgent.includes("Mobile");
};

export const isAppVersionOutdated = ({
  currVersion = "2.1.0",
  minVersion = "2.0.0",
}) => {
  const current = currVersion.split(".");
  const minimum = minVersion.split(".");

  for (let index = 0; index < current.length; index++) {
    if (+current[index] < +minimum[index]) return true;
    else if (+current[index] > +minimum[index]) return false;
  }

  return false;
};

export const parseForRegex = (str = "") => {
  str = str || "";
  const specialChars = /\[|\\|\^|\$|\.|\||\?|\*|\+|\(|\)/;
  let parsedStr = "";
  for (const char of str) {
    if (specialChars.test(char)) {
      parsedStr = `${parsedStr}\\${char}`;
    } else {
      parsedStr = `${parsedStr}${char}`;
    }
  }

  return parsedStr;
};

export const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(http(s)?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!urlPattern.test(urlString);
};

export const formatURL = (url) => {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  } else {
    return "https://" + url;
  }
};

const emailRegex =
  /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+$/;

export const emailValidatorS = (email) => {
  email = email.trim();
  const pattern = new RegExp(emailRegex);
  if (!email.match(pattern)) {
    return false;
  }
  return true;
};

export const openLinkWindow = (e, link) => {
  e.preventDefault();
  window.open(
    link,
    "",
    `left=100000,top=0,width=${
      window.screen.width / 2 < 600 ? window.screen.width / 2 : 600
    },height=${window.screen.height}`
  );
};

//listen for link click events at the document level

export const emailValidator = (email) => {
  email = email.trim();
  let msg = "";
  if (email === "") {
    msg = "Please enter your email address";
    return [false, msg];
  }

  var pattern = new RegExp(emailRegex);

  if (!email.match(pattern)) {
    msg = "Please enter valid email address";
    return [false, msg];
  }
  return [true, msg];
};

export const pwdValidator = (pwd) => {
  let msg = "";
  if (pwd === "") {
    msg = "Please enter the password";
    return [false, msg];
  }
  return [true, msg];
};
export const formValidatorGoogle = ({ phone, company, terms }) => {
  let isValid = false;
  try {
    isValid =
      terms && phone && phone.trim().length <= 15 && company.trim().length > 0;
  } catch (error) {
  } finally {
    return isValid;
  }
};

export const formValidator = ({
  name,
  email,
  _email,

  password,
}) => {
  let isValid = false;
  try {
    isValid =
      name.trim().length > 0 &&
      ((email + "").trim().length > 0 || (_email + "").trim().length > 0) &&
      password.trim().length >= 6 &&
      emailValidatorS(_email);
  } catch (error) {
  } finally {
    return isValid;
  }
};

export const quesValidator = (ans, questions) => {
  // TODO
  // if(!(ans.length==questions.length)){
  //     return false;
  // }

  // for(const key of ans){

  //     if(!(key?.answer.trim())){
  //         return false;
  //     }

  // }

  return true;
};

export const formatDate = (date) => {
  if (date) {
    const _date = new Date(date);
    return _date.toDateString();
  }
};

export const formatTime = (time) => {
  if (time) {
    let _time = new Date(time);
    var T = `${
      _time.toLocaleTimeString("en-GB").split(":")[0] < 9
        ? "0" + _time.toLocaleTimeString("en-GB").split(":")[0]
        : _time.toLocaleTimeString("en-GB").split(":")[0]
    } : ${_time.toLocaleTimeString("en-GB").split(":")[1]}`;
    return T;
  }
  return T;
};

export const filterProjectsStatus = (role, project, statuses, active) => {
  if (role === "free_lancer") {
    if (
      active &&
      (project.status <= 2 || project.status === 4 || project.status === 8)
    ) {
      return true;
    } else if (!active) {
      return true;
    }

    return false;
  }

  if (statuses.length === 0) {
    return true;
  }
  for (const status of statuses) {
    if (project?.status?.toLowerCase()?.includes(status?.toLowerCase())) {
      return true;
    }
  }
};

export const filterWithDate = (project, start, end) => {
  let startDate = null;
  let endDate = null;
  if (start === null && end === null) {
    return true;
  }
  if (start != null) startDate = new Date(start);

  return false;
};

export const filterProjectsVariants = (role, project, statuses) => {
  if (role === "free_lancer") {
    return true;
  }

  if (statuses.length === 0) {
    return true;
  }
  for (const status of statuses) {
    if (project?.variant_name?.toLowerCase().includes(status?.toLowerCase())) {
      return true;
    }
  }

  return false;
};

export const mobile = (width) => {
  if (width <= 690) {
    return true;
  }
  return false;
};

export const getTime = (time) => {
  if (!time) return "";
  const date = new Date(time);

  return moment([
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ]).fromNow();
};

export const getShortDateTime = (date) => {
  let dt = new Date(date);
  let d = dt.toLocaleDateString([], { dateStyle: "medium" });
  d = d.split(",")[0];
  let t = dt.toLocaleTimeString([], { timeStyle: "short" });
  let result = d + ", " + t;
  return result;
};

export const getPastAsTime = (time) => {
  const date = new Date(time);
  return moment([
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ]).fromNow();
};

export const getRemainingTime = (timestamp) => {
  const targetTimestamp = new moment(timestamp);
  const currentTime = moment.now();
  const timeDifference = targetTimestamp - currentTime;
  if (timeDifference <= 0) {
    return "0 hours";
  }

  if (timeDifference < 60000) {
    const seconds = Math.floor(timeDifference / 1000);
    return `${seconds} second${seconds !== 1 ? "s" : ""}`;
  } else if (timeDifference < 3600000) {
    const minutes = Math.floor(timeDifference / 60000);
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else {
    const hours = Math.floor(timeDifference / 3600000);
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  }
};

export const getPastAsExpiredTime = (time) => {
  const momentDate = moment(time);
  const dateNow = moment();

  if (dateNow.diff(momentDate) > 0) return "Expired";

  const date = new Date(time);
  return moment([
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ]).fromNow();
};

export const getDeadline = (time, setStatusName, threshold) => {
  const dur = new Date(time) - new Date();

  if (threshold && dur < 0) {
    return setStatusName(6);
  }

  if (dur < 0) {
    return setStatusName(7);
  }

  const duration = moment.duration(dur);

  if (duration.days()) {
    if (duration.days() > 1) return duration.days() + " days left";
    return duration.days() + " day left";
  }
  return duration.hours() + "hr" + " : " + duration.minutes() + "m" + " left";
};

export function returnSecondaryTexts(freelancerName, reqStatus, clientStatus) {
  const secondaryTexts = [
    "No Freelancer Assigned",
    `Request sent to ${freelancerName}`,
    `Assigned to ${freelancerName}`,
    "Submission Received",
    `Revision Requested from ${freelancerName}`,
  ];

  if (!reqStatus || clientStatus === "*CANCELLED*") return "";

  if (reqStatus === 1) {
    return secondaryTexts[0];
  } else if (reqStatus === 2) {
    return secondaryTexts[2];
  } else if (reqStatus === 8) {
    return secondaryTexts[1];
  } else if (
    reqStatus === 3 &&
    clientStatus !== "SUBMITTED FOR REVIEW" &&
    clientStatus !== "REVISION REQUESTED"
  ) {
    return secondaryTexts[3];
  } else if (reqStatus === 4) {
    return secondaryTexts[4];
  } else if (reqStatus === 6) {
    return secondaryTexts[0];
  } else return "";
}

export function replaceURLWithHTMLLinks(text) {
  var exp =
    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  return text.replace(exp, "<a target='_blank' href='$1'>$1</a>");
}

export function getFreelancerTypeFromID(id) {
  if (id === null) {
    return null;
  }
  const freelancerTypes = [
    "Content Editor",
    "Graphic Editor",
    "Writer",
    "Designer",
  ];

  return freelancerTypes[id - 1];
}

export function thousands_separators(num) {
  try {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  } catch {
    return 0;
  }
}

export function parseJSON(data) {
  try {
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export const getInitials = (username) => {
  let initials = "";
  const usernameArray = username.split(" ");
  initials += usernameArray[0].charAt(0);

  if (usernameArray.length > 1) {
    initials += usernameArray[1].charAt(0);
  }

  return initials;
};
