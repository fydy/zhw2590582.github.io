const path = require("path");
const fs = require("fs-extra");
const glob = require("glob");
const importFresh = require("import-fresh");
const markdownit = require("markdown-it")();
const he = require("he");
const writeJson = require("write-json");
const dayjs = require("dayjs");
const logger = require("./logger");

exports.isProd = process.env.NODE_ENV === "production";

exports.dataPath = function() {
  const paths = {};
  const dataDir = glob.sync(path.join(process.cwd(), "src/data/*"));
  dataDir.forEach(item => (paths[path.basename(item)] = item));
  return paths;
};

exports.themePath = function() {
  const paths = {};
  const config = importFresh(exports.dataPath().config);
  const themeDir = glob.sync(
    path.join(process.cwd(), "src/theme", config.theme, "*")
  );
  themeDir.forEach(item => (paths[path.basename(item)] = item));
  return paths;
};

exports.htmlList = function() {
  const pages = exports.themePath().pages;
  return glob.sync(path.join(pages, "*.html")).map(item => {
    const filename = path.basename(item).toLowerCase();
    const chunkname = filename.replace(".html", "");
    return {
      filename: filename,
      template: path.resolve(item),
      chunk: {
        [chunkname]: path.join(exports.themePath().js, `${chunkname}.js`)
      },
      chunks: ["common", chunkname],
    };
  });
};

exports.mdToText = function(md) {
  const truncateString = (str, num) =>
    str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + "..." : str;
  const config = importFresh(exports.dataPath().config);
  const htmlData = markdownit.render(md);
  const stripedHtml = htmlData.replace(/<[^>]*>/g, "").replace(/[\r\n]/g, "");
  const decodedStripedHtml = he.decode(stripedHtml);
  return truncateString(decodedStripedHtml, config.website.post.excerpt);
};

exports.readDb = function() {
  return importFresh(path.join(exports.dataPath().database, "index.json"));
};

exports.writeDb = function(data) {
  const dbPath = path.join(exports.dataPath().database, "index.json");
  writeJson.sync(dbPath, data);
};

exports.resetDb = function() {
  exports.writeDb({
    posts: [
      {
        "title": "Hello World",
        "type": "default",
        "poster": "",
        "topic": "hello, world",
        "sticky": false,
        "name": "hello-world",
        "excerpt": "Welcome to Sleepy. This is your first post. Edit or delete it and start blogging!",
        "link": "/post.html?name=hello-world",
        "creatDate": dayjs().format("YYYY-MM-DD HH:mm:ss")
      }
    ]
  });
};

exports.readMeta = function(name) {
  const { posts } = exports.readDb();
  return posts.find(item => item.name === name) || {};
};

exports.delMeta = function(name) {
  const db = exports.readDb();
  const findItem = db.posts.find(item => item.name === name);
  const findIndex = db.posts.indexOf(findItem);
  if (findIndex > -1) {
    db.posts.splice(findIndex, 1);
    exports.writeDb(db);
  }
};

exports.updateMeta = function updateMeta(name, creat = true) {
  const config = importFresh(exports.dataPath().config);
  const db = exports.readDb();
  const { meta, post } = exports.postData(name);
  const excerpt = exports.mdToText(post);
  const currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss");
  const metaData = {
    ...meta,
    name: name,
    excerpt: excerpt,
    link: "/post.html?name=" + name
  };
  if (metaData.poster) {
    metaData.poster =
      metaData.poster.charAt(0) === "/"
        ? metaData.poster.slice(1)
        : metaData.poster;
    metaData.poster = config.dev.publicPath + metaData.poster;
  }
  if (creat) {
    metaData.creatDate = currentDate;
    db.posts.unshift(metaData);
  } else {
    const findItem = db.posts.find(item => item.name === name);
    const findIndex = db.posts.indexOf(findItem);
    if (findIndex > -1) {
      db.posts[findIndex] = { ...findItem, ...metaData };
    } else {
      updateMeta(name, true);
      return;
    }
  }
  exports.writeDb(db);
};

exports.cleanFiles = function() {
  const htmlFile = glob.sync(path.join(process.cwd(), "*.html"));
  const staticFile = glob.sync(path.join(process.cwd(), 'static', '*')).filter(item => {
    return path.basename(item) !== 'img';
  });
  return [...htmlFile, ...staticFile];
};

exports.beforeConfigCreate = function(config) {
  config.website.page = {};
  glob.sync(path.join(exports.dataPath().pages, "*.md")).forEach(item => {
    const filename = path
      .basename(item)
      .toLowerCase()
      .replace(".md", "");
    const pageData = fs.readFileSync(item, "utf-8");
    const htmlData = markdownit.render(pageData);
    config.website.page[filename] = htmlData;
  });
  return config;
};

exports.postData = function(name) {
  const reg = /<!---([\s\S]*?)-->/;
  const filePath = path.join(exports.dataPath().posts, `${name}.md`);
  const postData = fs.readFileSync(filePath, "utf-8");
  let meta;
  try {
    meta = JSON.parse(reg.exec(postData)[1]);
  } catch (error) {
    logger.fatal(
      "It seems that your markdown file contains illegal mate data in: " +
        filePath
    );
  }
  return {
    meta: meta,
    post: postData.replace(reg, "").replace(/^\s+|\s+$/g, "").trim()
  };
};
