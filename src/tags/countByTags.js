const EventEmitter = require('events');
const utils = require('../common/utils');

const counterEvents = new EventEmitter();

const extractTags = (tags, source) => {
  if (!source) {
    return;
  }

  if (source.tags) {
    const commonTags = utils.intersection(source.tags, tags);
    commonTags.forEach(tag => counterEvents.emit(tag));      
  }

  if (source.children) {
    source.children.forEach(childSource =>
      extractTags(tags, childSource)
    );
  }
};

const countByTags = ({ getTags, getSources }, callback) => {
  getTags(tags => {
    // Initialize the count object and also 
    // initialize the event handlers in one loop.
    const count = tags.reduce((acc, tag) => {
      counterEvents.on(tag, () => {
        count[tag] = count[tag] + 1;
      });
  
      return { ...acc, [tag]: 0 };
    }, {});

    getSources(sources => {
      sources.map(source => extractTags(tags, source));
      callback(count);
    });

  });  
};

module.exports = countByTags;
