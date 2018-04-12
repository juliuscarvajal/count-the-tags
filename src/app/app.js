const fs = require('fs');
const path = require('path');
const utils = require('../common/utils');

const CACHE_FILE_PATH = path.join(__dirname, 'app.cache.json');

const updateCache = (args, data) => {
  const serializeData = JSON.stringify({
    request: args,
    response: data,
  });
  fs.writeFile(CACHE_FILE_PATH, serializeData, (err) => {
    if (err) {
      console.error(`Error when writing to ${CACHE_FILE_PATH}:`, err);
    }

    console.log(`Results cached to ${CACHE_FILE_PATH}`);
  });
};

const shouldServeFromCache = (args, cache) => {
  // For simplicity's sake, just compare args 
  // and serve from cache if args are the same.
  // If time permits, we can check fs.stat, etc.
  const { request, response } = cache || {};
  const combinedArgs = utils.combineArgs(args);
  const combinedOrigArgs = utils.combineArgs(request);
  const difference = utils.difference(
    combinedArgs,
    combinedOrigArgs,
  );
  const isSameArgs = 
    difference.size === 0 && 
    combinedArgs.length === combinedOrigArgs.length;

  return isSameArgs;
};

const serve = (args, callback) => {
  let cache = null;
  try {
    cache = require(CACHE_FILE_PATH);
  } catch(err) {
    console.error(`Error accessing ${CACHE_FILE_PATH}`, err)
  }

  if (cache && shouldServeFromCache(args, cache)) {
    return utils.render(cache.response);
  }

  return callback();
};

module.exports = {
  updateCache,
  serve,
};
