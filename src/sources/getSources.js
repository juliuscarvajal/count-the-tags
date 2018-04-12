const path = require('path');
const fs = require('fs');

const FILE_PATH = path.join(__dirname, 'data');

const getSources = (dirPath = FILE_PATH) => (callback) => {
  fs.readdir(dirPath, (err, files) => {
    const sources = files.map(file => {
      try {
        return require(path.join(dirPath, file))
      } catch(error) {
        console.error(`Ignoring invalid JSON file: ${file}.`);
      }
    });

    callback(sources);
  });
};

module.exports = getSources;