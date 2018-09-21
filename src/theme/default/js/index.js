import '../sass/index';
import creatPost from "./utils/creatPost";
import { infiniteScroll, sortPosts } from "./utils";
let currentPage = 1;
const posts = sortPosts(__database__.posts);
creatPost('.posts', currentPage++, posts);
infiniteScroll(() => {
    creatPost('.posts', currentPage++, posts);
});