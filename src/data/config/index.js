const path = require("path");
const wrap = require("./wrap");
const isProd = process.env.NODE_ENV === "production";

const config = {
  theme: "default",
  dev: {
    port: 3000,
    outputPath: path.join(process.cwd(), "./"),
    publicPath: isProd ? "https://cdn.zhw-island.com/" : "/"
  },
  web: {
    title: "老赵茶馆",
    keywords: "老赵, 茶馆, 前端, 代码, 扯淡, 音乐, 电影, 分享",
    description: "老赵茶馆，日常扯淡",
    copyright: "© 2018 All Rights Reserved. 粤ICP备15035931号-1. 托管于 GitHub. 阿里云 提供 CDN 服务. 由 <a href=\"https://github.com/zhw2590582/island-cli\">Island</a> 驱动.",
    author: {
      name: "老赵茶馆",
      title: "一枚前端攻城狮",
      description: "Hi, 老赵其实不老, 就这样..."
    },
    baidutongji: '6878b56ee36c990a8330d8bc412ede91',
    gitting: {
      clientID: '2fa6841ea796af21b439',
      clientSecret: '4e2196768a4ce9ce143bf2b2ba378efcbd8081f8',
      repo: 'zhw2590582.github.io',
      owner: 'zhw2590582',
      admin: ['zhw2590582'],
      id: 'message'
    },
    post: {
      excerpt: 120,
      pageSize: 5,
      posterSize: 28,
      relatedPost: 3
    },
    menus: [
      {
        name: "关于",
        link: "/about.html"
      },
      {
        name: "归档",
        link: "/archive.html"
      },
      {
        name: "留言",
        link: "/message.html"
      },
      {
        name: "编辑器",
        link: "/editor.html"
      }
    ],
    socials: [
      {
        name: "weibo",
        link: "http://weibo.com/qq717995589"
      },
      {
        name: "github",
        link: "https://github.com/zhw2590582"
      },
      {
        name: "dribbble",
        link: "https://dribbble.com/HarveyZack"
      },
      {
        name: "twitter",
        link: "https://twitter.com/HarveyZack1990"
      }
    ],
    links: [
      {
        name: "weibo",
        link: "http://weibo.com/qq717995589"
      },
      {
        name: "github",
        link: "https://github.com/zhw2590582"
      },
      {
        name: "dribbble",
        link: "https://dribbble.com/HarveyZack"
      },
      {
        name: "twitter",
        link: "https://twitter.com/HarveyZack1990"
      }
    ]
  }
};

module.exports = wrap(config);
