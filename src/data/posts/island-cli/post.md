## Github  
[https://github.com/zhw2590582/island-cli](https://github.com/zhw2590582/island-cli)

## 简介
首先 `island-cli` 是一个生成静态博客的命令行工具，工具本身的命令很少，主旨用来把静态网页托管于`github pages`上。然后这个工具很大部分功能是根据我的使用习惯来制作的，所以并没有像 `hexo` 那么人性化和复杂化，最后由于这个工具比较小众化，所以不会往深度去开发，但会一直优化下去，欢迎大家提建议。

`github pages` 很适用于那些只有域名但没有(钱买)服务器，而且还免费附赠 `https` ，但主要问题就是它是国外服务器，而且没有数据库。像  `hexo` 就是只负责生成静态页面，然后托管于`github pages` 的，而我这个工具也类似这样，但我并没有使用过  `hexo` ，所以具体它是怎么实现的就不讨论了。

另外 `github pages`  支持一个开发工具叫 `jekyll` ，虽然方便但每次 `push` 都需要一段时间去等待编译，所以并不是那么适合那些经常改动页面的人。

 `island-cli` 工具本身依赖于 `nodejs` 和 `webpack`，且需要一定的前端知识，所以不会详细解说一些前端知识，遇到问题可以到 `github` 提交 `issues`。

## 使用

首先是全局安装，安装好后就可以使用 `island` 命令了

```
npm install -g island-cli
```

以下是全部命令
```
初始化一个博客
    $ island -i
    $ island init

当前版本
    $ island -v
    $ island version

新增一篇文章
    $ island -a <name>
    $ island add <name>

删除一篇文章
    $ island -x <name>
    $ island del <name>

重置所有文章内容
    $ island -r
    $ island reset

更新一个主题
    $ island -u <name>
    $ island update <name>

开发模式
    $ island -d
    $ island dev

生产模式
    $ island -b
    $ island build
```

## 流程
这里要说一说整个搭建的简单流程，怎么从一个只有域名到完整的 `github pages` 网站搭建。

+ 新建一个 `github repository`
+ 建立 `GitHub Pages`，选择从 `master branch` 根目录创建
+ 绑定你的自定义域名，你就可以通过你的域名访问到你的 `github repository`
+ 把 `github repository` 克隆到你的本地，并用命令行工具进入目录
+ 执行 `island init` 命令，稍等一会就可以看到创建的文件了
+ 再执行 `npm install && npm start` ，等一会就可以看到你的本地网站了
+ 开发完成后，执行 `npm run build` 会生成全部的静态文件
+ 最后 `push` 到远程 `github repository`，再通过域名就可以访问到网站了

## 目录
```
├── src  开发目录
├── ├── data   数据目录
├── ├── ├── config   配置目录
├── ├── ├── database  伪数据库目录
├── ├── ├── pages  页面数据目录
├── ├── ├── posts  文章数据目录
├── ├── theme   主题目录
├── ├── ├── default  默认主题
├── static   静态目录
├── ├── img  图片目录
```

## 原理
其实没太复杂的原理，博客系统主要问题是文章数据怎么读取和存储，我把每个文章 `markdown` 的数据转换成 `js` 文件，然后进行按需加载，而并非把每篇文章转换成 `html` 文件，这意味着文章部分舍弃了 `seo` ，所以开发和打包都这么快。然后我建立了一个 `json` 伪数据库，里面保存了所有文章的元数据并暴露到 `window.database`，所有页面都可以访问到文章的元数据并进行各种操作，相当方便。

## 问题
+ 怎么开发主题
+ 怎么使用cdn
+ 怎么使用功能页面
+ 怎么写配置文件
+ 怎么让页面模块化和布局分离
+ 怎么加载图片
+ ...待续