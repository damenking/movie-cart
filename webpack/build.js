const { webpack } = require('webpack');
const config = require('./webpack.prod.js');

webpack(config, (err, stats) => {
  const errorsToReport = err || stats?.hasErrors();
  if (errorsToReport) {
    console.error(err || stats?.compilation?.errors);
    console.error(stats?.compilation?.warnings);
  }
});
