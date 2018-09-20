const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");
const inquirer = require("inquirer");
const slugify = require("@sindresorhus/slugify");
const { dataPath, delMeta } = require("./utils");
const logger = require("./logger");
const postName = process.argv[2];

const choices = glob
  .sync(path.join(dataPath().posts, "*.md"))
  .map(filePath => path.basename(filePath).replace(".md", ""));

if (!postName) {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Which article do you want to delete?",
        name: "postName",
        choices: choices
      }
    ])
    .then(answers => {
      delPost(answers.postName);
    })
    .catch(err => {
      logger.fatal(err);
    });
} else {
  delPost(postName);
}

function delPost(name) {
  name = slugify(name);
  const postDir = path.join(dataPath().posts, name + ".md");
  if (fs.existsSync(postDir)) {
    fs.removeSync(postDir);
    logger.success(`Successfully deleted: ${postDir}`);
    delMeta(name);
  } else {
    logger.fatal(`Directory does not exist: ${postDir}`);
  }
}
