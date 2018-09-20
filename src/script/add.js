const path = require("path");
const fs = require("fs-extra");
const slugify = require("@sindresorhus/slugify");
const logger = require("./logger");
const { dataPath, updateMeta } = require("./utils");
const name = process.argv[2];

if (!name) {
  logger.fatal(
    "Please enter the name of the article that needs to be initialized: npm run add [name]"
  );
}

const postName = slugify(name);
const postDir = path.join(dataPath().posts, postName + ".md");

if (fs.existsSync(postDir)) {
  logger.fatal(
    `The article directory already exists, please delete it first: npm run del ${postName}`
  );
}

const fileData = `<!---
{
    "title": "${postName}",
    "type": "default",
    "poster": "",
    "topic": "",
    "sticky": false
}
-->
### ${postName}
`;

fs.writeFileSync(postDir, fileData);
logger.success(`Successfully created: ${postDir}`);
updateMeta(postName, true);
