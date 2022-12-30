const numFormat = (num, page = "") => {
  if (!num || num === undefined) return null;
  const strNum = num.toString();
  let fixedNum;
  if (strNum.includes(".")) {
    const idx = strNum.indexOf(".");
    if (page === "collectionDetail") {
      fixedNum = strNum.slice(0, idx);
    } else {
      fixedNum = strNum.slice(0, idx + 1) + strNum.slice(idx + 1, idx + 5);
    }
    return Number(fixedNum);
  } else {
    return num;
  }
};

export default numFormat;
