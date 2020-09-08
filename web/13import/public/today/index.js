const days = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];

const HTML = (day) => {
  return `<div class="date">${day}</div>`;
}

const today = ()  => {
  const day = days[new Date().getDay() - 1 ];
  return HTML(day);
}

export { today }