const fs = require('fs');
const path = require('path');
const readline = require('readline');
const utils = require('../common/utils');

const FILE_PATH = path.join(__dirname, 'tags.txt');

const loadTags = (filePath = FILE_PATH) => (callback) => {
  const rl = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  let tags = [];

  rl.on('line', (line) => {
    tags.push(line);
  });

  rl.on('close', () => {
    callback(tags);
  });
};

const combineCsts = (acc, cst) => {
  const split = cst.split(',');
  return [...acc, ...split];
};

// csts: Comma separated tags
const toArray = (csts) => (callback) => {
  return callback(utils.combineArgs(csts));
};

const getTags = (tags) => (tags && tags.length > 0)
  ? toArray(tags)
  : loadTags();

module.exports = getTags;