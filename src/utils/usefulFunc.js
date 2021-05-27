// const date = new Date(userDetails.createdAt.seconds * 1000);
// function join(t, a, s) {
//   function format(m) {
//     let f = new Intl.DateTimeFormat('en', m);
//     return f.format(t);
//   }
//   return a.map(format).join(s);
// }

// let a = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }];
// let s = join(date, a, '-');
// console.log(s);

export const formatSecondsToDate = (secondsOptioned) => {
  const date = new Date(secondsOptioned * 1000);
  const joinDate = (date, format, joinFormat) => {
    function formatDate(m) {
      let f = new Intl.DateTimeFormat('en', m);
      return f.format(date);
    }
    return format.map(formatDate).join(joinFormat);
  };
  let format = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }];
  let formatedDate = joinDate(date, format, '-');
  return formatedDate;
};

export const valueChopper = (value, maxValue) => {
  if (value?.length >= maxValue) {
    const choopedValue = value?.slice(0, maxValue);
    return `${choopedValue}...`;
  } else {
    return value;
  }
};
