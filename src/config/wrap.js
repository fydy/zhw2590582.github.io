module.exports = function(config) {
  config.website.menus = config.website.menus
    .map(item => {
      return `<a class="item" title="${item.name}" href="${item.link}">${item.name}</a>`;
    })
    .join('');

  config.website.socials = config.website.socials
    .map(item => {
      return `<a class="social-item" title="${item.name}" href="${item.link}" target="_blank">${item.name}</a>`;
    })
    .join('<span class="dot"></span>');

  config.website.links = config.website.links
    .map(item => {
      return `<a class="link-item" title="${item.name}" href="${item.link}">${item.name}</a>`;
    })
    .join('');

  config.path = `/src/theme/${config.theme}`;
  
  return config;
};
