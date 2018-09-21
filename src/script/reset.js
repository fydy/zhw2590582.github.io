const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");
const inquirer = require("inquirer");
const { dataPath, resetDb } = require("./utils");
const logger = require("./logger");

inquirer
  .prompt([
    {
      type: "confirm",
      message: "Confirm that you want to reset all article data?",
      name: "ok"
    }
  ])
  .then(answers => {
    if (answers.ok) {
      cleanPost();
      resetDb();
      cleanImg();
      creatInitPost();
      logger.success(`Reset successful!`);
    }
  })
  .catch(err => {
    logger.fatal(err);
  });

function cleanPost() {
  glob.sync(path.join(dataPath().posts, "*.md")).forEach(item => fs.removeSync(item));
}

function cleanImg() {
  glob.sync(glob.sync(path.join(process.cwd(), "static/img/*"))).filter(item => {
    return path.basename(item) !== 'default';
  }).forEach(item => fs.removeSync(item));
}

function creatInitPost() {
  const postDir = path.join(dataPath().posts, "hello-world.md");
  fs.writeFileSync(postDir, `
  <!---
  {
      "title": "Hello World",
      "type": "default",
      "poster": "",
      "topic": "hello, world",
      "sticky": false
  }
  -->

  Welcome to Sleepy. This is your first post. Edit or delete it and start blogging!`);
}
