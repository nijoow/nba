export const dateToISO = (date: Date) => {
  const year = date.getFullYear().toString();
  const month =
    date.getMonth() + 1 > 10
      ? (date.getMonth() + 1).toString()
      : "0" + (date.getMonth() + 1).toString();
  const day =
    date.getDate() > 10
      ? date.getDate().toString()
      : "0" + date.getDate().toString();
  return `${year}=${month}-${day}`;
};
