import formatDistanceToNowX from "date-fns/formatDistanceToNow";
import en from "date-fns/esm/locale/en-US";
import strings from "./localization";

const locales = {
  en: en
};

const currentLocale = locales[strings.location];

const formatDistanceToNow = (date, options) => {
  return formatDistanceToNowX(date, {
    addSuffix: true,
    includeSeconds: true,
    locale: currentLocale,
    ...options
  });
};

export { formatDistanceToNow };
