!function(t){function e(e){for(var o,a,i=e[0],s=e[1],l=e[2],p=0,d=[];p<i.length;p++)a=i[p],r[a]&&d.push(r[a][0]),r[a]=0;for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(t[o]=s[o]);for(u&&u(e);d.length;)d.shift()();return c.push.apply(c,l||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],o=!0,i=1;i<n.length;i++){var s=n[i];0!==r[s]&&(o=!1)}o&&(c.splice(e--,1),t=a(a.s=n[0]))}return t}var o={},r={8:0},c=[];function a(e){if(o[e])return o[e].exports;var n=o[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(t){var e,n=[],o=r[t];if(0!==o)if(o)n.push(o[2]);else{var c=new Promise(function(e,n){o=r[t]=[e,n]});n.push(o[2]=c);var i,s=document.getElementsByTagName("head")[0],l=document.createElement("script");l.charset="utf-8",l.timeout=120,a.nc&&l.setAttribute("nonce",a.nc),l.src=a.p+"static/js/"+({9:"post0",10:"post1",11:"post2",12:"post3"}[e=t]||e)+"-dafb33bd115c3efeac7f.js",i=function(e){l.onerror=l.onload=null,clearTimeout(u);var n=r[t];if(0!==n){if(n){var o=e&&("load"===e.type?"missing":e.type),c=e&&e.target&&e.target.src,a=new Error("Loading chunk "+t+" failed.\n("+o+": "+c+")");a.type=o,a.request=c,n[1](a)}r[t]=void 0}};var u=setTimeout(function(){i({type:"timeout",target:l})},12e4);l.onerror=l.onload=i,s.appendChild(l)}return Promise.all(n)},a.m=t,a.c=o,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="https://cdn.zhw-island.com/",a.oe=function(t){throw console.error(t),t};var i=window.webpackJsonp=window.webpackJsonp||[],s=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var u=s;c.push([51,0]),n()}({51:function(t,e,n){"use strict";n.r(e),function(t,e){var o=n(10),r=n(0),c=Object(r.b)().name,a=t.website.post.relatedPost,i=document.querySelector(".header"),s=document.querySelector(".post-page"),l=document.querySelector(".post-page .post-header .title"),u=document.querySelector(".post-page .post-header .meta"),p=document.querySelector(".post-page .post-content"),d=document.querySelector(".post-page .post-related"),f=document.querySelector(".post-page .post-nav"),m=document.querySelector(".post-page .post-nav .nav-list"),v=e.posts.find(function(t){return t.name===c});Object(r.h)(v.title),l.innerHTML=v.title,u.innerHTML=v.topic.split(",").map(function(t){return'<a href="/archive.html?topic='.concat(encodeURIComponent(t.trim()),'" title="').concat(t.trim(),'" class="topic">').concat(t.trim(),"</a>")}).join('<span class="dot"></span>')+'<span class="dot"></span>'+'<span class="time" title="'.concat(v.creatDate,'">发布于 ').concat(Object(r.e)(v.creatDate),"</span>"),n(52)("./".concat(c,".md")).then(function(t){var e=t.default;setTimeout(function(){p.innerHTML=e,!Object(r.d)()&&function(){"wide"===v.type?s.insertAdjacentHTML("afterbegin",'<div class="post-poster"><img src="'.concat(v.poster,'" alt="').concat(v.title,'" /></div>')):f.insertAdjacentHTML("afterbegin",'<div class="poster" style="background-image: url('.concat(v.poster||Object(r.a)(),')"></div>'));var t=Array.from(document.querySelectorAll(".post-page .post-content h2")),e=t.map(function(t,e){return'<a class="nav-item" data-index="'.concat(e,'" href="#">').concat(t.textContent,"</a>")}).join("");m.innerHTML=e,m.addEventListener("click",function(e){e.preventDefault();var n=e.target.dataset.index;Object(r.i)(t[n])})}(),Object(o.a)(".post-page .post-content img")},500)}).catch(function(t){window.location.href="/404.html"});var h=[],b=v.topic.split(",")[0].trim();e.posts.some(function(t,e){if(-1<t.topic.split(",").map(function(t){return t.trim()}).indexOf(b)&&t.name!==v.name&&h.push('\n      <div class="related-item flex-item text-ellipsis">\n          <a class="poster" href="/post.html?name='.concat(encodeURIComponent(t.name),'" title="').concat(t.title,'" style="background-image: url(').concat(t.poster||Object(r.a)(),');"></a>\n          <a class="title" href="/post.html?name=').concat(encodeURIComponent(t.name),'" title="').concat(t.title,'">').concat(t.title,'</a>\n          <div class="time" title="').concat(t.creatDate,'">发布于 ').concat(Object(r.e)(t.creatDate),"</div>\n      </div>\n    ")),h.length>=a)return!0}),d.insertAdjacentHTML("beforeend",h.join("")),Object(r.d)()||(Object(r.f)(function(t){i.dataset.scrollDirection=t}),Object(r.g)(".post-nav",80))}.call(this,n(4),n(5))},52:function(t,e,n){var o={"./blog-summary.md":[53,9],"./bye-wordpress.md":[54,10],"./island-cli.md":[55,11],"./read-book.md":[56,12]};function r(t){var e=o[t];return e?n.e(e[1]).then(function(){var t=e[0];return n.t(t,7)}):Promise.resolve().then(function(){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e})}r.keys=function(){return Object.keys(o)},r.id=52,t.exports=r}});