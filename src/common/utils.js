const render = (data) => {
  // For simplicity's sake, using fixed padding for now.
  // If time permits, we can check for longest keys to
  // base the padding from.
  Object.entries(data).forEach(([key, value]) => {
    console.log(key.padEnd(10), value);
  });
}

const descending = (a, b) => {
  const [ keyA, valueA ] = a;
  const [ keyB, valueB ] = b;

  return valueB - valueA;
};

const toKeyValueField = (acc, [key, value]) => ({
  ...acc,
  [key]: value,
});

const sort = (result, sortFunc = descending) => {
  return Object.entries(result)
    .sort(sortFunc)
    .reduce(toKeyValueField, {});
};

const intersection = (array1, array2) => {
  const a1 = new Set(array1);
  const a2 = new Set(array2);
  return new Set(
    [...a1].filter(v => a2.has(v))
  );
};

const difference = (array1, array2) => {
  const a1 = new Set(array1);
  const a2 = new Set(array2);
  return new Set(
    [...a1].filter(v => !a2.has(v))
  );
};

const combine = (acc, args) => {
  const split = args.split(',');
  return [...acc, ...split];
};

const combineArgs = (args) => {
  // Using Set to eliminate duplicates
  const tags = new Set(
    args.reduce(combine, []).filter(String)
  );

  return [...tags];
};

module.exports = {
  combineArgs,
  intersection,
  difference,
  sort,
  render,
};
