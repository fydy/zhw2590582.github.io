import {
  request,
  queryStringify,
  truncateString,
  relative
} from "./utils";
const {
  github,
  post
} = __config__.website;

const postMap = new Map;

function formatPost(item) {
  const formatPost = {
    title: item.title,
    html: item.body_html,
    excerpt: truncateString(
      item.body_text.replace(/[\r\n]/g, ""),
      post.excerpt
    ),
    created_at: relative(item.created_at),
    updated_at: relative(item.updated_at),
    comments: item.comments,
    tags: item.labels.filter(tag => tag.name !== "post").map(tag => tag.name),
    url: item.url,
    id: item.number
  };

  try {
    formatPost.poster = /src=[\'\"]?([^\'\"]*)[\'\"]?/i.exec(
      /<img.*?(?:>|\/>)/.exec(item.body_html)[0]
    )[1];
  } catch (error) {
    formatPost.poster = "/static/img/default/poster.png";
  }

  postMap.set(formatPost.id, formatPost);
  return formatPost;
}

function creatApi() {
  const issuesApi = `https://api.github.com/repos/${github.owner}/${github.repo}/issues`;

  const baseQuery = {
    client_id: github.clientID,
    client_secret: github.clientSecret
  };

  return {
    // 通过分页获取issue
    getIssueByPage(page, type = 'full') {
      const query = Object.assign({}, baseQuery, {
        per_page: post.pageSize,
        page: page,
        labels: 'post',
        t: (new Date).getTime()
      })

      return request('get', `${issuesApi}?${queryStringify(query)}`, null, {
        Accept: `application/vnd.github.v3.${type}+json`
      }).then(data => data.map(formatPost));
    },

    // 通过标签获取issue
    getIssueByLabel(labels, type = 'full') {
      const query = Object.assign({}, baseQuery, {
        labels: labels,
        t: (new Date).getTime()
      })

      return request('get', `${issuesApi}?${queryStringify(query)}`, null, {
        Accept: `application/vnd.github.v3.${type}+json`
      }).then(data => data.map(formatPost));
    },

    // 通过id获取issues
    getIssueById(id, type = 'full') {
      id = Number(id);
      if (postMap.has(id)) {
        return Promise.resolve(postMap.get(id))
      }

      const query = Object.assign({}, baseQuery, {
        t: (new Date).getTime()
      })

      return request('get', `${issuesApi}/${id}?${queryStringify(query)}`, null, {
        Accept: `application/vnd.github.v3.${type}+json`
      }).then(data => formatPost(data));
    }
  }
}

export default creatApi();
