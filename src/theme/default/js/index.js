import "../scss/index.scss";
import "app-loading/app-loading.min.css";
import Highway from "@dogstudio/highway/build/es5/highway";
import api from "./api";
import loading from 'app-loading';
import { updateCache, infiniteScroll, formatPost } from "./utils";

export default Highway.Renderer;
export const allPost = [];
let loadEnd = false;
const $page = document.querySelector('.page-index');

function creatLoad() {
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
  $page.insertAdjacentHTML("beforeend", loadHtml.repeat(2));
}

function removeLoad() {
  Array.from(document.querySelectorAll('.post-load')).forEach(item => item.remove());
}

function creatPost(page) {
  loading.setColor('#000').start();
  creatLoad();
  api.getIssueByPage(page).then(data => {
    if (data.length === 0) {
      loadEnd = true;
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
    $page.insertAdjacentHTML("beforeend", postHtml);
    loading.stop();
    updateCache();
  })
}

let currentPage = 1;
creatPost(currentPage++);
infiniteScroll(() => {
  if (loadEnd) return;
  creatPost(currentPage++);
});