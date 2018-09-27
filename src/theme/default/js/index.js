import "../scss/index.scss";
import "app-loading/app-loading.min.css";
import Highway from "@dogstudio/highway/build/es5/highway";
import api from "./api";
import loading from 'app-loading';
import { updateCache, infiniteScroll, formatPost } from "./utils";

export default class Renderer extends Highway.Renderer {
  onEnter() {
    
  }

  onLeave() {
    
  }

  onEnterCompleted() {
    
  }

  onLeaveCompleted() {
    
  }
}

export const allPost = [];
let loadEnd = false;
const $page = document.querySelector('.page-index');

function creatPost(page) {
  loading.setColor('#000').start();
  api.getIssueByPage(page).then(data => {
    const postData = data.map(formatPost);
    allPost.push(...postData);
    const postHtml = postData.map(item => {
      return `
        <div class="post-item">
            <a class="poster" href="post.html?id=${item.id}">
              <img src="${item.poster}"/>
            </a>
            <a class="title" href="post.html?id=${item.id}">${item.title}</a>
            <div class="content">${item.excerpt}</div>
            <div class="mete"></div>
        </div>
      `
    }).join('');
    $page.insertAdjacentHTML("beforeend", postHtml);
    loadEnd = postData.length === 0;
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