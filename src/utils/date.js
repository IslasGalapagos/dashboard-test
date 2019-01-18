export const formatDate = (date, separator = '.', forReq = false) => {
  let day = String(date.getDate());
  day = day.length === 1 ? '0' + day : day;

  let month = String(date.getMonth() + 1);
  month = month = month.length === 1 ? '0' + month : month;

  let year = date.getFullYear();
  year = !forReq ? String(year).substr(2, 2) : year;

  return forReq
    ? `${year}${separator}${month}${separator}${day}`
    : `${day}${separator}${month}${separator}${year}`;
};

export const getPreviousWeek = () => {
  const now = new Date();
  const monday = now.getDate() - (now.getDay() + 6);
  const sunday = monday + 6;

  return [new Date(now.setDate(monday)), new Date(now.setDate(sunday))];
};
