export default (released) => {
  const date = new Date();
  const oneDay = 24 * 60 * 60 * 1000;
  const date1 = new Date(released);
  const date2 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round(Math.abs(date2 - date1) / oneDay);

  if (diffDays === 0) {
    return 'Today';
  }
  if (diffDays === 1) {
    return '1 Day Ago';
  }
  if (diffDays === 2) {
    return '2 Days Ago';
  }
  if (diffDays === 3) {
    return '3 Days Ago';
  }
  if (diffDays === 4) {
    return '4 Days Ago';
  }
  if (diffDays === 5) {
    return '5 Days Ago';
  }
  if (diffDays === 6) {
    return '6 Days Ago';
  }
  if (diffDays === 7) {
    return 'A week ago';
  }
  return released;
};
