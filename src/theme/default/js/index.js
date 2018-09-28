import "../scss/index.scss";
import "app-loading/app-loading.min.css";
import Highway from "@dogstudio/highway/build/es5/highway";
import api from "./api";
import loading from 'app-loading';
import { infiniteScroll, formatPost } from "./utils";

export const allPost = [];
let currentPage = 1;
let loadEnd = false;
let $page = document.querySelector('.page-index');
let removeInfiniteScroll;

export default class Renderer extends Highway.Renderer {
  onEnter() {
    if (!$page) {
      $page = document.querySelector('.page-index');
      creatPost(currentPage++, $page);
      removeInfiniteScroll = infiniteScroll(() => {
        if (loadEnd) return;
        creatPost(currentPage++, $page);
      });
    }
  }
  onLeave() {
    
  }
}

if ($page) {
  creatPost(currentPage++, $page);
  removeInfiniteScroll = infiniteScroll(() => {
    if (loadEnd) return;
    creatPost(currentPage++, $page);
  });
}

function creatLoad(target) {
  const loadHtml = `
  <div class="post-load">
    <div class="title load"></div>
    <div class="poster load"></div>
    <div class="content">
      <p class="load" style="width: 100%"></p>
      <p class="load" style="width: 80%"></p>
      <p class="load" style="width: 100%"></p>
      <p class="load" style="width: 50%"></p>
    </div>
    <div class="mate">
      <span class="load"></span>
      <span class="load"></span>
      <span class="load"></span>
      <span class="load"></span>
    </div>
  </div>
  `;
  target.insertAdjacentHTML("beforeend", loadHtml);
}

function removeLoad() {
  const $loads = document.querySelectorAll('.post-load');
  Array.from($loads).forEach(item => item.remove());
}

function creatPost(page, target) {
  loading.setColor('#000').start();
  creatLoad(target);
  api.getIssueByPage(page).then(data => {
    if (data.length === 0) {
      loadEnd = true;
      removeLoad();
      loading.stop();
      return;
    }
    const postData = data.map(formatPost);
    allPost.push(...postData);
    const postHtml = postData.map(item => {
      return `
        <div class="post-item">
            <div class="title">
              <a class="inner" href="post.html?id=${item.id}">
                ${item.title}
              </a>
            </div>
            <a class="poster" href="post.html?id=${item.id}" style="background-image: url(${item.poster})"></a>
            <div class="content">
              ${item.excerpt}
            </div>
            <div class="mate">
              <span>发布于 ${item.created_at}</span>
              ${item.tags.map(tag => `<span><a href="archive.html?tag=${tag}">#${tag}</a></span>`)}
            </div>
        </div>
      `
    }).join('');
    removeLoad();
    target.insertAdjacentHTML("beforeend", postHtml);
    loading.stop();
    Highway.update();
  })
}