export const MakeDate = (beforeDate) => {
  const date = new Date(beforeDate);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = cipherMatch(date.getHours());
  const minute = cipherMatch(date.getMinutes());

  const today = new Date();

  if (
    year === today.getFullYear() &&
    month === today.getMonth() + 1 &&
    day === today.getDate()
  ) {
    return `${hour}:${minute}`;
  }

  return `${year}년 ${month}월 ${day}일`;
};

// 한자릿수를 두자리로 자릿수 맞추기
const cipherMatch = (val) => {
  if (val < 10) return `0${val}`;
  else return val;
};
