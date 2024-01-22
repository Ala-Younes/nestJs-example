import * as newman from 'newman';

newman.run(
  {
    collection: require('../src/postman_tests/myCollection.json'),
    reporters: 'cli',
  },
  function (err) {
    if (err) {
      throw err;
    }
    console.info('collection run complete!');
  },
);
