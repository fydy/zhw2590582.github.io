import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");
const { website, dev, theme } = __config__;
import H from "./common";

// 判读是否手机环境
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

// 获取url参数
export function getURLParameters() {
  var url = window.location.href;
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(function(a, v) {
    return (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a;
  }, {});
}

// 更新缓存
export function updateCache() {
  const key = H.location.href;
  const cache = H.cache.get(key);
  if (cache) {
    cache.page = document.cloneNode(true);
    cache.view = document.querySelector("[data-router-view]").cloneNode(true);
    H.cache.set(key, cache);
    H.afterFetch();
  }
}

// 对象转url参数
export function queryStringify(query) {
  const queryString = Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(query[key] || "")}`)
    .join("&");
  return queryString;
}

// 延迟执行
export function debounce(fn, delay) {
  let timer = null;
  return function() {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
}

// 无限加载
export function infiniteScroll(callback) {
  function getDocumentHeight() {
    const body = document.body;
    const html = document.documentElement;
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }

  function getScrollTop() {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  }

  const debounceCallback = debounce(callback, 500);
  window.addEventListener("scroll", e => {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight - 100) return;
    debounceCallback();
  });
}

// 设置标题
export function setTitle(subTitle) {
  window.document.title = `${subTitle} - ${website.seo.title}`;
}

// 滚动固定
export function scrollFixed(selector, distance = 0) {
  const el = document.querySelector(selector);
  if (el) {
    const elTop =
      el.getBoundingClientRect().top -
      document.body.getBoundingClientRect().top;
    function callback() {
      if (document.documentElement.scrollTop > elTop - distance) {
        el.classList.add("fixed");
      } else {
        el.classList.remove("fixed");
      }
    }
    callback();
    window.addEventListener("scroll", callback);
  }
}

// 主题路径
export function themePath(url) {
  url = url.charAt(0) === "/" ? url : "/" + url;
  return `src/theme/${theme}${url}`;
}

// 判断滚动方向
export function scrollDirection(callback) {
  const debounceCallback = debounce(callback, 50);
  let scrollPos = 0;
  window.addEventListener("scroll", function() {
    if (document.body.getBoundingClientRect().top > scrollPos) {
      debounceCallback("up");
    } else {
      debounceCallback("down");
    }
    scrollPos = document.body.getBoundingClientRect().top;
  });
}

// 相对时间
export function relative(time) {
  return dayjs(time).fromNow();
}

// 字符串溢出
export function truncateString(str, num) {
  return str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + "..." : str;
}

// 排序文章
export function sortPosts(posts) {
  let stickyPost = [];
  let newPosts = [];
  posts.forEach(item => {
    if (item.sticky) {
      stickyPost.unshift(item);
    } else {
      newPosts.push(item);
    }
  });
  newPosts.unshift(...stickyPost.reverse());
  return newPosts;
}

// 滚动到元素
export function smoothScroll(element) {
  window.scroll({
    behavior: "smooth",
    left: 0,
    top: element.getBoundingClientRect().top + window.scrollY - 80
  });
}

// 格式化文章
export function formatPost(item) {
  console.log(item);
  const formatPost = {
    title: item.title,
    html: item.body_html,
    excerpt: truncateString(item.body_text.replace(/[\r\n]/g, ""), website.post.excerpt),
    created_at: relative(item.created_at),
    updated_at: relative(item.updated_at),
    comments: item.comments,
    tags: item.labels.filter(tag => tag.name !== 'post').map(tag => tag.name),
    url: item.url,
    id: item.number
  }

  try {
    formatPost.poster = /src=[\'\"]?([^\'\"]*)[\'\"]?/i.exec(/<img.*?(?:>|\/>)/.exec(item.body_html)[0])[1];
  } catch (error) {
    formatPost.poster = '/static/img/default/poster.png';
  }
  console.log(formatPost);
  return formatPost;
}

// fetch请求
export function request(method, url, body, header) {
  method = method.toUpperCase();
  body = body && JSON.stringify(body);
  let headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };

  if (header) {
    headers = Object.assign({}, headers, header);
  }

  return fetch(url, {
    method,
    headers,
    body
  }).then(res => {
    if (res.status === 404) {
      return Promise.reject("Unauthorized.");
    } else {
      return res.json();
    }
  });
}
