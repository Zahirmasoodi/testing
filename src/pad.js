const pad = (num) => {
  if (num < 10) {
    return "00" + num;
  } else if (num > 9 && num < 100) {
    return "0" + num;
  } else return num;
};

export default pad;
