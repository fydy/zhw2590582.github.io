(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{54:function(module,exports){eval('module.exports = "<section><h2>Github</h2>\\n<p><a href=\\"https://github.com/zhw2590582/island-cli\\">https://github.com/zhw2590582/island-cli</a></p>\\n<h2>简介</h2>\\n<p>首先 <code>island-cli</code> 是一个生成静态博客的命令行工具，工具本身的命令很少，主旨用来把静态网页托管于<code>github pages</code>上。然后这个工具很大部分功能是根据我的使用习惯来制作的，所以并没有像 <code>hexo</code> 那么人性化和复杂化，最后由于这个工具比较小众化，所以不会往深度去开发，但会一直优化下去，欢迎大家提建议。</p>\\n<p><code>github pages</code> 很适用于那些只有域名但没有(钱买)服务器，而且还免费附赠 <code>https</code> ，但主要问题就是它是国外服务器，而且没有数据库。像  <code>hexo</code> 就是只负责生成静态页面，然后托管于<code>github pages</code> 的，而我这个工具也类似这样，但我并没有使用过  <code>hexo</code> ，所以具体它是怎么实现的就不讨论了。</p>\\n<p>另外 <code>github pages</code>  支持一个开发工具叫 <code>jekyll</code> ，虽然方便但每次 <code>push</code> 都需要一段时间去等待编译，所以并不是那么适合那些经常改动页面的人。</p>\\n<p><code>island-cli</code> 工具本身依赖于 <code>nodejs</code> 和 <code>webpack</code>，且需要一定的前端知识，所以不会详细解说一些前端知识，遇到问题可以到 <code>github</code> 提交 <code>issues</code>。</p>\\n<h2>使用</h2>\\n<p>首先是全局安装，安装好后就可以使用 <code>island</code> 命令了</p>\\n<pre><code>npm install -g island-cli\\n</code></pre>\\n<p>以下是全部命令</p>\\n<pre><code>初始化一个博客\\n    $ island -i\\n    $ island init\\n\\n当前版本\\n    $ island -v\\n    $ island version\\n\\n新增一篇文章\\n    $ island -a &lt;name&gt;\\n    $ island add &lt;name&gt;\\n\\n删除一篇文章\\n    $ island -x &lt;name&gt;\\n    $ island del &lt;name&gt;\\n\\n重置所有文章内容\\n    $ island -r\\n    $ island reset\\n\\n更新一个主题\\n    $ island -u &lt;name&gt;\\n    $ island update &lt;name&gt;\\n\\n开发模式\\n    $ island -d\\n    $ island dev\\n\\n生产模式\\n    $ island -b\\n    $ island build\\n</code></pre>\\n<h2>流程</h2>\\n<p>这里要说一说整个搭建的简单流程，怎么从一个只有域名到完整的 <code>github pages</code> 网站搭建。</p>\\n<ul>\\n<li>新建一个 <code>github repository</code></li>\\n<li>建立 <code>GitHub Pages</code>，选择从 <code>master branch</code> 根目录创建</li>\\n<li>绑定你的自定义域名，你就可以通过你的域名访问到你的 <code>github repository</code></li>\\n<li>把 <code>github repository</code> 克隆到你的本地，并用命令行工具进入目录</li>\\n<li>执行 <code>island init</code> 命令，稍等一会就可以看到创建的文件了</li>\\n<li>再执行 <code>npm install &amp;&amp; npm start</code> ，等一会就可以看到你的本地网站了</li>\\n<li>开发完成后，执行 <code>npm run build</code> 会生成全部的静态文件</li>\\n<li>最后 <code>push</code> 到远程 <code>github repository</code>，再通过域名就可以访问到网站了</li>\\n</ul>\\n<h2>目录</h2>\\n<pre><code>├── src  开发目录\\n├── ├── data   数据目录\\n├── ├── ├── config   配置目录\\n├── ├── ├── database  伪数据库目录\\n├── ├── ├── pages  页面数据目录\\n├── ├── ├── posts  文章数据目录\\n├── ├── theme   主题目录\\n├── ├── ├── default  默认主题\\n├── static   静态目录\\n├── ├── img  图片目录\\n</code></pre>\\n<h2>原理</h2>\\n<p>其实没太复杂的原理，博客系统主要问题是文章数据怎么读取和存储，我把每个文章 <code>markdown</code> 的数据转换成 <code>js</code> 文件，然后进行按需加载，而并非把每篇文章转换成 <code>html</code> 文件，这意味着文章部分舍弃了 <code>seo</code> ，所以开发和打包都这么快。然后我建立了一个 <code>json</code> 伪数据库，里面保存了所有文章的元数据并暴露到 <code>window.database</code>，所有页面都可以访问到文章的元数据并进行各种操作，相当方便。</p>\\n<h2>问题</h2>\\n<ul>\\n<li>怎么开发主题</li>\\n<li>怎么使用cdn</li>\\n<li>怎么使用功能页面</li>\\n<li>怎么写配置文件</li>\\n<li>怎么让页面模块化和布局分离</li>\\n<li>怎么加载图片</li>\\n<li>...待续</li>\\n</ul>\\n</section>\\n"//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNTQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvZGF0YS9wb3N0cy9pc2xhbmQtY2xpL3Bvc3QubWQ/ODBiOCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiPHNlY3Rpb24+PGgyPkdpdGh1YjwvaDI+XFxuPHA+PGEgaHJlZj1cXFwiaHR0cHM6Ly9naXRodWIuY29tL3podzI1OTA1ODIvaXNsYW5kLWNsaVxcXCI+aHR0cHM6Ly9naXRodWIuY29tL3podzI1OTA1ODIvaXNsYW5kLWNsaTwvYT48L3A+XFxuPGgyPueugOS7izwvaDI+XFxuPHA+6aaW5YWIIDxjb2RlPmlzbGFuZC1jbGk8L2NvZGU+IOaYr+S4gOS4queUn+aIkOmdmeaAgeWNmuWuoueahOWRveS7pOihjOW3peWFt++8jOW3peWFt+acrOi6q+eahOWRveS7pOW+iOWwke+8jOS4u+aXqOeUqOadpeaKiumdmeaAgee9kemhteaJmOeuoeS6jjxjb2RlPmdpdGh1YiBwYWdlczwvY29kZT7kuIrjgILnhLblkI7ov5nkuKrlt6XlhbflvojlpKfpg6jliIblip/og73mmK/moLnmja7miJHnmoTkvb/nlKjkuaDmg6/mnaXliLbkvZznmoTvvIzmiYDku6XlubbmsqHmnInlg48gPGNvZGU+aGV4bzwvY29kZT4g6YKj5LmI5Lq65oCn5YyW5ZKM5aSN5p2C5YyW77yM5pyA5ZCO55Sx5LqO6L+Z5Liq5bel5YW35q+U6L6D5bCP5LyX5YyW77yM5omA5Lul5LiN5Lya5b6A5rex5bqm5Y675byA5Y+R77yM5L2G5Lya5LiA55u05LyY5YyW5LiL5Y6777yM5qyi6L+O5aSn5a625o+Q5bu66K6u44CCPC9wPlxcbjxwPjxjb2RlPmdpdGh1YiBwYWdlczwvY29kZT4g5b6I6YCC55So5LqO6YKj5Lqb5Y+q5pyJ5Z+f5ZCN5L2G5rKh5pyJKOmSseS5sCnmnI3liqHlmajvvIzogIzkuJTov5jlhY3otLnpmYTotaAgPGNvZGU+aHR0cHM8L2NvZGU+IO+8jOS9huS4u+imgemXrumimOWwseaYr+Wug+aYr+WbveWkluacjeWKoeWZqO+8jOiAjOS4lOayoeacieaVsOaNruW6k+OAguWDjyAgPGNvZGU+aGV4bzwvY29kZT4g5bCx5piv5Y+q6LSf6LSj55Sf5oiQ6Z2Z5oCB6aG16Z2i77yM54S25ZCO5omY566h5LqOPGNvZGU+Z2l0aHViIHBhZ2VzPC9jb2RlPiDnmoTvvIzogIzmiJHov5nkuKrlt6XlhbfkuZ/nsbvkvLzov5nmoLfvvIzkvYbmiJHlubbmsqHmnInkvb/nlKjov4cgIDxjb2RlPmhleG88L2NvZGU+IO+8jOaJgOS7peWFt+S9k+Wug+aYr+aAjuS5iOWunueOsOeahOWwseS4jeiuqOiuuuS6huOAgjwvcD5cXG48cD7lj6blpJYgPGNvZGU+Z2l0aHViIHBhZ2VzPC9jb2RlPiAg5pSv5oyB5LiA5Liq5byA5Y+R5bel5YW35Y+rIDxjb2RlPmpla3lsbDwvY29kZT4g77yM6Jm954S25pa55L6/5L2G5q+P5qyhIDxjb2RlPnB1c2g8L2NvZGU+IOmDvemcgOimgeS4gOauteaXtumXtOWOu+etieW+hee8luivke+8jOaJgOS7peW5tuS4jeaYr+mCo+S5iOmAguWQiOmCo+S6m+e7j+W4uOaUueWKqOmhtemdoueahOS6uuOAgjwvcD5cXG48cD48Y29kZT5pc2xhbmQtY2xpPC9jb2RlPiDlt6XlhbfmnKzouqvkvp3otZbkuo4gPGNvZGU+bm9kZWpzPC9jb2RlPiDlkowgPGNvZGU+d2VicGFjazwvY29kZT7vvIzkuJTpnIDopoHkuIDlrprnmoTliY3nq6/nn6Xor4bvvIzmiYDku6XkuI3kvJror6bnu4bop6Por7TkuIDkupvliY3nq6/nn6Xor4bvvIzpgYfliLDpl67popjlj6/ku6XliLAgPGNvZGU+Z2l0aHViPC9jb2RlPiDmj5DkuqQgPGNvZGU+aXNzdWVzPC9jb2RlPuOAgjwvcD5cXG48aDI+5L2/55SoPC9oMj5cXG48cD7pppblhYjmmK/lhajlsYDlronoo4XvvIzlronoo4Xlpb3lkI7lsLHlj6/ku6Xkvb/nlKggPGNvZGU+aXNsYW5kPC9jb2RlPiDlkb3ku6TkuoY8L3A+XFxuPHByZT48Y29kZT5ucG0gaW5zdGFsbCAtZyBpc2xhbmQtY2xpXFxuPC9jb2RlPjwvcHJlPlxcbjxwPuS7peS4i+aYr+WFqOmDqOWRveS7pDwvcD5cXG48cHJlPjxjb2RlPuWIneWni+WMluS4gOS4quWNmuWuolxcbiAgICAkIGlzbGFuZCAtaVxcbiAgICAkIGlzbGFuZCBpbml0XFxuXFxu5b2T5YmN54mI5pysXFxuICAgICQgaXNsYW5kIC12XFxuICAgICQgaXNsYW5kIHZlcnNpb25cXG5cXG7mlrDlop7kuIDnr4fmlofnq6BcXG4gICAgJCBpc2xhbmQgLWEgJmx0O25hbWUmZ3Q7XFxuICAgICQgaXNsYW5kIGFkZCAmbHQ7bmFtZSZndDtcXG5cXG7liKDpmaTkuIDnr4fmlofnq6BcXG4gICAgJCBpc2xhbmQgLXggJmx0O25hbWUmZ3Q7XFxuICAgICQgaXNsYW5kIGRlbCAmbHQ7bmFtZSZndDtcXG5cXG7ph43nva7miYDmnInmlofnq6DlhoXlrrlcXG4gICAgJCBpc2xhbmQgLXJcXG4gICAgJCBpc2xhbmQgcmVzZXRcXG5cXG7mm7TmlrDkuIDkuKrkuLvpophcXG4gICAgJCBpc2xhbmQgLXUgJmx0O25hbWUmZ3Q7XFxuICAgICQgaXNsYW5kIHVwZGF0ZSAmbHQ7bmFtZSZndDtcXG5cXG7lvIDlj5HmqKHlvI9cXG4gICAgJCBpc2xhbmQgLWRcXG4gICAgJCBpc2xhbmQgZGV2XFxuXFxu55Sf5Lqn5qih5byPXFxuICAgICQgaXNsYW5kIC1iXFxuICAgICQgaXNsYW5kIGJ1aWxkXFxuPC9jb2RlPjwvcHJlPlxcbjxoMj7mtYHnqIs8L2gyPlxcbjxwPui/memHjOimgeivtOS4gOivtOaVtOS4quaQreW7uueahOeugOWNlea1geeoi++8jOaAjuS5iOS7juS4gOS4quWPquacieWfn+WQjeWIsOWujOaVtOeahCA8Y29kZT5naXRodWIgcGFnZXM8L2NvZGU+IOe9keermeaQreW7uuOAgjwvcD5cXG48dWw+XFxuPGxpPuaWsOW7uuS4gOS4qiA8Y29kZT5naXRodWIgcmVwb3NpdG9yeTwvY29kZT48L2xpPlxcbjxsaT7lu7rnq4sgPGNvZGU+R2l0SHViIFBhZ2VzPC9jb2RlPu+8jOmAieaLqeS7jiA8Y29kZT5tYXN0ZXIgYnJhbmNoPC9jb2RlPiDmoLnnm67lvZXliJvlu7o8L2xpPlxcbjxsaT7nu5HlrprkvaDnmoToh6rlrprkuYnln5/lkI3vvIzkvaDlsLHlj6/ku6XpgJrov4fkvaDnmoTln5/lkI3orr/pl67liLDkvaDnmoQgPGNvZGU+Z2l0aHViIHJlcG9zaXRvcnk8L2NvZGU+PC9saT5cXG48bGk+5oqKIDxjb2RlPmdpdGh1YiByZXBvc2l0b3J5PC9jb2RlPiDlhYvpmobliLDkvaDnmoTmnKzlnLDvvIzlubbnlKjlkb3ku6TooYzlt6Xlhbfov5vlhaXnm67lvZU8L2xpPlxcbjxsaT7miafooYwgPGNvZGU+aXNsYW5kIGluaXQ8L2NvZGU+IOWRveS7pO+8jOeojeetieS4gOS8muWwseWPr+S7peeci+WIsOWIm+W7uueahOaWh+S7tuS6hjwvbGk+XFxuPGxpPuWGjeaJp+ihjCA8Y29kZT5ucG0gaW5zdGFsbCAmYW1wOyZhbXA7IG5wbSBzdGFydDwvY29kZT4g77yM562J5LiA5Lya5bCx5Y+v5Lul55yL5Yiw5L2g55qE5pys5Zyw572R56uZ5LqGPC9saT5cXG48bGk+5byA5Y+R5a6M5oiQ5ZCO77yM5omn6KGMIDxjb2RlPm5wbSBydW4gYnVpbGQ8L2NvZGU+IOS8mueUn+aIkOWFqOmDqOeahOmdmeaAgeaWh+S7tjwvbGk+XFxuPGxpPuacgOWQjiA8Y29kZT5wdXNoPC9jb2RlPiDliLDov5znqIsgPGNvZGU+Z2l0aHViIHJlcG9zaXRvcnk8L2NvZGU+77yM5YaN6YCa6L+H5Z+f5ZCN5bCx5Y+v5Lul6K6/6Zeu5Yiw572R56uZ5LqGPC9saT5cXG48L3VsPlxcbjxoMj7nm67lvZU8L2gyPlxcbjxwcmU+PGNvZGU+4pSc4pSA4pSAIHNyYyAg5byA5Y+R55uu5b2VXFxu4pSc4pSA4pSAIOKUnOKUgOKUgCBkYXRhICAg5pWw5o2u55uu5b2VXFxu4pSc4pSA4pSAIOKUnOKUgOKUgCDilJzilIDilIAgY29uZmlnICAg6YWN572u55uu5b2VXFxu4pSc4pSA4pSAIOKUnOKUgOKUgCDilJzilIDilIAgZGF0YWJhc2UgIOS8quaVsOaNruW6k+ebruW9lVxcbuKUnOKUgOKUgCDilJzilIDilIAg4pSc4pSA4pSAIHBhZ2VzICDpobXpnaLmlbDmja7nm67lvZVcXG7ilJzilIDilIAg4pSc4pSA4pSAIOKUnOKUgOKUgCBwb3N0cyAg5paH56ug5pWw5o2u55uu5b2VXFxu4pSc4pSA4pSAIOKUnOKUgOKUgCB0aGVtZSAgIOS4u+mimOebruW9lVxcbuKUnOKUgOKUgCDilJzilIDilIAg4pSc4pSA4pSAIGRlZmF1bHQgIOm7mOiupOS4u+mimFxcbuKUnOKUgOKUgCBzdGF0aWMgICDpnZnmgIHnm67lvZVcXG7ilJzilIDilIAg4pSc4pSA4pSAIGltZyAg5Zu+54mH55uu5b2VXFxuPC9jb2RlPjwvcHJlPlxcbjxoMj7ljp/nkIY8L2gyPlxcbjxwPuWFtuWunuayoeWkquWkjeadgueahOWOn+eQhu+8jOWNmuWuouezu+e7n+S4u+imgemXrumimOaYr+aWh+eroOaVsOaNruaAjuS5iOivu+WPluWSjOWtmOWCqO+8jOaIkeaKiuavj+S4quaWh+eroCA8Y29kZT5tYXJrZG93bjwvY29kZT4g55qE5pWw5o2u6L2s5o2i5oiQIDxjb2RlPmpzPC9jb2RlPiDmlofku7bvvIznhLblkI7ov5vooYzmjInpnIDliqDovb3vvIzogIzlubbpnZ7miormr4/nr4fmlofnq6DovazmjaLmiJAgPGNvZGU+aHRtbDwvY29kZT4g5paH5Lu277yM6L+Z5oSP5ZGz552A5paH56ug6YOo5YiG6IiN5byD5LqGIDxjb2RlPnNlbzwvY29kZT4g77yM5omA5Lul5byA5Y+R5ZKM5omT5YyF6YO96L+Z5LmI5b+r44CC54S25ZCO5oiR5bu656uL5LqG5LiA5LiqIDxjb2RlPmpzb248L2NvZGU+IOS8quaVsOaNruW6k++8jOmHjOmdouS/neWtmOS6huaJgOacieaWh+eroOeahOWFg+aVsOaNruW5tuaatOmcsuWIsCA8Y29kZT53aW5kb3cuZGF0YWJhc2U8L2NvZGU+77yM5omA5pyJ6aG16Z2i6YO95Y+v5Lul6K6/6Zeu5Yiw5paH56ug55qE5YWD5pWw5o2u5bm26L+b6KGM5ZCE56eN5pON5L2c77yM55u45b2T5pa55L6/44CCPC9wPlxcbjxoMj7pl67popg8L2gyPlxcbjx1bD5cXG48bGk+5oCO5LmI5byA5Y+R5Li76aKYPC9saT5cXG48bGk+5oCO5LmI5L2/55SoY2RuPC9saT5cXG48bGk+5oCO5LmI5L2/55So5Yqf6IO96aG16Z2iPC9saT5cXG48bGk+5oCO5LmI5YaZ6YWN572u5paH5Lu2PC9saT5cXG48bGk+5oCO5LmI6K6p6aG16Z2i5qih5Z2X5YyW5ZKM5biD5bGA5YiG56a7PC9saT5cXG48bGk+5oCO5LmI5Yqg6L295Zu+54mHPC9saT5cXG48bGk+Li4u5b6F57utPC9saT5cXG48L3VsPlxcbjwvc2VjdGlvbj5cXG5cIiJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///54\n')}}]);