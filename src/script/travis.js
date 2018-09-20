const path = require("path");
const exec = require('child_process').exec;
const logger = require("./logger");
const { dataPath } = require("./utils");
const configPath = dataPath().config;
const { theme } = require(configPath);
const themeDist = path.join(process.cwd(), "src/theme", theme);
exec(`cd ${themeDist} && npm install`, function (err, stdout, stderr) {
    if (err) logger.fatal(err);
    console.log(stdout);
    exec('npm run build', function (err, stdout, stderr) {
        if (err) logger.fatal(err);
        console.log(stdout);
    });
});