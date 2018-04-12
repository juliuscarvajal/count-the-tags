const path = require('path');
const app = require('./src/app');
const tags = require('./src/tags');
const sources = require('./src/sources');
const utils = require('./src/common/utils');
const args = process.argv.slice(2);

const callback = (data) => {
  const sorted = utils.sort(data);
  utils.render(sorted);
  app.updateCache(args, sorted);
};

app.serve(args, () => {
  tags.countByTags({
    getTags: tags.getTags(args),
    getSources: sources.getSources(),
  }, callback);  
});

