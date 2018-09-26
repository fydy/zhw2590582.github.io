import H from "./common";

export const updateCache = () => {
    const key = H.location.href;
    const cache = H.cache.get(key);
    if (cache) {
        cache.page = document.cloneNode(true);
        cache.view = document.querySelector('[data-router-view]').cloneNode(true);
        H.cache.set(key, cache);
    }
};

export const queryStringify = query => {
  const queryString = Object.keys(query)
    .map(key => `${key}=${encodeURIComponent(query[key] || "")}`)
    .join("&");
  return queryString;
};

export const request = (method, url, body, header) => {
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
};
