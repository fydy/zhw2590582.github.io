import { request, queryStringify } from "./utils"; 
const { github, post } = __config__.website;

function creatApi() {
    const issuesApi = `https://api.github.com/repos/${github.owner}/${github.repo}/issues`;
    const baseQuery = {
        client_id: github.clientID,
        client_secret: github.clientSecret
    };

    return {
        // 通过分页获取issue
        getIssueByPage(page) {
            const query = Object.assign({}, baseQuery, {
                per_page: post.pageSize,
                page: page,
                t: (new Date).getTime()
            })
            return request('get', `${issuesApi}?${queryStringify(query)}`, null, {
                Accept: "application/vnd.github.v3.html+json"
            });
        },

        // 通过标签获取issue
        getIssueByLabel(labels) {
            const query = Object.assign({}, baseQuery, {
                labels: labels,
                t: (new Date).getTime()
            })
            return request('get', `${issuesApi}?${queryStringify(query)}`, null, {
                Accept: "application/vnd.github.v3.html+json"
            });
        },

        // 通过id获取issues
        getIssueById(id) {
            const query = Object.assign({}, baseQuery, {
                t: (new Date).getTime()
            })
            return request('get', `${issuesApi}/${id}?${queryStringify(query)}`, null, {
                Accept: "application/vnd.github.v3.html+json"
            });
        }
    }
}

export default creatApi();