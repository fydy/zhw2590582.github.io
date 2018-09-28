import "../scss/index.scss";
import "app-loading/app-loading.min.css";
import Highway from "@dogstudio/highway/build/es5/highway";
import api from "./api";
import loading from 'app-loading';
import { click, formatPost } from "./utils";

export const allPost = [];
let currentPage = 1;
let $posts = document.querySelector('.posts');

export default class Renderer extends Highway.Renderer {
  onEnter() {
    if (!$posts) {
      $posts = $posts || document.querySelector('.posts');
      creatPost(currentPage++, $posts);
      click('loadMore', e => {
        creatPost(currentPage++, $posts);
      });
    }
  }
}

if ($posts) {
  creatPost(currentPage++, $posts);
  click('loadMore', e => {
    creatPost(currentPage++, $posts);
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
  const $loadStatus = document.querySelector('.loadStatus');
  $loadStatus.innerHTML = '';
  creatLoad(target);
  api.getIssueByPage(page).then(data => {
    if (data.length === 0) {
      removeLoad();
      loading.stop();
      $loadStatus.innerHTML = `<div class="loadEnd">已加载全部！</div>`;
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
    $loadStatus.innerHTML = `<div class="loadMore">加载更多</div>`;
    loading.stop();
    Highway.update();
  })
}