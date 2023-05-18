function solution(D) {
  const result = {};

  // Define an array of day names starting from Monday
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  // Iterate over each key in the input dictionary
  for (const key in D) {
    const date = new Date(key);
    const dayIndex = date.getDay();
    const dayName = daysOfWeek[dayIndex];

    // If the day is already present in the result dictionary, add the value to it
    if (result.hasOwnProperty(dayName)) {
      result[dayName] += D[key];
    } else {
      // If the day is not present, create a new key-value pair
      result[dayName] = D[key];
    }
  }

  // Handle missing days by assigning the value as the mean of the previous and next day
  for (let i = 0; i < daysOfWeek.length; i++) {
    const currentDay = daysOfWeek[i];
    const prevDay = daysOfWeek[(i - 1 + daysOfWeek.length) % daysOfWeek.length];
    const nextDay = daysOfWeek[(i + 1) % daysOfWeek.length];

    if (!result.hasOwnProperty(currentDay)) {
      const prevValue = result[prevDay] || 0;
      const nextValue = result[nextDay] || 0;
      result[currentDay] = Math.round((prevValue + nextValue) / 2);
    }
  }

  // Sort the result dictionary by day name
  const sortedResult = {};
  Object.keys(result)
    .sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b))
    .forEach((key) => {
      sortedResult[key] = result[key];
    });

  return sortedResult;
}

// Example usage
const D1 = {
  '2020-01-01': 4,
  '2020-01-02': 4,
  '2020-01-03': 6,
  '2020-01-04': 8,
  '2020-01-05': 2,
  '2020-01-06': -6,
  '2020-01-07': 2,
  '2020-01-08': -2
};

const D2 = {
  '2020-01-01':6, 
  '2020-01-04': 12, 
  '2020-01-05': 14,
  '2020-01-06': 2, 
  '2020-01-07':4
}

console.log(solution(D1));
console.log(solution(D2));
