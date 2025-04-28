import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const formatDate = (date: string) => {
  const publishedDate = dayjs(date);
  const now = dayjs();
  const hoursDiff = now.diff(publishedDate, "hour");

  if (hoursDiff < 24) {
    return publishedDate.fromNow(); // will show "x hours ago"
  } else {
    return publishedDate.format("DD MMM, YYYY");
  }
};

export default formatDate;
