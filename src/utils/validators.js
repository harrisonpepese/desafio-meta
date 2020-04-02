
exports.validEmail = (string) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(string);
};

exports.validPhone = (number) => {
  const regex = /\d{2,}\d{4,}\d{4}/g;
  return regex.test(number);
};
