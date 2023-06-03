const dateToUse = (date) => {
  const now = new Date(date);

  return "" + now.getFullYear() + now.getMonth() + now.getDate();
};

export default dateToUse;
