const path = require("path");
const exec = require('child_process').exec;
const logger = require("./logger");
const build = require('./build');
const { dataPath } = require("./utils");
const configPath = importFresh(dataPath().config);
const { theme } = require(configPath);
const themeDist = path.join(process.cwd(), "src/theme", theme);
exec(`cd ${themeDist} && npm install`, function (err, stdout, stderr) {
    if (err) logger.fatal(err);
    build();
});