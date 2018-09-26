const fs = require("fs-extra");
const logger = require("./logger");
const { cleanFiles } = require("./utils");
cleanFiles().forEach(item => fs.removeSync(item));
logger.success('Clean up the file successfully！');
